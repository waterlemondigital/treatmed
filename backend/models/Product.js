const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Product name is required'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Hair Care', 'Pain Relief', 'Tablets'],
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: 0,
    },
    originalPrice: {
      type: Number,
      min: 0,
    },
    rating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    reviewsCount: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      required: [true, 'Product image URL is required'],
    },
    imagePublicId: {
      type: String,
      default: '',
    },
    shortDesc: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ingredients: [{ type: String }],
    benefits: [{ type: String }],
    usage: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: '',
    },
    inStock: {
      type: Boolean,
      default: true,
    },
    isBestSeller: {
      type: Boolean,
      default: false,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    suppressReservedKeysWarning: true,
  }
);

// Text index for search
productSchema.index({ name: 'text', shortDesc: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
