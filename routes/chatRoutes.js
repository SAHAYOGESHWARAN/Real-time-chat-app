const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chatController');

// Route to send a message
router.post('/sendMessage', chatController.sendMessage);

// Route to get messages between users
router.get('/getMessages', chatController.getMessages);

module.exports = router;
