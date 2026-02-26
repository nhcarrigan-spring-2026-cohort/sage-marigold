const db = require('../config/db');
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
    console.error('Error fetching user profile:', error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
};

const getUserActivity = async (req, res = response) => {
  const currentUser_id = req.user.id;
  try {
    const donationsResult = await db.query(
      `SELECT id, title, status, created_at, 
      (SELECT COUNT(*)::int FROM requests r WHERE r.item_id=i.id AND r.status='pending') AS pending_request_count 
      FROM donation_items i WHERE donor_id=$1
      ORDER BY created_at DESC`,
      [currentUser_id]
    );
    const myDonations = donationsResult.rows;

    const applicationsResult = await db.query(
      `SELECT 
      r.id,
      i.title AS item_name, 
      r.status,
      r.created_at,
      CASE
        WHEN r.status='accepted' THEN 'Request approved! Check your email for pickup details.'
        WHEN r.status='rejected' THEN 'Thank you for your interest! This item has found a new home. Visit the Explore page to find more items nearby!'
        WHEN r.status='cancelled' THEN 'You have cancelled this request. This item is no longer in your active list.'
        WHEN r.status='completed' THEN 'You have successfully received this item. Thank you for being part of the community. Enjoy!'
        ELSE 'Waiting for donor response...'
      END AS status_message, 
      u.full_name AS donor_name,
      CASE 
        WHEN r.status IN ('accepted', 'completed') THEN u.email 
        ELSE NULL 
      END AS donor_email
      FROM requests r 
      JOIN donation_items i ON r.item_id=i.id
      JOIN users u ON i.donor_id=u.id
      WHERE requester_id=$1
      ORDER BY r.created_at DESC`,
      [currentUser_id]
    );

    const myApplications = applicationsResult.rows;

    return res.status(200).json({
      ok: true,
      myDonations,
      myApplications,
    });
  } catch (error) {
    console.error('Error fetching user activity:', error);
    return res.status(500).json({
      ok: false,
      message: 'Internal server error',
    });
  }
};

module.exports = {
  getUserProfile,
  getUserActivity,
};
