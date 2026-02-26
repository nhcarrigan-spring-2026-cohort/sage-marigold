const pool = require('../config/db');

//Create a new donation item
const createItem = async ({
  title,
  description,
  category,
  condition,
  location,
  pickupInstructions,
  donor_id,
  images,
}) => {
  const result = await pool.query(
    `INSERT INTO donation_items 
    (title, description, category, condition, location, pickup_instructions, donor_id, images)
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`,
    [
      title,
      description,
      category,
      condition,
      location,
      pickupInstructions,
      donor_id,
      images,
    ]
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

const Items = {
  findAvailable: async ({ category, condition, search, location, lat, lng }) => {
    let query = `SELECT * FROM donation_items WHERE status='available'`
    let queryParams = [];
    let paramIdx = 1;

    if (category) {
      query += ` AND category ILIKE $${paramIdx++}`;
      queryParams.push(category);
    }
    if (condition) {
      query += ` AND condition ILIKE $${paramIdx++}`;
      queryParams.push(condition);
    }
    if (search) {
      query += ` AND (title ILIKE $${paramIdx} OR description ILIKE $${paramIdx})`;
      queryParams.push(`%${search}%`);
      paramIdx++;
    }
    if (location) {
      query += ` AND location ILIKE $${paramIdx++}`;
      queryParams.push(`%${location}%`);
    }

    if (lat && lng) {
      const latNum = parseFloat(lat);
      const lngNum = parseFloat(lng);
      query = `
        SELECT *, 
        (6371 * acos(cos(radians($${paramIdx})) * cos(radians(latitude)) * cos(radians(longitude) - radians($${paramIdx + 1})) + sin(radians($${paramIdx})) * sin(radians(latitude)))) AS distance 
        FROM (${query}) as filtered_items
        WHERE (6371 * acos(cos(radians($${paramIdx})) * cos(radians(latitude)) * cos(radians(longitude) - radians($${paramIdx + 1})) + sin(radians($${paramIdx})) * sin(radians(latitude)))) < 50
        ORDER BY distance ASC
      `;
      queryParams.push(latNum, lngNum);
    }
    else{
      query+=` ORDER BY created_at DESC`;
    }
    const result = await pool.query(query, queryParams);
    return result.rows;
  }
};

module.exports = {
  createItem,
  getAllAvailableItems,
  getAllItems,
  updateItemStatus,
  getItemById,
  Items,
};
