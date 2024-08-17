const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

// Route to add a status
router.post('/addStatus', statusController.addStatus);

// Route to get all statuses
router.get('/getStatus', statusController.getStatus);

module.exports = router;
