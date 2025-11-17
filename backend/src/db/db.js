// portfolio-backend-app/src/db.js
const knex = require('knex');
const config = require('../../knexfile')

// Use the development configuration from knexfile.js
const db = knex(config.development);

// Verify the connection
db.raw('SELECT 1')
  .then(() => console.log('Database connected successfully'))
  .catch(err => console.error('Database connection failed:', err));

module.exports = db;