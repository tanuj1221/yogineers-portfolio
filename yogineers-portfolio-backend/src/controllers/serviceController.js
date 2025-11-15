// src/controllers/serviceController.js
const serviceModels = require('../models/serviceModels');
const knex = require('../db/db');

exports.getAllServices = async (req, res) => {
    try {
        const services = await serviceModels.getAllServices(); // Add await here
        res.json(services); 
    } catch (error) {
        console.error('Error fetching services:', error);
        res.status(500).json({ error: error.message });
    }
};

exports.getServiceById = async (req, res) => {
    try {
      const service = await knex('services')
        .where('service_id',  req.params.service_id)
        .first();
  
      if (!service) {
        return res.status(404).json({ error: 'Service not found' });
      }
  
      res.json(service);
    } catch (error) {
      res.status(500).json({ 
        error: 'Failed to fetch service',
        details: process.env.NODE_ENV === 'development' ? error.message : undefined
      });
    }
  };