const mongoose = require('mongoose');

// Define the schema for the User model
const UserSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  otp: {
    type: String,
    trim: true
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  status: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    trim: true
  }
});

// Create the model from the schema
module.exports = mongoose.model('User', UserSchema);
