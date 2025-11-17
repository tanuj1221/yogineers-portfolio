// routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const serviceController = require('../controllers/serviceController');

router.get('/services', serviceController.getAllServices);
router.get('/services/:service_id',serviceController.getServiceById)
module.exports = router;