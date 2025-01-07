const express = require('express');
const multer = require('multer');
const { getResources, submitResource } = require('../controllers/resourceController');

const router = express.Router();

// Multer setup for file uploads (PDFs)
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads/'),
  filename: (req, file, cb) => cb(null, file.originalname),
});

const upload = multer({ storage: storage });

// Routes
router.get('/resources', getResources);
router.post('/submitResource', upload.single('pdf'), submitResource);

module.exports = router;

