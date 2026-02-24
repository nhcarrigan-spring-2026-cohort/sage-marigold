const db = require('../config/db');

const Request = {
  // Helper for getMyRequests (Query for a requester to see their history)
  findByRequester: async (requesterId) => {
    const query = `
      SELECT r.id, r.status, r.created_at, i.title AS item_name, i.description AS item_description,
      u.full_name AS donor_name,
      CASE 
        WHEN r.status IN ('accepted', 'completed') THEN u.email 
        ELSE NULL 
      END AS donor_email
      FROM requests r 
      JOIN donation_items i ON r.item_id=i.id 
      JOIN users u ON i.donor_id=u.id
      WHERE r.requester_id=$1
      ORDER BY r.created_at DESC`;
    const { rows } = await db.query(query, [requesterId]);
    return rows;
  },

  // Helper for getItemRequests (Query for a donor to see applicants for their item)
  findByItem: async (itemId, donorId) => {
    const query = `
      SELECT r.id AS request_id, r.status, r.application_data, u.full_name AS requester_name, 
      CASE 
        WHEN r.status='pending' OR r.status='rejected' OR r.status='cancelled' THEN NULL
        ELSE u.email
      END AS requester_email
      FROM requests r 
      JOIN users u ON r.requester_id=u.id 
      JOIN donation_items i ON r.item_id=i.id 
      WHERE r.item_id=$1 AND i.donor_id=$2`;
    const { rows } = await db.query(query, [itemId, donorId]);
    return rows;
  },
};

module.exports = Request;
