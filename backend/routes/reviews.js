const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const Review = require('../models/Review');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/reviews
// @desc    Get all reviews (with optional ?product filter)
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.product) {
      filter.treatmentOrProduct = { $regex: req.query.product, $options: 'i' };
    }

    const reviews = await Review.find(filter).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/reviews
// @desc    Submit a new review
// @access  Private
router.post(
  '/',
  protect,
  [
    body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
    body('title').trim().notEmpty().withMessage('Review title is required'),
    body('comment').trim().notEmpty().withMessage('Review comment is required'),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { rating, title, comment, treatmentOrProduct } = req.body;

      const review = await Review.create({
        author: req.user.name,
        userId: req.user._id,
        rating,
        title,
        comment,
        verifiedPurchase: true,
        treatmentOrProduct: treatmentOrProduct || '',
      });

      res.status(201).json(review);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
