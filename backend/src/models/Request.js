const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema(
  {
    // Fields (itemId, userId, message, status, etc.) will be added here
  },
  { timestamps: true }
);

module.exports = mongoose.model('Request', requestSchema);
