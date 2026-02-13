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
      message: 'Error occured creating request',
    });
  }
};

module.exports = {
  createRequest,
};
