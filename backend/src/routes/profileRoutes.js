const express = require('express');
const router = express.Router();
const { 
  getProfile, 
  updateProfile, 
  deleteAccount 
} = require('../controllers/profileController');
const { validateJWT } = require('../middlewares/validate-jwt');

// All routes require authentication
router.use(validateJWT);

// Get current user's profile
router.get('/profile', getProfile);

// Update current user's profile
router.put('/profile', updateProfile);

// Delete current user's account (soft delete with anonymization)
router.delete('/account', deleteAccount);

module.exports = router;