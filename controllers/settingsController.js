const User = require('../models/user');

exports.updateSettings = async (req, res) => {
  const { userId } = req.user;
  const { username, status, avatar } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { username, status, avatar });
    res.status(200).json({ message: 'Settings updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.changeNumber = async (req, res) => {
  const { userId } = req.user;
  const { newPhone } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { phone: newPhone });
    res.status(200).json({ message: 'Phone number updated' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
