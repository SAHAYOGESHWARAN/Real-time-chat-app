const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to update user settings, protected by authentication middleware
router.put('/updateSettings', authMiddleware, settingsController.updateSettings);

// Route to change user phone number, protected by authentication middleware
router.put('/changeNumber', authMiddleware, settingsController.changeNumber);

module.exports = router;
