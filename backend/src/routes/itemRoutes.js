const express = require('express');
const router = express.Router();
const { 
  createNewItem, 
  listAvailableItems, 
  listTotalItems, 
  changeItemStatus, 
  getItem 
} = require('../controllers/itemController');
const { validateJWT } = require('../middlewares/validate-jwt');

// Protected routes (require authentication)
router.post('/', validateJWT, createNewItem);
router.put('/:id/status', validateJWT, changeItemStatus);

// Public routes
router.get('/available', listAvailableItems);
router.get('/all', listTotalItems);
router.get('/:id', getItem);

module.exports = router;