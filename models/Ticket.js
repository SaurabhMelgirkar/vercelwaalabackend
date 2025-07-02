const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  session: {
    type: String,
    enum: ['Morning Session', 'Afternoon Session', 'Full Day Session'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  razorpayOrderId: {
    type: String,
    required: true
  },
  razorpayPaymentId: {
    type: String,
    required: true
  },
  razorpaySignature: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  ticketId: {
    type: String,
    required: true,
    unique: true,
    index: true  // Ensures faster lookups and uniqueness enforcement
  }
});

module.exports = mongoose.model('Ticket', TicketSchema);
