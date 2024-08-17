const mongoose = require('mongoose');

// Define the schema for the Status model
const StatusSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  statusText: {
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
module.exports = mongoose.model('Status', StatusSchema);
