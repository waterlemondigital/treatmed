const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const Order = require('../models/Order');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/orders
// @desc    Place a new order
// @access  Private
router.post(
  '/',
  protect,
  [
    body('items').isArray({ min: 1 }).withMessage('Order must have at least one item'),
    body('items.*.productName').notEmpty().withMessage('Product name is required'),
    body('items.*.quantity').isInt({ min: 1 }).withMessage('Quantity must be at least 1'),
    body('items.*.price').isFloat({ min: 0 }).withMessage('Price must be valid'),
    body('shippingAddress.name').notEmpty().withMessage('Shipping name is required'),
    body('shippingAddress.phone').notEmpty().withMessage('Shipping phone is required'),
    body('shippingAddress.street').notEmpty().withMessage('Shipping address is required'),
    body('shippingAddress.pincode').notEmpty().withMessage('Pincode is required'),
    body('paymentMethod').isIn(['cod', 'upi', 'pickup']).withMessage('Invalid payment method'),
  ],
  validate,
  async (req, res, next) => {
    try {
      const {
        items,
        shippingAddress,
        paymentMethod,
        couponCode,
        discountAmount,
        deliveryFee,
      } = req.body;

      // Calculate total
      const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
      const fee = deliveryFee || (subtotal > 999 ? 0 : 70);
      const discount = discountAmount || 0;
      const totalAmount = Math.max(0, subtotal + fee - discount);

      const order = await Order.create({
        userId: req.user._id,
        items,
        totalAmount,
        shippingAddress,
        paymentMethod,
        couponCode: couponCode || '',
        discountAmount: discount,
        deliveryFee: fee,
      });

      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }
);

// @route   GET /api/orders/my
// @desc    Get current user's orders
// @access  Private
router.get('/my', protect, async (req, res, next) => {
  try {
    const orders = await Order.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/orders/:id
// @desc    Get single order by ID
// @access  Private (owner only)
router.get('/:id', protect, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found.' });
    }

    // Ensure the user owns this order (or is admin)
    if (order.userId.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to view this order.' });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
