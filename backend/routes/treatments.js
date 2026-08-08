const express = require('express');
const Treatment = require('../models/Treatment');
const { protect, admin } = require('../middleware/auth');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();

// Cloudinary storage for treatment images
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'treatmed/treatments',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 600, crop: 'limit', quality: 'auto' }],
  },
});
const upload = multer({ storage });

// @route   GET /api/treatments
// @desc    Get all treatments
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const treatments = await Treatment.find().sort({ createdAt: 1 });
    res.json(treatments);
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/treatments/:id
// @desc    Get single treatment by ID
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const treatment = await Treatment.findById(req.params.id);
    if (!treatment) {
      return res.status(404).json({ message: 'Treatment not found.' });
    }
    res.json(treatment);
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/treatments
// @desc    Create a new treatment
// @access  Admin
router.post('/', protect, admin, upload.single('image'), async (req, res, next) => {
  try {
    const treatmentData = { ...req.body };

    if (typeof treatmentData.symptomsAddressed === 'string') {
      treatmentData.symptomsAddressed = JSON.parse(treatmentData.symptomsAddressed);
    }

    if (req.file) {
      treatmentData.image = req.file.path;
      treatmentData.imagePublicId = req.file.filename;
    }

    const treatment = await Treatment.create(treatmentData);
    res.status(201).json(treatment);
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/treatments/:id
// @desc    Update a treatment
// @access  Admin
router.put('/:id', protect, admin, upload.single('image'), async (req, res, next) => {
  try {
    const treatment = await Treatment.findById(req.params.id);
    if (!treatment) {
      return res.status(404).json({ message: 'Treatment not found.' });
    }

    const updateData = { ...req.body };

    if (typeof updateData.symptomsAddressed === 'string') {
      updateData.symptomsAddressed = JSON.parse(updateData.symptomsAddressed);
    }

    if (req.file) {
      if (treatment.imagePublicId) {
        await cloudinary.uploader.destroy(treatment.imagePublicId);
      }
      updateData.image = req.file.path;
      updateData.imagePublicId = req.file.filename;
    }

    const updatedTreatment = await Treatment.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updatedTreatment);
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/treatments/:id
// @desc    Delete a treatment
// @access  Admin
router.delete('/:id', protect, admin, async (req, res, next) => {
  try {
    const treatment = await Treatment.findById(req.params.id);
    if (!treatment) {
      return res.status(404).json({ message: 'Treatment not found.' });
    }

    if (treatment.imagePublicId) {
      await cloudinary.uploader.destroy(treatment.imagePublicId);
    }

    await treatment.deleteOne();
    res.json({ message: 'Treatment removed successfully.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
