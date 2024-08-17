const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
require('dotenv').config();
const multer = require('multer');
const bodyParser = require('body-parser');

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header('x-auth-token');
  if (!token) return res.status(401).json({ message: 'No token, authorization denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Set up multer for file uploads
const upload = multer({ dest: 'uploads/' });

// Body parser middleware
router.use(bodyParser.json());

// Example route using multer for file uploads
router.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded!');
});

// Example middleware to log request URLs
router.use((req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
});

// Example route that requires JWT authentication
router.get('/protected', authMiddleware, (req, res) => {
  res.send('This is a protected route');
});

// Example of using an array of middleware functions
const middlewareArray = [
  (req, res, next) => { console.log('Middleware 1'); next(); },
  (req, res, next) => { console.log('Middleware 2'); next(); }
];

router.use(middlewareArray);

// Export the router to be used in your main app file
module.exports = router;
