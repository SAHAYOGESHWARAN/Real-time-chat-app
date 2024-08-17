const path = require('path');
const fs = require('fs');
const multer = require('multer');

// Ensure the uploads directory exists
const uploadDir = path.join(__dirname, '../public/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Set up multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Set a file size limit (e.g., 10 MB)
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif|mp4|mkv/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error('Only images and video files are allowed!'));
    }
  },
});

exports.uploadMedia = (req, res) => {
  upload.single('media')(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      // Multer-specific errors
      return res.status(400).json({ message: `Multer error: ${err.message}` });
    } else if (err) {
      // Other errors
      return res.status(400).json({ message: err.message });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    res.status(200).json({ filePath: `/uploads/${req.file.filename}` });
  });
};
