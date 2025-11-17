const db = require('../config/db'); // adjust based on your DB connection file

const getAllFaqs = async () => {
    const [rows] = await db.query('SELECT * FROM faq');
    return rows;
  };
  
  module.exports = {
    getAllFaqs,
  };
