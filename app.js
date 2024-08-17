const express = require('express');
const bodyParser = require('body-parser');
//const multer = require('multer');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const port = 3000; // You can use any port number you prefer

// Middleware
//app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
// app.use('/css', express.static(path.join(__dirname, 'public/css')));
// app.use('/js', express.static(path.join(__dirname, 'public/js')));

// // Routes
// app.use('/api/media', require('./routes/mediaRoutes'));
// app.use('/api/videoCall', require('./routes/videoCallRoutes'));
// app.use('/api/auth', require('./routes/authRoutes'));
// app.use('/api/chat', require('./routes/chatRoutes'));

// // Serve HTML pages
// app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/welcome.html')));
// app.get('/country-select', (req, res) => res.sendFile(path.join(__dirname, 'public/country-select.html')));
// app.get('/otp', (req, res) => res.sendFile(path.join(__dirname, 'public/otp.html')));
// app.get('/chat', (req, res) => res.sendFile(path.join(__dirname, 'public/chat.html')));
// app.get('/settings', (req, res) => res.sendFile(path.join(__dirname, 'public/settings.html')));
// app.get('/status', (req, res) => res.sendFile(path.join(__dirname, 'public/status.html')));

// app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

// const multer = require('multer');

// Initialize the app and router
const app = express();
const router = express.Router();

// Body parser middleware
app.use(bodyParser.json());

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

// Multer setup for file uploads
// const upload = multer({ dest: 'uploads/' });

// Routes
// router.post('/upload', upload.single('file'), (req, res) => {
//     res.send('File uploaded!');
// });

router.use(authMiddleware);

// Example route using JWT auth
router.get('/protected', (req, res) => {
  res.send('This is a protected route');
});

// Add router to the app
app.use(router);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));