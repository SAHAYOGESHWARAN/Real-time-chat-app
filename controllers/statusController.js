const Status = require('../models/status');

exports.addStatus = async (req, res) => {
  const { user, statusText, media } = req.body;
  try {
    const newStatus = new Status({ user, statusText, media });
    await newStatus.save();
    res.status(201).json({ message: 'Status added' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getStatus = async (req, res) => {
  try {
    const statuses = await Status.find().sort({ timestamp: -1 });
    res.status(200).json(statuses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
