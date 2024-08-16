const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  country: String,
  phone: String,
  otp: String,
  username: String,
  status: String,
  avatar: String,
});

module.exports = mongoose.model('User', UserSchema);
