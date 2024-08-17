const User = require('../models/user');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
require('dotenv').config();

// Initialize Twilio client
const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

// Function to send OTP
exports.sendOtp = async (req, res) => {
  const { country, phone } = req.body;

  // Generate a random 6-digit OTP
  const otp = Math.floor(100000 + Math.random() * 900000).toString();

  try {
    // Find user by phone or create a new one with OTP
    const user = await User.findOneAndUpdate(
      { phone },
      { country, phone, otp },
      { upsert: true, new: true }
    );

    // Send OTP via Twilio
    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+${country}${phone}`,
    });

    res.status(200).json({ message: 'OTP sent successfully' });
  } catch (err) {
    console.error('Error sending OTP:', err.message);
    res.status(500).json({ error: 'Failed to send OTP' });
  }
};

// Function to verify OTP
exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    // Check if the OTP matches the one in the database
    const user = await User.findOne({ phone, otp });
    if (!user) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }

    // Generate JWT token if OTP is correct
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, message: 'OTP verified successfully' });
  } catch (err) {
    console.error('Error verifying OTP:', err.message);
    res.status(500).json({ error: 'Failed to verify OTP' });
  }
};
