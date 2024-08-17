const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const multer = require('multer');
const bodyParser = require('body-parser');
require('dotenv').config();

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Body parser middleware
router.use(bodyParser.json());

// Example route using multer for file uploads
router.post('/upload', upload.single('file'), (req, res) => {
  res.status(200).json({ message: 'File uploaded!', file: req.file });
});

// Example middleware to log request URLs
router.use((req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
});

// Example route that requires JWT authentication
router.get('/protected', authMiddleware, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});

// Example of using an array of middleware functions
router.use((req, res, next) => {
  console.log('Middleware 1');
  next();
}, (req, res, next) => {
  console.log('Middleware 2');
  next();
});

// Export the router to be used in your main app file
module.exports = router;

// authController.js

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

// chatController.js

const Message = require('../models/message');

// Controller method to send a message
exports.sendMessage = async (req, res) => {
  const { sender, receiver, message, media } = req.body;
  try {
    const newMessage = new Message({ sender, receiver, message, media });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Controller method to get messages between sender and receiver
exports.getMessages = async (req, res) => {
  const { sender, receiver } = req.query;
  try {
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controllers/mediaController.js

const path = require('path');
const multer = require('multer');

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    // Use the original file name with a timestamp to avoid collisions
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

// Controller method to handle file uploads
exports.uploadMedia = (req, res) => {
  upload.single('media')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading file' });
    }
    // Respond with the file path after successful upload
    res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
  });
};

// controllers/settingsController.js

const User = require('../models/user');

// Update user settings
exports.updateSettings = async (req, res) => {
  const { userId } = req.user;
  const { username, status, avatar } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { username, status, avatar }, { new: true });
    res.status(200).json({ message: 'Settings updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Change user phone number
exports.changeNumber = async (req, res) => {
  const { userId } = req.user;
  const { newPhone } = req.body;
  try {
    await User.findByIdAndUpdate(userId, { phone: newPhone }, { new: true });
    res.status(200).json({ message: 'Phone number updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controllers/statusController.js

const Status = require('../models/status');

// Add a new status
exports.addStatus = async (req, res) => {
  const { user, statusText, media } = req.body;
  try {
    const newStatus = new Status({ user, statusText, media });
    await newStatus.save();
    res.status(201).json({ message: 'Status added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all statuses
exports.getStatus = async (req, res) => {
  try {
    const statuses = await Status.find().sort({ timestamp: -1 });
    res.status(200).json(statuses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// controllers/videoCallController.js

// Example placeholder for starting a video call
exports.startVideoCall = (req, res) => {
  // Implement logic to initiate a video call
  // For example, set up signaling, save call info to database, etc.
  res.status(200).json({ message: 'Video call started' });
};

// Example placeholder for ending a video call
exports.endVideoCall = (req, res) => {
  // Implement logic to end a video call
  // For example, close signaling, update call status, etc.
  res.status(200).json({ message: 'Video call ended' });
};



