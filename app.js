const express = require('express');
const path = require('path');
const app = express();
const port = 3000; // You can use any port number you prefer

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

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

app.listen(port, () => console.log(`Server running on http://localhost:${port}`));

const multer = require('multer');
