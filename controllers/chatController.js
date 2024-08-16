const Message = require('../models/message');

exports.sendMessage = async (req, res) => {
  const { sender, receiver, message, media } = req.body;
  try {
    const newMessage = new Message({ sender, receiver, message, media });
    await newMessage.save();
    res.status(201).json({ message: 'Message sent' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getMessages = async (req, res) => {
  const { sender, receiver } = req.query;
  try {
    const messages = await Message.find({
      $or: [
        { sender, receiver },
        { sender: receiver, receiver: sender },
      ],
    }).sort({ timestamp: 1 });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
