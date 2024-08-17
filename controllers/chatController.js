const Message = require('../models/message');

// Function to send a message
exports.sendMessage = async (req, res) => {
  const { sender, receiver, message, media } = req.body;

  try {
    // Create a new message document
    const newMessage = new Message({
      sender,
      receiver,
      message,
      media,
      timestamp: new Date(), // Ensure the timestamp is added
    });

    // Save the message to the database
    await newMessage.save();

    res.status(201).json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('Error sending message:', err.message);
    res.status(500).json({ error: 'Failed to send message' });
  }
};

// Function to get messages between two users
exports.getMessages = async (req, res) => {
  const { sender, receiver } = req.query;

  try {
    // Find messages between the two users, sorted by timestamp
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ timestamp: 1 });

    res.status(200).json(messages);
  } catch (err) {
    console.error('Error retrieving messages:', err.message);
    res.status(500).json({ error: 'Failed to retrieve messages' });
  }
};
