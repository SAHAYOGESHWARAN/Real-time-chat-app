const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path');

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads')); // Directory where files will be saved
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`); // Use a unique filename
  },
});

const upload = multer({ storage });

// Middleware to verify JWT token
router.use(authMiddleware);

// Route to upload media
router.post('/uploadMedia', upload.single('media'), mediaController.uploadMedia);

module.exports = router;
const path = require('path');

// Controller method to handle file uploads
exports.uploadMedia = (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: 'No file uploaded' });
  }
  // Respond with the file path after successful upload
  res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
};
