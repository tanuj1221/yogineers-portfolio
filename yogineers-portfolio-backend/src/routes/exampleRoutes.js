const express = require('express');
const { getAllExamples } = require('../controllers/exampleController');
const router = express.Router();

router.get('/examples', getAllExamples);

module.exports = router;