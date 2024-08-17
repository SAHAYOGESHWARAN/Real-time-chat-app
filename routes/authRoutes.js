const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Route to send OTP
router.post('/sendOtp', authController.sendOtp);

// Route to verify OTP
router.post('/verifyOtp', authController.verifyOtp);

module.exports = router;
