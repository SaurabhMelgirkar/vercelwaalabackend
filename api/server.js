const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();

const app = express();

// CORS
const allowedOrigins = [
  "https://tedx-dyp-akurdi.vercel.app",
  "https://tedx-dyp-akurdi-yqm8-7f2qq97g5-saurabhmelgirkars-projects.vercel.app"
];
app.use(cors({ origin: allowedOrigins, credentials: true }));

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/payment', require('./routes/paymentRoutes'));

// Health check (root route)
// inside api/server.js
app.get('/_status', (req, res) => {
  res.json({
    MONGO_URI_exists: !!process.env.MONGO_URI,
    RAZORPAY_KEY_ID_exists: !!process.env.RAZORPAY_KEY_ID,
    NODE_ENV: process.env.NODE_ENV || 'not-set'
  });
});


// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Export for Vercel
module.exports = app;
