const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
app.use('/css', express.static(path.join(__dirname, 'public/css')));
app.use('/js', express.static(path.join(__dirname, 'public/js')));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));
app.use('/api/videoCall', require('./routes/videoCallRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/status', require('./routes/statusRoutes'));

// Serve HTML pages
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'public/welcome.html')));
app.get('/country-select', (req, res) => res.sendFile(path.join(__dirname, 'public/country-select.html')));
app.get('/otp', (req, res) => res.sendFile(path.join(__dirname, 'public/otp.html')));
app.get('/chat', (req, res) => res.sendFile(path.join(__dirname, 'public/chat.html')));
app.get('/settings', (req, res) => res.sendFile(path.join(__dirname, 'public/settings.html')));
app.get('/status', (req, res) => res.sendFile(path.join(__dirname, 'public/status.html')));

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
