// const express = require('express');
// const cors = require('cors');
// const connectDB = require('./config/db');
// require('dotenv').config();

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.use('/api/payment', require('./routes/paymentRoutes'));

// // Test route
// app.get('/', (req, res) => {
//   res.json({ message: 'Server is running!' });
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
const express = require('express');
const cors = require('cors');
const connectDB = require('../config/db');
require('dotenv').config();

const app = express();

// ✅ CORS: Only allow your deployed frontend domains
const allowedOrigins = [
  "https://tedx-dyp-akurdi-yqm8-7f2qq97g5-saurabhmelgirkars-projects.vercel.app",
  "https://tedx-dyp-akurdi.vercel.app",
  // "https://yourcustomdomain.com",
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

// (Optional) Catch-all for unknown endpoints
app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

// ⛔ REMOVE app.listen()
// ✅ Export the app for Vercel
module.exports = app;
