const mongoose = require('mongoose');

const treatmentSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Treatment title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    symptomsAddressed: [{ type: String }],
    unaniApproach: {
      type: String,
      required: true,
    },
    recommendedDuration: {
      type: String,
      required: true,
    },
    iconName: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: [true, 'Treatment image URL is required'],
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

module.exports = mongoose.model('Treatment', treatmentSchema);
