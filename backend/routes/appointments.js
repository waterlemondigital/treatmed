const express = require('express');
const { body } = require('express-validator');
const validate = require('../middleware/validate');
const Appointment = require('../models/Appointment');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// @route   POST /api/appointments
// @desc    Book a new appointment (guest or authenticated)
// @access  Public (optionalAuth)
router.post(
  '/',
  optionalAuth,
  [
    body('serviceTitle').notEmpty().withMessage('Service title is required'),
    body('date').notEmpty().withMessage('Appointment date is required'),
    body('time').notEmpty().withMessage('Time slot is required'),
    body('patientName').trim().notEmpty().withMessage('Patient name is required'),
    body('phone').trim().notEmpty().withMessage('Phone number is required'),
  ],
  validate,
  async (req, res, next) => {
    try {
      const { serviceTitle, date, time, patientName, phone, notes } = req.body;

      const appointment = await Appointment.create({
        userId: req.user ? req.user._id : undefined,
        serviceTitle,
        date,
        time,
        patientName,
        phone,
        notes: notes || '',
      });

      res.status(201).json(appointment);
    } catch (error) {
      next(error);
    }
  }
);

// @route   GET /api/appointments/my
// @desc    Get current user's appointments
// @access  Private
router.get('/my', protect, async (req, res, next) => {
  try {
    const appointments = await Appointment.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
