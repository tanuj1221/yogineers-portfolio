const faqModel = require('../models/faqModel');

const getFAQs = async (req, res) => {
  try {
    const faqs = await faqModel.getAllFaqs();
    res.json(faqs);
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  getFAQs,
};
