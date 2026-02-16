const pool = require('../config/db');

//Create a new donation item
const createItem = async ({ title, description, category, location, condition, donor_id }) => {
  const result = await pool.query(
    `INSERT INTO donation_items (title, description, category, location, condition, donor_id)
     VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
    [title, description, category, location, condition, donor_id]
  );
  return result.rows[0];
};


// Get all items with status "available"

const getAllAvailableItems = async () => {
  const result = await pool.query(
    `SELECT * FROM donation_items WHERE status = 'available' ORDER BY created_at DESC`
  );
  return result.rows;
};

//Get all items regardless of status

const getAllItems = async () => {
  const result = await pool.query(
    `SELECT * FROM donation_items ORDER BY created_at DESC`
  );
  return result.rows;
};

/**
 * Update an item's status
 */
const updateItemStatus = async (itemId, status) => {
  const result = await pool.query(
    `UPDATE donation_items SET status = $1, updated_at = NOW() WHERE id = $2 RETURNING *`,
    [status, itemId]
  );
  return result.rows[0] || null;
};

/**
 * Get a single item by ID
 */
const getItemById = async (itemId) => {
  const result = await pool.query(
    `SELECT * FROM donation_items WHERE id = $1`,
    [itemId]
  );
  return result.rows[0] || null;
};

module.exports = {
  createItem,
  getAllAvailableItems,
  getAllItems,
  updateItemStatus,
  getItemById
};