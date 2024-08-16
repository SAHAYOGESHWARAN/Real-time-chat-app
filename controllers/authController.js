const User = require('../models/user');
const jwt = require('jsonwebtoken');
const twilio = require('twilio');
require('dotenv').config();

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_AUTH_TOKEN);

exports.sendOtp = async (req, res) => {
  const { country, phone } = req.body;
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  
  try {
    const user = await User.findOneAndUpdate(
      { phone },
      { country, phone, otp },
      { upsert: true, new: true }
    );

    await client.messages.create({
      body: `Your OTP is ${otp}`,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+${country}${phone}`,
    });

    res.status(200).json({ message: 'OTP sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyOtp = async (req, res) => {
  const { phone, otp } = req.body;
  try {
    const user = await User.findOne({ phone, otp });
    if (!user) return res.status(400).json({ error: 'Invalid OTP' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.status(200).json({ token, message: 'OTP verified' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
