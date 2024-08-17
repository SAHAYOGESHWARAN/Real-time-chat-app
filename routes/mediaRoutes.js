const express = require('express');
const router = express.Router();
const mediaController = require('../controllers/mediaController');

// Route to handle media uploads
router.post('/uploadMedia', mediaController.uploadMedia);

module.exports = router;
