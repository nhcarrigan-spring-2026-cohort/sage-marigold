const pool = require('../config/db');

/**
 * Get user profile by ID
 * @param {string} userId - User UUID
 * @returns {object|null} User profile without password
 */
const getUserProfile = async (userId) => {
  const result = await pool.query(
    `SELECT id, full_name, email, location_address, is_active, created_at, updated_at, is_anonymized
     FROM users 
     WHERE id = $1 AND is_anonymized = FALSE`,
    [userId]
  );
  return result.rows[0] || null;
};

/**
 * Update user profile
 * @param {string} userId - User UUID
 * @param {object} updates - Fields to update (full_name, location_address)
 * @returns {object|null} Updated user profile
 */
const updateUserProfile = async (userId, { full_name, location_address }) => {
  // Build dynamic query based on provided fields
  const updates = [];
  const values = [];
  let paramCount = 1;

  if (full_name !== undefined) {
    updates.push(`full_name = $${paramCount}`);
    values.push(full_name);
    paramCount++;
  }

  if (location_address !== undefined) {
    updates.push(`location_address = $${paramCount}`);
    values.push(location_address);
    paramCount++;
  }

  // If no updates provided, return current profile
  if (updates.length === 0) {
    return getUserProfile(userId);
  }

  // Always update updated_at
  updates.push(`updated_at = NOW()`);

  // Add userId to values
  values.push(userId);

  const query = `
    UPDATE users 
    SET ${updates.join(', ')}
    WHERE id = $${paramCount} AND is_anonymized = FALSE
    RETURNING id, full_name, email, location_address, is_active, created_at, updated_at
  `;

  const result = await pool.query(query, values);
  return result.rows[0] || null;
};

/**
 * Anonymize user account (Soft Delete - Option B)
 * This preserves platform statistics while removing PII
 * 
 * Steps:
 * 1. Withdraw all user's available items
 * 2. Cancel all user's pending requests
 * 3. Anonymize user record (remove name/email)
 * 
 * All done in a transaction - if any step fails, all rollback
 * 
 * @param {string} userId - User UUID
 * @returns {object} Result with success status and counts
 */
const anonymizeUserAccount = async (userId) => {
  const client = await pool.connect();
  
  try {
    // Start transaction
    await client.query('BEGIN');

    // Step 1: Withdraw all available items
    const itemsResult = await client.query(
      `UPDATE donation_items 
       SET status = 'withdrawn', updated_at = NOW()
       WHERE donor_id = $1 AND status = 'available'
       RETURNING id`,
      [userId]
    );
    const withdrawnItemsCount = itemsResult.rowCount;

    // Step 2: Cancel all pending requests
    const requestsResult = await client.query(
      `UPDATE requests 
       SET status = 'cancelled', updated_at = NOW()
       WHERE requester_id = $1 AND status = 'pending'
       RETURNING id`,
      [userId]
    );
    const cancelledRequestsCount = requestsResult.rowCount;

    // Step 3: Anonymize user record
    const anonymizedResult = await client.query(
      `UPDATE users 
       SET 
         full_name = 'Deleted User',
         email = $1,
         location_address = 'Location Hidden',
         is_anonymized = TRUE,
         is_active = FALSE,
         updated_at = NOW()
       WHERE id = $2 AND is_anonymized = FALSE
       RETURNING id`,
      [`deleted_${userId}@anonymized.local`, userId]
    );

    if (anonymizedResult.rowCount === 0) {
      throw new Error('User not found or already anonymized');
    }

    // Commit transaction
    await client.query('COMMIT');

    return {
      success: true,
      withdrawnItems: withdrawnItemsCount,
      cancelledRequests: cancelledRequestsCount,
      userId: userId
    };

  } catch (error) {
    // Rollback on any error
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

module.exports = {
  getUserProfile,
  updateUserProfile,
  anonymizeUserAccount
};