// uploadRoutes.js

const express = require('express');
const router = express.Router();
const upload = require('../utils/upload');
const { uploadData } = require('../controllers/uploadController');

// Endpoint for file upload
router.post('/upload', upload.single('file'), uploadData);

module.exports = router;