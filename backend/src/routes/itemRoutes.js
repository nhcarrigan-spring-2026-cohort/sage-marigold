const express = require('express');
const router = express.Router();
const { createNewItem, listAvailableItems, listAllItems, listTotalItems, changeItemStatus, getItem } = require('../controllers/itemController');
const { validateJWT } = require('../middlewares/validate-jwt');

//Create a new donation item
router.post('/', validateJWT, createNewItem);

//List all available items (public)
router.get('/', listAvailableItems);
router.get('/', listAllItems);
// List all items (ignore status) - for testing / admin
router.get('/all', listTotalItems);



//Get a single item by ID
router.get('/:id', getItem);

//Update an item's status
router.put('/:id/status', validateJWT, changeItemStatus);
router.patch('/:id/status', validateJWT, changeItemStatus);


module.exports = router;
