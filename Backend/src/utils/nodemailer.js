const nodemailer = require('nodemailer'); // Use 'nodemailer' instead of './nodemailer'
require("dotenv").config(); // Add missing parentheses

const createMail = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

module.exports = createMail;
