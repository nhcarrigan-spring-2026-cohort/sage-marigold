const express = require('express');
const router = express.Router();
const { validateJWT } = require('../middlewares/validate-jwt');

// Import controllers
const {
  getUserProfile,
  getUserActivity,
} = require('../controllers/userController');

const {
  updateProfile,
  deleteAccount
} = require('../controllers/profileController');

// All routes require authentication
router.use(validateJWT);

// Profile endpoints (from issue #52 - user activity)
router.get('/me', getUserProfile);
router.get('/activity', getUserActivity);

// Profile management endpoints (from issue #53 - your work)
router.put('/me', updateProfile);
router.delete('/account', deleteAccount);

module.exports = router;