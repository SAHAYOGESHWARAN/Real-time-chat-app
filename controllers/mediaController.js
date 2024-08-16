const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

exports.uploadMedia = (req, res) => {
  upload.single('media')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ message: 'Error uploading file' });
    }
    res.json({ filePath: `/uploads/${req.file.filename}` });
  });
};
