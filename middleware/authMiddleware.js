const jwt = require('jsonwebtoken');
require('dotenv').config();

module.exports = (req, res, next) => {
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

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

// Correct usage in a route
router.post('/upload', upload.single('file'), (req, res) => {
    res.send('File uploaded!');
});
router.use((req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next(); // Don't forget to call next() to pass control to the next middleware
});
const someObject = { key: 'value' }; // This is an object, not a middleware function

router.use(someObject); // This will throw the error

const bodyParser = require('body-parser');

// Correct usage
router.use(bodyParser.json());

// Incorrect usage (missing function call)
router.use(bodyParser.json); // This would pass the function reference instead of the result of its execution

console.log(typeof middleware); // This should log 'function'
const express = require('express');
const router = express.Router();

// Your middleware and routes here

const middlewareArray = [
  (req, res, next) => { /* first middleware */ next(); },
  (req, res, next) => { /* second middleware */ next(); }
];

router.use(middlewareArray);

