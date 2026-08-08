const express = require('express');
const Product = require('../models/Product');
const { protect, admin } = require('../middleware/auth');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

const router = express.Router();

// Cloudinary storage for product images
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'treatmed/products',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 800, height: 800, crop: 'limit', quality: 'auto' }],
  },
});
const upload = multer({ storage });

// @route   GET /api/products
// @desc    Get all products (with optional filters)
// @access  Public
router.get('/', async (req, res, next) => {
  try {
    const { category, search, bestSeller, inStock, sort } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (bestSeller === 'true') filter.isBestSeller = true;
    if (inStock === 'true') filter.inStock = true;
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { shortDesc: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ];
    }

    let query = Product.find(filter);

    // Sorting
    if (sort === 'price_asc') query = query.sort({ price: 1 });
    else if (sort === 'price_desc') query = query.sort({ price: -1 });
    else if (sort === 'rating') query = query.sort({ rating: -1 });
    else if (sort === 'newest') query = query.sort({ createdAt: -1 });
    else query = query.sort({ isBestSeller: -1, createdAt: -1 });

    const products = await query;
    res.json(products);
  } catch (error) {
    next(error);
  }
});

// @route   GET /api/products/:id
// @desc    Get single product by ID
// @access  Public
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }
    res.json(product);
  } catch (error) {
    next(error);
  }
});

// @route   POST /api/products
// @desc    Create a new product
// @access  Admin
router.post('/', protect, admin, upload.single('image'), async (req, res, next) => {
  try {
    const productData = { ...req.body };

    // Parse JSON array fields if they come as strings
    if (typeof productData.ingredients === 'string') {
      productData.ingredients = JSON.parse(productData.ingredients);
    }
    if (typeof productData.benefits === 'string') {
      productData.benefits = JSON.parse(productData.benefits);
    }

    if (req.file) {
      productData.image = req.file.path;
      productData.imagePublicId = req.file.filename;
    }

    const product = await Product.create(productData);
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
});

// @route   PUT /api/products/:id
// @desc    Update a product
// @access  Admin
router.put('/:id', protect, admin, upload.single('image'), async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    const updateData = { ...req.body };
    delete updateData._id;
    delete updateData.id;
    delete updateData.createdAt;
    delete updateData.updatedAt;
    delete updateData.__v;

    if (typeof updateData.ingredients === 'string') {
      updateData.ingredients = JSON.parse(updateData.ingredients);
    }
    if (typeof updateData.benefits === 'string') {
      updateData.benefits = JSON.parse(updateData.benefits);
    }

    // If new image uploaded, delete old one from Cloudinary
    if (req.file) {
      if (product.imagePublicId) {
        await cloudinary.uploader.destroy(product.imagePublicId);
      }
      updateData.image = req.file.path;
      updateData.imagePublicId = req.file.filename;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true, runValidators: true }
    );

    res.json(updatedProduct);
  } catch (error) {
    next(error);
  }
});

// @route   DELETE /api/products/:id
// @desc    Delete a product
// @access  Admin
router.delete('/:id', protect, admin, async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found.' });
    }

    // Delete image from Cloudinary
    if (product.imagePublicId) {
      await cloudinary.uploader.destroy(product.imagePublicId);
    }

    await product.deleteOne();
    res.json({ message: 'Product removed successfully.' });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
