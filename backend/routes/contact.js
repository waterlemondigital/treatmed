const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const ContactInquiry = require('../models/ContactInquiry');

const router = express.Router();

// @route   POST /api/contact
// @desc    Submit a contact inquiry
// @access  Public
router.post(
  '/',
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
    body('message').trim().notEmpty().withMessage('Message is required'),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { name, phone, email, subject, message } = req.body;

      const inquiry = await ContactInquiry.create({
        name,
        phone,
        email: email || '',
        subject: subject || 'General Inquiry',
        message,
      });

      res.status(201).json({
        message: 'Your inquiry has been received. Dr. Zaid\'s team will contact you within 2-4 hours.',
        inquiry,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
