// src/models/serviceModels.js
const db = require('../config/db');

const serviceModels = {
    getAllServices: async () => {
        const [rows] = await db.query('SELECT * FROM services');
        return rows;
    },
};

module.exports = serviceModels;