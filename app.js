const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config();
const multer = require('multer'); // Uncomment if you use file uploads
const port = process.env.PORT || 3000;

// Initialize the app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// JWT authentication middleware
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

// Multer setup for file uploads (if needed)
const upload = multer({ dest: 'uploads/' });

// Routes
app.use('/api/media', require('./routes/mediaRoutes'));
app.use('/api/videoCall', require('./routes/videoCallRoutes'));
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));

// Serve HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/welcome.html')));
app.get('/country-select', (req, res) => res.sendFile(path.join(__dirname, 'public/country-select.html')));
app.get('/otp', (req, res) => res.sendFile(path.join(__dirname, 'public/otp.html')));
app.get('/chat', (req, res) => res.sendFile(path.join(__dirname, 'public/chat.html')));
app.get('/settings', (req, res) => res.sendFile(path.join(__dirname, 'public/settings.html')));
app.get('/status', (req, res) => res.sendFile(path.join(__dirname, 'public/status.html')));

// Start the server
app.listen(port, () => console.log(`Server running on http://localhost:${port}`));
