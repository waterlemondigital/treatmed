const express = require('express');
const Service = require('../models/Service');
const { protect, admin } = require('../middleware/auth');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();

// Cloudinary storage for service images
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'treatmed/services',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 600, crop: 'limit', quality: 'auto' }],
  },
});
const upload = multer({ storage });

// @route   GET /api/services
// @desc    Get all services (with optional category filter)
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;

    const services = await Service.find(filter).sort({ createdAt: 1 });
    res.json(services);
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/services/:id
// @desc    Get single service by ID
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found.' });
    }
    res.json(service);
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/services
// @desc    Create a new service
// @access  Admin
router.post('/', protect, admin, upload.single('image'), async (req, res, next) => {
  try {
    const serviceData = { ...req.body };

    if (typeof serviceData.whatToExpect === 'string') {
      serviceData.whatToExpect = JSON.parse(serviceData.whatToExpect);
    }
    if (typeof serviceData.benefits === 'string') {
      serviceData.benefits = JSON.parse(serviceData.benefits);
    }

    if (req.file) {
      serviceData.image = req.file.path;
      serviceData.imagePublicId = req.file.filename;
    }

    const service = await Service.create(serviceData);
    res.status(201).json(service);
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/services/:id
// @desc    Update a service
// @access  Admin
router.put('/:id', protect, admin, upload.single('image'), async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found.' });
    }

    const updateData = { ...req.body };

    if (typeof updateData.whatToExpect === 'string') {
      updateData.whatToExpect = JSON.parse(updateData.whatToExpect);
    }
    if (typeof updateData.benefits === 'string') {
      updateData.benefits = JSON.parse(updateData.benefits);
    }

    if (req.file) {
      if (service.imagePublicId) {
        await cloudinary.uploader.destroy(service.imagePublicId);
      }
      updateData.image = req.file.path;
      updateData.imagePublicId = req.file.filename;
    }

    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updatedService);
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/services/:id
// @desc    Delete a service
// @access  Admin
router.delete('/:id', protect, admin, async (req, res, next) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found.' });
    }

    if (service.imagePublicId) {
      await cloudinary.uploader.destroy(service.imagePublicId);
    }

    await service.deleteOne();
    res.json({ message: 'Service removed successfully.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
