const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');
const authMiddleware = require('../middleware/authMiddleware');
const multer = require('multer');
const path = require('path'); // Only declare it once

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
