const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const connectDB = require('./config/db');
const chatRoutes = require('./routes/chatRoutes');
const Message = require('./models/message');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);

connectDB();

app.use(express.static('public'));
app.use('/api/chat', chatRoutes);

io.on('connection', socket => {
  console.log('New user connected');

  socket.on('chatMessage', async msg => {
    const message = new Message(msg);
    await message.save();
    io.emit('chatMessage', msg);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
