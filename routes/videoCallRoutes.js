const express = require('express');
const router = express.Router();
const videoCallController = require('../controllers/videoCallController');
const authMiddleware = require('../middleware/authMiddleware');

// Route to start a video call
router.post('/startCall', authMiddleware, videoCallController.startVideoCall);

// Route to end a video call
router.post('/endCall', authMiddleware, videoCallController.endVideoCall);

module.exports = router;
