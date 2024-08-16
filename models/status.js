const mongoose = require('mongoose');

const StatusSchema = new mongoose.Schema({
  user: String,
  statusText: String,
  media: String,
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Status', StatusSchema);
