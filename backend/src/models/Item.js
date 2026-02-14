// const mongoose = require('mongoose');

// const itemSchema = new mongoose.Schema({
//     // Fields (title, description, category, etc.) will be added here
// }, { timestamps: true });

// module.exports = mongoose.model('Item', itemSchema);

// PostgreSQL version – no Mongoose needed

// This file is kept for structural consistency.
// Database interactions for items will be handled
// directly in the controllers using SQL queries.

//module.exports = {};

const pool = require('../config/db');

//new donation item
const createItem = async ({ title, description, category, location, donor_id }) => {
  const result = await pool.query(
    `INSERT INTO donation_items (title, description, category, location, donor_id)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [title, description, category, location, donor_id]
  );
  return result.rows[0];
};

//List all items with status "available"
const getAllAvailableItems = async () => {
  const result = await pool.query(
    `SELECT * FROM donation_items WHERE status = 'available'`
  );
  return result.rows;
};

const getAllItemsForListing = async () => {
  const query = 'SELECT * FROM donation_items WHERE status != $1';
  const { rows } = await pool.query(query, ['withdrawn']);
  return rows;
};

// Get all items regardless of status
const getAllItems = async () => {
    const query = 'SELECT * FROM donation_items ORDER BY created_at DESC';
    const result = await pool.query(query);
    return result.rows;
};

//Update an item's status
const updateItemStatus = async (itemId, status) => {
  const result = await pool.query(
    `UPDATE donation_items SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [status, itemId]
  );
  return result.rows[0];
};

//Get a single item by ID
const getItemById = async (itemId) => {
  const result = await pool.query(
    `SELECT * FROM donation_items WHERE id = $1`,
    [itemId]
  );
  return result.rows[0];
};

module.exports = {
  createItem,
  getAllAvailableItems,
  getAllItemsForListing,
  getAllItems,
  updateItemStatus,
  getItemById
};
