const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const path = require('path');

// Load environment variables from local .env or root fallback
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const mongoose = require('mongoose');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const serviceRoutes = require('./routes/services');
const treatmentRoutes = require('./routes/treatments');
const reviewRoutes = require('./routes/reviews');
const orderRoutes = require('./routes/orders');
const appointmentRoutes = require('./routes/appointments');
const contactRoutes = require('./routes/contact');
const newsletterRoutes = require('./routes/newsletter');
const couponRoutes = require('./routes/coupons');

const app = express();

// ─── Database Middleware (Ensures MongoDB connection on Serverless & Container) ─
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
  }
  next();
});

// ─── Security & Middleware ───────────────────────────────────
app.use(helmet());

// Dynamic CORS configuration supporting frontend, admin panel, and local dev
const allowedOrigins = [
  process.env.FRONTEND_URL,
  process.env.ADMIN_URL,
  'http://localhost:3000',
  'http://localhost:3002',
  'http://127.0.0.1:3000',
  'http://127.0.0.1:3002',
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps, curl, server-to-server)
    if (!origin) return callback(null, true);
    if (
      allowedOrigins.includes(origin) ||
      allowedOrigins.includes('*') ||
      process.env.NODE_ENV !== 'production' ||
      origin.endsWith('.vercel.app') ||
      origin.endsWith('.onrender.com')
    ) {
      return callback(null, true);
    }
    return callback(new Error(`CORS origin not allowed: ${origin}`));
  },
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { message: 'Too many requests, please try again later.' },
});
app.use('/api/', limiter);

// ─── API Routes ──────────────────────────────────────────────
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/treatments', treatmentRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/coupons', couponRoutes);

// ─── Health Check & Route Directory ─────────────────────────
const healthCheckHandler = (req, res) => {
  const dbStateMap = {
    0: 'disconnected',
    1: 'connected',
    2: 'connecting',
    3: 'disconnecting',
  };

  const isDbConnected = mongoose.connection.readyState === 1;

  res.status(isDbConnected ? 200 : 503).json({
    status: isDbConnected ? 'healthy' : 'degraded',
    service: 'TreatMed Unani & Ayurvedic API',
    environment: process.env.NODE_ENV || 'development',
    uptime: `${Math.floor(process.uptime())}s`,
    timestamp: new Date().toISOString(),
    database: {
      status: dbStateMap[mongoose.connection.readyState] || 'unknown',
      name: mongoose.connection.name || 'treatmed',
      host: mongoose.connection.host || 'cluster',
    },
    modules: {
      auth: {
        base: '/api/auth',
        routes: [
          { method: 'POST', path: '/register', access: 'Public', desc: 'Register customer account' },
          { method: 'POST', path: '/login', access: 'Public', desc: 'Authenticate user / admin' },
          { method: 'GET', path: '/me', access: 'Protected', desc: 'Get current user profile' },
          { method: 'PUT', path: '/profile', access: 'Protected', desc: 'Update profile details' },
        ],
      },
      products: {
        base: '/api/products',
        routes: [
          { method: 'GET', path: '/', access: 'Public', desc: 'Fetch product catalog with filters' },
          { method: 'GET', path: '/:id', access: 'Public', desc: 'Get single product details' },
          { method: 'POST', path: '/', access: 'Admin', desc: 'Create product (with image upload)' },
          { method: 'PUT', path: '/:id', access: 'Admin', desc: 'Update product' },
          { method: 'DELETE', path: '/:id', access: 'Admin', desc: 'Delete product' },
        ],
      },
      services: {
        base: '/api/services',
        routes: [
          { method: 'GET', path: '/', access: 'Public', desc: 'List clinic therapies and consultations' },
          { method: 'GET', path: '/:id', access: 'Public', desc: 'Get single service details' },
          { method: 'POST', path: '/', access: 'Admin', desc: 'Create clinic service' },
          { method: 'PUT', path: '/:id', access: 'Admin', desc: 'Update clinic service' },
          { method: 'DELETE', path: '/:id', access: 'Admin', desc: 'Delete clinic service' },
        ],
      },
      treatments: {
        base: '/api/treatments',
        routes: [
          { method: 'GET', path: '/', access: 'Public', desc: 'List specialized treatment programs' },
          { method: 'GET', path: '/:id', access: 'Public', desc: 'Get treatment details' },
          { method: 'POST', path: '/', access: 'Admin', desc: 'Create treatment program' },
          { method: 'PUT', path: '/:id', access: 'Admin', desc: 'Update treatment program' },
          { method: 'DELETE', path: '/:id', access: 'Admin', desc: 'Delete treatment program' },
        ],
      },
      orders: {
        base: '/api/orders',
        routes: [
          { method: 'POST', path: '/', access: 'Protected', desc: 'Place store order' },
          { method: 'GET', path: '/my', access: 'Protected', desc: 'Get logged-in customer orders' },
          { method: 'GET', path: '/:id', access: 'Protected/Admin', desc: 'Get single order details' },
          { method: 'GET', path: '/', access: 'Admin', desc: 'List all store orders' },
          { method: 'PUT', path: '/:id/status', access: 'Admin', desc: 'Update order fulfillment status' },
        ],
      },
      appointments: {
        base: '/api/appointments',
        routes: [
          { method: 'POST', path: '/', access: 'Public/User', desc: 'Book doctor / therapy appointment' },
          { method: 'GET', path: '/my', access: 'Protected', desc: 'Get patient appointment history' },
          { method: 'GET', path: '/', access: 'Admin', desc: 'List all patient bookings' },
          { method: 'PUT', path: '/:id/status', access: 'Admin', desc: 'Confirm / Complete / Cancel appointment' },
        ],
      },
      reviews: {
        base: '/api/reviews',
        routes: [
          { method: 'GET', path: '/', access: 'Public', desc: 'Get verified patient & customer reviews' },
          { method: 'POST', path: '/', access: 'Protected', desc: 'Submit customer review' },
        ],
      },
      contact: {
        base: '/api/contact',
        routes: [
          { method: 'POST', path: '/', access: 'Public', desc: 'Submit patient inquiry message' },
          { method: 'GET', path: '/', access: 'Admin', desc: 'List all contact inquiries' },
        ],
      },
      newsletter: {
        base: '/api/newsletter',
        routes: [
          { method: 'POST', path: '/subscribe', access: 'Public', desc: 'Subscribe email to newsletter' },
          { method: 'GET', path: '/', access: 'Admin', desc: 'List newsletter subscribers' },
        ],
      },
      coupons: {
        base: '/api/coupons',
        routes: [
          { method: 'POST', path: '/validate', access: 'Public', desc: 'Validate coupon code at checkout' },
        ],
      },
    },
  });
};

app.get('/health', healthCheckHandler);
app.get('/api/health', healthCheckHandler);

// ─── 404 Handler ─────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found.` });
});

// ─── Global Error Handler ────────────────────────────────────
app.use(errorHandler);

// ─── Start Server (Local / Container) ─────────────────────────
const PORT = process.env.PORT || 5000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`\n🌿 TreatMed Backend API running on port ${PORT}`);
    console.log(`   Health: http://localhost:${PORT}/api/health`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}\n`);
  });
}

module.exports = app;
