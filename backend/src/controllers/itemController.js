const {
  createItem,
  getAllAvailableItems,
  getAllItems,
  updateItemStatus,
  getItemById,
} = require('../models/Item');
const { uploadToCloudinary } = require('../services/cloudinaryService');
//const db = require('../config/db');

//Create a new donation item
const createNewItem = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      condition,
      location,
      pickup_instructions: pickupInstructions,
    } = req.body;
    const donor_id = req.user.id;

    if (!title || !description || !category || !condition || !location) {
      return res.status(400).json({
        ok: false,
        msg: 'Please provide all required fields: title, description, category,condition, location, pickupInstructions',
      });
    }

    if (!req.files || req.files.length === 0) {
      return res
        .status(400)
        .json({ ok: false, msg: 'At least one image is required :(' });
    }

    const uploadPromises = req.files.map((file) =>
      uploadToCloudinary(file.buffer)
    );
    const imageUrls = await Promise.all(uploadPromises);

    const newItem = await createItem({
      title,
      description,
      category,
      condition,
      location,
      pickupInstructions,
      donor_id,
      images: imageUrls,
    });

    res.status(201).json({
      ok: true,
      item: newItem,
    });
  } catch (error) {
    console.error('Error creating item:', error);
    res.status(500).json({
      ok: false,
      msg: 'Server error creating item',
      details: error.message,
    });
  }
};

//Get all available items (Public)
const listAvailableItems = async (req, res) => {
  try {
    const items = await getAllAvailableItems();
    res.json({ ok: true, items });
  } catch (error) {
    console.error('Error fetching available items:', error);
    res.status(500).json({ ok: false, msg: 'Server error fetching items' });
  }
};

//Get all items regardless of status (Public - for admin/testing)
const listTotalItems = async (req, res) => {
  try {
    const items = await getAllItems();
    res.json({ ok: true, items });
  } catch (error) {
    console.error('Error fetching all items:', error);
    res.status(500).json({ ok: false, msg: 'Server error fetching all items' });
  }
};

//Update item status
const changeItemStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['available', 'reserved', 'claimed', 'withdrawn'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        ok: false,
        msg: 'Invalid status value. Must be one of: available, reserved, claimed, withdrawn',
      });
    }

    const existingItem = await getItemById(id);

    if (!existingItem) {
      return res.status(404).json({ ok: false, msg: 'Item not found' });
    }

    // Authorization check: only the donor can update their item
    if (existingItem.donor_id !== req.user.id) {
      return res.status(403).json({
        ok: false,
        msg: 'You are not authorized to update this item',
      });
    }

    const updatedItem = await updateItemStatus(id, status);

    if (!updatedItem) {
      return res.status(404).json({ ok: false, msg: 'Item not found' });
    }

    res.json({ ok: true, item: updatedItem });
  } catch (error) {
    console.error('Error updating item status:', error);
    res
      .status(500)
      .json({ ok: false, msg: 'Server error updating item status' });
  }
};

//Get a single item by ID (Public)
const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await getItemById(id);

    if (!item) {
      return res.status(404).json({ ok: false, msg: 'Item not found' });
    }

    res.json({ ok: true, item });
  } catch (error) {
    console.error('Error fetching item:', error);
    res.status(500).json({ ok: false, msg: 'Server error fetching item' });
  }
};

module.exports = {
  createNewItem,
  listAvailableItems,
  listTotalItems,
  changeItemStatus,
  getItem,
};
