const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Service title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Consultation', 'Therapy', 'Wellness', 'Diagnostics'],
    },
    shortDesc: {
      type: String,
      required: true,
    },
    fullDesc: {
      type: String,
      required: true,
    },
    iconName: {
      type: String,
      required: true,
    },
    duration: {
      type: String,
      required: true,
    },
    priceEstimate: {
      type: String,
      default: '',
    },
    whatToExpect: [{ type: String }],
    benefits: [{ type: String }],
    image: {
      type: String,
      required: [true, 'Service image URL is required'],
    },
    imagePublicId: {
      type: String,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Service', serviceSchema);
