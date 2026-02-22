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
    console.error('Error fetching your profile:', error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
};

const getUserActivity = async (req, res = response) => {
  const currentUser_id = req.user.id;
  try {
    const donationsResult=await db.query(
      `SELECT title, status, created_at, 
      (SELECT COUNT(*) FROM requests r WHERE r.item_id=i.id AND r.status='pending') AS pending_count 
      FROM donation_items i WHERE donor_id=$1
      ORDER BY created_at DESC`,
      [currentUser_id]
    )
    const myDonations=donationsResult.rows
 
    return res.status(200).json({
      ok: true,
      myDonations, 
    })
  

  } catch (error) {
    console.error('Error fetching your listed donation items', error)
    return res.status(500).json({
      ok: false,
      return: 'Internal server error'
    })
  }
};

module.exports = {
  getUserProfile,
  getUserActivity,
};
