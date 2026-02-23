const express = require('express');
const router = express.Router();
const { validateJWT } = require('../middlewares/validate-jwt');
const {
  getUserProfile,
  getUserActivity,
} = require('../controllers/userController');

// GET /api/users/me (Authenticated user's profile row from the users table)
router.get('/me', validateJWT, getUserProfile);

// GET /api/users/activity (Authenticated user's activity history - donations & requests made by them)
router.get('/activity', validateJWT, getUserActivity);

module.exports = router;
