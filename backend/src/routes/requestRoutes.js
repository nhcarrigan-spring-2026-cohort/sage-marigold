const express = require('express');
const router = express.Router();
const { validateJWT } = require('../middlewares/validate-jwt');
const {
  createRequest,
  getMyRequests,
  getItemRequests,
  acceptRequest,
  cancelRequest,
} = require('../controllers/requestController');

// POST /api/requests
router.post('/', validateJWT, createRequest);

// GET /api/requests/me (Requester seeing all the item requests they have made)
router.get('/me', validateJWT, getMyRequests);

// GET /api/requests/item/:id (Donor seeing all requests for one item)
router.get('/item/:id', validateJWT, getItemRequests);

// PATCH /api/requests/:id/status (Donor accepting a request)
router.patch('/:id/status', validateJWT, acceptRequest);

// PATCH /api/requests/:id/cancel (Requester cancelling their own)
router.patch('/:id/cancel', validateJWT, cancelRequest);

module.exports = router;
