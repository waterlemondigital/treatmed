const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const NewsletterSubscriber = require('../models/NewsletterSubscriber');

const router = express.Router();

// @route   POST /api/newsletter/subscribe
// @desc    Subscribe to newsletter
// @access  Public
router.post(
  '/subscribe',
  [
    body('email').isEmail().withMessage('Please enter a valid email address'),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { email, phone } = req.body;

      // Check if already subscribed
      const existing = await NewsletterSubscriber.findOne({ email });
      if (existing) {
        return res.status(200).json({
          message: 'You are already subscribed to Treatmed Wellness Updates!',
        });
      }

      await NewsletterSubscriber.create({
        email,
        phone: phone || '',
      });

      res.status(201).json({
        message: 'Subscribed successfully! You will receive seasonal Unani health tips and exclusive product discounts.',
      });
    } catch (error) {
      next(error);
    }
  }
);

const { protect, admin } = require('../middleware/auth');

// @route   GET /api/newsletter
// @desc    Get all newsletter subscribers (Admin)
// @access  Admin
router.get('/', protect, admin, async (req, res, next) => {
  try {
    const subscribers = await NewsletterSubscriber.find().sort({ createdAt: -1 });
    res.json(subscribers);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
