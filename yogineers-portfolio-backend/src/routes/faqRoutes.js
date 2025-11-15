const express = require('express');
const router = express.Router();
const faqController = require('../controllers/faqController');

router.get('/faqs', faqController.getFAQs);

module.exports = router;
