const User = require('../models/user');

// Function to update user settings (username, status, avatar)
exports.updateSettings = async (req, res) => {
  const { userId } = req.user;  // Ensure that req.user is set by the authentication middleware
  const { username, status, avatar } = req.body;

  try {
    // Validate the input fields (optional)
    if (!username && !status && !avatar) {
      return res.status(400).json({ message: 'No fields to update' });
    }

    // Update user settings
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { username, status, avatar },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Settings updated', user: updatedUser });
  } catch (err) {
    console.error('Error updating settings:', err.message);
    res.status(500).json({ error: 'Failed to update settings' });
  }
};

// Function to change user's phone number
exports.changeNumber = async (req, res) => {
  const { userId } = req.user;  // Ensure that req.user is set by the authentication middleware
  const { newPhone } = req.body;

  try {
    // Validate the new phone number
    if (!newPhone) {
      return res.status(400).json({ message: 'New phone number is required' });
    }

    // Update the user's phone number
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { phone: newPhone },
      { new: true } // Return the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'Phone number updated', user: updatedUser });
  } catch (err) {
    console.error('Error updating phone number:', err.message);
    res.status(500).json({ error: 'Failed to update phone number' });
  }
};
