const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    // Fields (name, email, password, etc.) will be added here
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
