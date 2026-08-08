const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const Coupon = require('../models/Coupon');

const router = express.Router();

// @route   POST /api/coupons/validate
// @desc    Validate a coupon code and return discount
// @access  Public
router.post(
  '/validate',
  [
    body('code').trim().notEmpty().withMessage('Coupon code is required'),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { code, subtotal } = req.body;

      const coupon = await Coupon.findOne({
        code: code.toUpperCase(),
        isActive: true,
      });

      if (!coupon) {
        return res.status(400).json({ message: 'Invalid or expired coupon code.' });
      }

      // Check expiry
      if (coupon.expiresAt && new Date() > coupon.expiresAt) {
        return res.status(400).json({ message: 'This coupon has expired.' });
      }

      // Check minimum order amount
      if (subtotal && subtotal < coupon.minOrderAmount) {
        return res.status(400).json({
          message: `Minimum order amount for this coupon is ₹${coupon.minOrderAmount}.`,
        });
      }

      const discountAmount = subtotal
        ? Math.round((subtotal * coupon.discountPercent) / 100)
        : null;

      res.json({
        valid: true,
        code: coupon.code,
        discountPercent: coupon.discountPercent,
        discountAmount,
        message: `${coupon.discountPercent}% discount applied!`,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
