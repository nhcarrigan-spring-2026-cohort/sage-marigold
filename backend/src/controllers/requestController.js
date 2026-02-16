const db = require('../config/db');
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
    client = await db.connect(); // Get a specific connection
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
      return res.status(400).json({
        ok: false,
        message: 'This item is no longer available',
      });
    }

    if (requester_id === donor_id) {
      await client.query('ROLLBACK');
      return res.status(400).json({
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
  const { id } = req.params; // Request ID
  const donor_id = req.user.id; // Grabbing the logged in user's ID (it must be the owner)
  let client;
  try {
    client = await db.connect(); // Get a specific connection
    await client.query('BEGIN'); // Start the transaction

    const requestCheck = await client.query(
      'SELECT r.*, i.donor_id, i.status AS item_status FROM requests r JOIN donation_items i ON r.item_id=i.id WHERE r.id=$1 FOR UPDATE',
      [id]
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
      return res.status(401).json({
        ok: false,
        message: 'Not your item!',
      });
    }
    if (requestData.item_status !== 'available') {
      await client.query('ROLLBACK');
      return res.status(403).json({
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
      "UPDATE requests SET status = 'accepted' WHERE id = $1 AND status = 'pending'",
      [id]
    );

    // If rowCount is 0, it means the request was no longer 'pending'
    if (acceptResult.rowCount === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({
        ok: false,
        message: 'Request could not be accepted. It may have been cancelled.',
      });
    }

    await client.query(
      "UPDATE requests SET status = 'rejected' WHERE item_id=$1 AND status='pending' AND id!=$2",
      [item_id, id]
    );

    await client.query(
      "UPDATE donation_items SET status = 'reserved' WHERE id=$1",
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
};

const getMyRequests = async (req, res = response) => {
  // logic here
};

const getItemRequests = async (req, res = response) => {
  // logic here
};

module.exports = {
  createRequest,
  acceptRequest,
  cancelRequest,
  getMyRequests,
  getItemRequests,
};
