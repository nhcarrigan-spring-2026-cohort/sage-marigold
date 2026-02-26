const db = require('../config/db');
const Request = require('../models/Request');
const { response } = require('express');

const createRequest = async (req, res = response) => {
  const { item_id, application_data } = req.body;
  const requester_id = req.user.id;

  if (!item_id || !application_data) {
    return res.status(400).json({
      ok: false,
      message: 'Item ID and application data are required',
    });
  }
  let client;
  try {
    client = await db.pool.connect(); // Get a specific connection
    await client.query('BEGIN'); // Start the transaction

    const itemResult = await client.query(
      'SELECT donor_id, status FROM donation_items WHERE id=$1 FOR UPDATE',
      [item_id]
    );
    if (itemResult.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({
        ok: false,
        message: 'Item not found',
      });
    }
    const { donor_id, status } = itemResult.rows[0];

    if (status !== 'available') {
      await client.query('ROLLBACK');
      return res.status(409).json({
        ok: false,
        message: 'This item is no longer available',
      });
    }

    if (requester_id === donor_id) {
      await client.query('ROLLBACK');
      return res.status(403).json({
        ok: false,
        message:
          "You cannot request your own item! That's like calling your own phone to see if you're home",
      });
    }

    const existingRequest = await client.query(
      'SELECT id FROM requests WHERE item_id = $1 AND requester_id = $2 AND status = $3',
      [item_id, requester_id, 'pending']
    );
    if (existingRequest.rows.length > 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({
        ok: false,
        message: 'You already have a pending request for this item',
      });
    }
    const pendingRequests = await client.query(
      "SELECT COUNT (*) AS total FROM requests WHERE item_id=$1 AND status = 'pending'",
      [item_id]
    );
    if (parseInt(pendingRequests.rows[0].total) >= 15) {
      await client.query('ROLLBACK');
      return res.status(400).json({
        ok: false,
        message: 'This item has reached its limit of 15 pending requests',
      });
    }
    const result = await client.query(
      'INSERT INTO requests (item_id, requester_id, application_data) VALUES ($1, $2, $3) RETURNING *',
      [item_id, requester_id, application_data]
    );

    await client.query('COMMIT'); // Save everything

    return res.status(201).json({
      ok: true,
      message: 'Request created successfully',
      request: result.rows[0],
    });
  } catch (error) {
    // Only rollback if the client was successfully initialized
    if (client) {
      await client.query('ROLLBACK');
    }
    console.error('Create Request Error:', error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  } finally {
    if (client) {
      client.release();
    } // Put the connection back in the pool
  }
};

const acceptRequest = async (req, res = response) => {
  const { request_id } = req.params; // Request ID
  const donor_id = req.user.id; // Grabbing the logged in user's ID (it must be the owner)
  let client;
  try {
    client = await db.pool.connect(); // Get a specific connection
    await client.query('BEGIN'); // Start the transaction

    const requestCheck = await client.query(
      'SELECT r.*, i.donor_id, i.status AS item_status FROM requests r JOIN donation_items i ON r.item_id=i.id WHERE r.id=$1 FOR UPDATE',
      [request_id]
    );
    if (requestCheck.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({
        ok: false,
        message: 'Request not found',
      });
    }
    const requestData = requestCheck.rows[0];
    if (requestData.donor_id !== donor_id) {
      await client.query('ROLLBACK');
      return res.status(403).json({
        ok: false,
        message: 'Not your item!',
      });
    }
    if (requestData.item_status !== 'available') {
      await client.query('ROLLBACK');
      return res.status(409).json({
        ok: false,
        message:
          'You cannot accept new requests for items that are no longer available',
      });
    }
    if (requestData.status !== 'pending') {
      await client.query('ROLLBACK');
      return res.status(400).json({
        ok: false,
        message: 'Only pending requests can be accepted',
      });
    }
    const { item_id } = requestData;

    const acceptResult = await client.query(
      "UPDATE requests SET status = 'accepted', updated_at = NOW() WHERE id = $1 AND status = 'pending' RETURNING *",
      [request_id]
    );

    // If rowCount is 0, it means the request was no longer 'pending'
    if (acceptResult.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({
        ok: false,
        message: 'Request could not be accepted. It may have been cancelled.',
      });
    }

    // Reject all the other applications
    await client.query(
      "UPDATE requests SET status = 'rejected', updated_at = NOW() WHERE item_id=$1 AND status='pending' AND id!=$2",
      [item_id, request_id]
    );

    // Change the item's status to 'reserved'
    await client.query(
      "UPDATE donation_items SET status = 'reserved', updated_at = NOW() WHERE id=$1",
      [item_id]
    );

    await client.query('COMMIT'); // Save everything
    return res.status(200).json({
      ok: true,
      message: 'Request accepted and others rejected successfully',
    });
  } catch (error) {
    if (client) {
      await client.query('ROLLBACK');
    }
    console.error('Accept Request Error', error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  } finally {
    if (client) {
      client.release(); // Put the connection back in the pool
    }
  }
};

const cancelRequest = async (req, res = response) => {
  // If an item was at 15/15 requests and someone cancels, it opens up a spot for someone else
  // if a user cancels a request that was already accepted, the item status should go from reserved back to available
  const requester_id = req.user.id;
  const { request_id: paramId } = req.params;
  let client;
  try {
    client = await db.pool.connect();
    await client.query('BEGIN');
    const currentRequestState = await client.query(
      'SELECT id, item_id, status FROM requests WHERE id = $1 AND requester_id = $2 FOR UPDATE',
      [paramId, requester_id]
    );
    if (currentRequestState.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({
        ok: false,
        message: "You don't have any request for this item yet",
      });
    }
    const { status, item_id } = currentRequestState.rows[0];
    if (status === 'rejected' || status === 'cancelled') {
      await client.query('ROLLBACK');
      return res.status(400).json({
        ok: false,
        message:
          "You can't cancel requests which have already been cancelled or rejected",
      });
    }
    if (status === 'accepted') {
      // freeing up the item
      await client.query(
        "UPDATE donation_items SET status = 'available', updated_at = NOW() WHERE id=$1",
        [item_id]
      );
      // returning the 'rejected' applications back to 'pending'
      await client.query(
        "UPDATE requests SET status='pending', updated_at = NOW() WHERE item_id=$1 AND status='rejected'",
        [item_id]
      );
    }
    // The requester can cancel their request while its status is 'pending' or 'accepted'
    await client.query(
      "UPDATE requests SET status='cancelled', updated_at = NOW() WHERE id=$1",
      [currentRequestState.rows[0].id]
    );
    await client.query('COMMIT');
    return res.status(200).json({
      ok: true,
      message: 'Request cancelled successfully',
    });
  } catch (error) {
    if (client) {
      await client.query('ROLLBACK');
    }
    console.error('Cancel Request Error', error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  } finally {
    if (client) {
      client.release(); // Put the connection back in the pool
    }
  }
};

const getMyRequests = async (req, res = response) => {
  const requester_id = req.user.id;
  // fetch all requests belonging to the logged in user
  try {
    const requests = await Request.findByRequester(requester_id);

    return res.status(200).json({
      ok: true,
      requests,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error fetching your requests',
    });
  }
};

const getItemRequests = async (req, res = response) => {
  const { item_id } = req.params; // the item the donor is looking at
  const donor_id = req.user.id; // the logged in donor

  try {
    const itemCheck = await db.pool.query(
      'SELECT donor_id FROM donation_items WHERE id=$1',
      [item_id]
    );
    if (itemCheck.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'Item not found',
      });
    }
    if (itemCheck.rows[0].donor_id !== donor_id) {
      return res.status(403).json({
        ok: false,
        message: "You don't have permission to view these requests",
      });
    }
    const requests = await Request.findByItem(item_id, donor_id);
    return res.status(200).json({
      ok: true,
      requests,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      ok: false,
      message: 'Error fetching requests',
    });
  }
};

module.exports = {
  createRequest,
  acceptRequest,
  cancelRequest,
  getMyRequests,
  getItemRequests,
};
