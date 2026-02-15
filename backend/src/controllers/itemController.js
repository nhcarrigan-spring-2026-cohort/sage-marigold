const { createItem, getAllAvailableItems, getAllItems, updateItemStatus, getItemById } = require('../models/Item');

//Create a new donation item
const createNewItem = async (req, res) => {
  try {
    const { title, description, category, location, condition} = req.body;

    if (!title || !description || !category || !location) {
      return res.status(400).json({
        ok: false,
        msg: 'Please provide all required fields: title, description, category, location'
      });
    }

    // donor_id comes from authenticated user (req.user.id)
    const donor_id = req.user.id;

    const newItem = await createItem({ title, description, category, location, condition, donor_id });

    res.status(201).json({
      ok: true,
      item: newItem
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Server error creating item' });
  }
};

//Get all available items
const listAvailableItems = async (req, res) => {
  try {
    const items = await getAllAvailableItems();
    res.json({ ok: true, items });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Server error fetching items' });
  }
};

// const listAllItems = async (req, res) => {
//   try {
//     const items = await getAllItemsForListing();
//     res.json({ ok: true, items });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ ok: false, msg: 'Server error fetching items' });
//   }
// };

// Get all items regardless of status
const listTotalItems = async (req, res) => {
    try {
        const items = await getAllItems();
        res.json({ ok: true, items });
    } catch (error) {
        console.error(error);
        res.status(500).json({ ok: false, msg: 'Server error fetching all items' });
    }
}

//Update item status
const changeItemStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const validStatuses = ['available', 'reserved', 'claimed', 'withdrawn'];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({ ok: false, msg: 'Invalid status value' });
    }
    const existingItem = await getItemById(id);

    if (!existingItem) {
      return res.status(404).json({ ok: false, msg: 'Item not found' });
    }

    if (existingItem.donor_id !== req.user.id) {
      return res.status(403).json({
        ok: false,
        msg: 'You are not authorized to update this item'
      });
    }
    
    const updatedItem = await updateItemStatus(id, status);

    res.json({ ok: true, item: updatedItem });

  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Server error updating item status' });
  }
};


//Get a single item by ID (optional)
const getItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await getItemById(id);

    if (!item) {
      return res.status(404).json({ ok: false, msg: 'Item not found' });
    }

    res.json({ ok: true, item });
  } catch (error) {
    console.error(error);
    res.status(500).json({ ok: false, msg: 'Server error fetching item' });
  }
};

module.exports = {
  createNewItem,
  listAvailableItems,
  listTotalItems,
  changeItemStatus,
  getItem
};

