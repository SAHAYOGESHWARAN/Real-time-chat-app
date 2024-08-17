const mongoose = require('mongoose');

// Define the schema for the Message model
const MessageSchema = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  message: {
    type: String,
    required: true,
    trim: true
  },
  media: {
    type: String,
    trim: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

// Create the model from the schema
module.exports = mongoose.model('Message', MessageSchema);
