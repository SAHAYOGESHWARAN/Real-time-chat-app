const express = require('express');
const router = express.Router();
const statusController = require('../controllers/statusController');

router.post('/addStatus', statusController.addStatus);
router.get('/getStatus', statusController.getStatus);

module.exports = router;
