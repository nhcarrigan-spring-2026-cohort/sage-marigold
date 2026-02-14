const db = require('../config/db');
const { response } = require('express');

const createRequest = async (req, res = response) => {
  const { item_id, application_data } = req.body;
  const requester_id = req.user.id;
  console.log('New request data:', { item_id, requester_id, application_data });
  if (!item_id || !application_data) {
    return res.status(400).json({
      ok: false,
      message: 'Item ID and application data are required',
    });
  }

  try {
    const itemResult = await db.query(
      'SELECT owner_id FROM items WHERE id=$1',
      [item_id]
    );
    if (itemResult.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'Item not found',
      });
    }
    const owner_id = itemResult.rows[0].owner_id;

    if (requester_id === owner_id) {
      return res.status(400).json({
        ok: false,
        message:
          "You cannot request your own item! That's like calling your own phone to see if you're home",
      });
    }

    const existingRequest = await db.query(
      'SELECT id FROM requests WHERE item_id = $1 AND requester_id = $2 AND status = $3',
      [item_id, requester_id, 'pending']
    );
    if (existingRequest.rows.length > 0) {
      return res.status(400).json({
        ok: false,
        message: 'You already have a pending request for this item',
      });
    }
    const query =
      'INSERT INTO requests (item_id, requester_id, application_data) VALUES ($1, $2, $3) RETURNING *';
    const values = [item_id, requester_id, application_data];

    const result = await db.query(query, values);
    res.status(201).json({
      ok: true,
      message: 'Request created successfully',
      request: result.rows[0],
    });
  } catch (error) {
    console.error('Error happened:', error);
    res.status(500).json({
      ok: false,
      message: 'Error occured while creating request',
    });
  }
};

const acceptRequest = async (req, res = response) => {
  try {
    const { id } = req.params;
    const owner_id = req.user.id; // Grabbing the logged in user's ID (it must be the owner)
    const requestCheck = await db.query(
      'SELECT r.*, i.owner_id FROM requests r JOIN items i ON r.item_id=i.id WHERE r.id=$1',
      [id]
    );
    if (requestCheck.rows.length === 0) {
      return res.status(404).json({
        ok: false,
        message: 'Not found',
      });
    }
    const requestData = requestCheck.rows[0];
    if (requestData.owner_id !== owner_id) {
      return res.status(401).json({
        ok: false,
        message: 'Not your item!',
      });
    }
    const { item_id } = requestData;

    await db.query("UPDATE requests SET status = 'accepted' WHERE id = $1", [
      id,
    ]);

    await db.query(
      "UPDATE requests SET status = 'rejected' WHERE item_id=$1 AND status='pending' AND id!=$2",
      [item_id, id]
    );

    await db.query("UPDATE items SET status = 'reserved' WHERE id=$1", [
      item_id,
    ]);

    res.status(200).json({
      ok: true,
      message: 'Request accepted and others rejected successfully',
    });
  } catch (error) {
    console.error('Accept Request Error', error);
    res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  createRequest,
  acceptRequest,
};
