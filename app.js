const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

connectDB();

// Middleware
app.use(express.json());
app.use(express.static('public'));

// Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/chat', require('./routes/chatRoutes'));
app.use('/api/settings', require('./routes/settingsRoutes'));
app.use('/api/media', require('./routes/mediaRoutes'));
app.use('/api/status', require('./routes/statusRoutes'));

// Socket.io connection
io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));
