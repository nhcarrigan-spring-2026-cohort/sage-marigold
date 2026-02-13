const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema(
  {
    // Fields (title, description, category, etc.) will be added here
  },
  { timestamps: true }
);

module.exports = mongoose.model('Item', itemSchema);
