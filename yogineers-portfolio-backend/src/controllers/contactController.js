//C:\Users\HP\Desktop\ankush-projects\portfolio\portfolio-backend-app\src\controllers\contactController.js
require('dotenv').config()
const knex = require('../db/db'); 
const nodemailer = require('nodemailer');

// Email configuration
const transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

exports.submitContactForm = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    // 1. Insert into MySQL 'contacts' table
    await knex('contacts').insert({
      name,
      email,
      subject: subject || null, // Handles optional subject
      message,
      // created_at and updated_at are auto-generated
    });

    // 2. Send email to admin
    await transporter.sendMail({
      from: `"Contact Form" <${email}>`,
      to: process.env.ADMIN_EMAIL,
      subject: `New Contact: ${subject || 'No Subject'}`,
      html: `
        <h3>New Contact Submission</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${subject ? `<p><strong>Subject:</strong> ${subject}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Database/Email error:', error);
    res.status(500).json({ error: 'Failed to process contact form' });
  }
};