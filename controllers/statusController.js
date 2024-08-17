const Status = require('../models/status');

// Function to add a new status
exports.addStatus = async (req, res) => {
  const { user, statusText, media } = req.body;

  try {
    // Validate input
    if (!user || (!statusText && !media)) {
      return res.status(400).json({ message: 'User and at least one of statusText or media are required' });
    }

    // Create and save new status
    const newStatus = new Status({ user, statusText, media });
    await newStatus.save();

    res.status(201).json({ message: 'Status added successfully', status: newStatus });
  } catch (err) {
    console.error('Error adding status:', err.message);
    res.status(500).json({ error: 'Failed to add status' });
  }
};

// Function to get all statuses
exports.getStatus = async (req, res) => {
  try {
    // Retrieve all statuses, sorted by timestamp in descending order
    const statuses = await Status.find().sort({ timestamp: -1 });

    if (statuses.length === 0) {
      return res.status(404).json({ message: 'No statuses found' });
    }

    res.status(200).json(statuses);
  } catch (err) {
    console.error('Error retrieving statuses:', err.message);
    res.status(500).json({ error: 'Failed to retrieve statuses' });
  }
};
