const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
require('dotenv').config();

const app = express();

// CORS: Only allow your deployed frontend domains
const allowedOrigins = [
  "https://tedx-dyp-akurdi-yqm8-7f2qq97g5-saurabhmelgirkars-projects.vercel.app",
  "https://tedx-dyp-akurdi.vercel.app"
];

app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/payment', require('../routes/paymentRoutes'));

// Test route
app.get('/', (req, res) => {
  res.json({ message: 'Server is running!' });
});

// Catch-all for unknown endpoints
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// Export handler for Vercel
module.exports = (req, res) => {
  app(req, res);  // Let Express handle the request
};

