const express = require('express');
const router = express.Router();
const { check } = require('express-validator');
const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields } = require('../middlewares/validate-fields');
const { validateUUID } = require('../middlewares/validate-uuid');

const {
  createRequest,
  getMyRequests,
  getItemRequests,
  acceptRequest,
  cancelRequest,
} = require('../controllers/requestController');

// POST /api/requests
router.post(
  '/',
  [
    validateJWT,
    check('item_id', 'Item ID is required and must be a UUID').isUUID(),
    check('application_data', 'Application data cannot be empty')
      .not()
      .isEmpty(),
    validateFields,
  ],
  createRequest
);

// GET /api/requests/me (Requester seeing all the item requests they have made)
router.get('/me', validateJWT, getMyRequests);

// GET /api/requests/item/:item_id (Donor seeing all requests for one item)
router.get(
  '/item/:item_id',
  [validateJWT, validateUUID('item_id')],
  getItemRequests
);

// PATCH /api/requests/:request_id/status (Donor accepting a request)
router.patch(
  '/:request_id/status',
  [validateJWT, validateUUID('request_id')],
  acceptRequest
);

// PATCH /api/requests/:request_id/cancel (Requester cancelling their own)
router.patch(
  '/:request_id/cancel',
  [validateJWT, validateUUID('request_id')],
  cancelRequest
);

module.exports = router;

