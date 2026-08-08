const cloudinary = require('cloudinary').v2;

// CLOUDINARY_URL env var is auto-parsed by the SDK
// Format: cloudinary://api_key:api_secret@cloud_name
cloudinary.config();

module.exports = cloudinary;
