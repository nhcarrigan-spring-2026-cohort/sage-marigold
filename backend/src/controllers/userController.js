const { db } = require('../config/db');
const { response } = require('express');

const getUserProfile = async (req, res = response) => {
  const currentUser_id = req.user.id;
  try {
    const result = await db.query(
      'SELECT full_name, email, location_address FROM users WHERE id=$1',
      [currentUser_id]
    );
    const user = result.rows[0];
    if (!user) {
      return res.status(404).json({
        ok: false,
        message: 'User not found',
      });
    }
    return res.status(200).json({
      ok: true,
      message: 'User profile was successfully fetched',
      result: user,
    });
  } catch (error) {
    console.error('Error fetching the profile:', error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
};

const getUserActivity = async (req, res = response) => {
  const currentUser_id = req.user.id;
};

module.exports = {
  getUserProfile,
  getUserActivity,
};
