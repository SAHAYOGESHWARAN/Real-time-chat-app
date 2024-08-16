const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const authMiddleware = require('../middleware/authMiddleware');

router.put('/updateSettings', authMiddleware, settingsController.updateSettings);
router.put('/changeNumber', authMiddleware, settingsController.changeNumber);

module.exports = router;
