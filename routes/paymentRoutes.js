const express = require('express');
const router = express.Router();
const { createOrder } = require('../utils/razorpayUtils');
const Ticket = require('../models/Ticket');
const Counter = require('../models/Counter');
const crypto = require('crypto');
// const { generateTicket } = require('../utils/generateTicket'); // Your PDF generator
const { generateTicket } = require('../utils/pdfGenerator');

const { sendTicketEmail } = require('../utils/email'); // Email sender utility

// Function to get the next sequence number for ticket ID
const getNextSequenceValue = async (sequenceName) => {
  const counter = await Counter.findOneAndUpdate(
    { _id: sequenceName },
    { $inc: { sequence_value: 1 } },
    { new: true, upsert: true }
  );
  return counter.sequence_value;
};

// ==============================
// Route: Create Razorpay Order
// ==============================
router.post('/create-order', async (req, res) => {
  const { amount } = req.body;

  if (!amount) {
    return res.status(400).json({ error: 'Amount is required' });
  }

  try {
    const order = await createOrder(amount);
    res.json(order);
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Failed to create order' });
  }
});

// ==============================
// Route: Verify Payment & Store Ticket + Send Email
// ==============================
router.post('/verify-payment', async (req, res) => {
  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    name,
    email,
    phone,
    organization,
    session,
    amount
  } = req.body;

  // Validate required fields
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !name || !email || !phone || !session || !amount) {
    return res.status(400).json({ success: false, message: 'Missing required fields' });
  }

  try {
    // Verify Razorpay Signature
    const generatedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ success: false, message: 'Invalid payment signature' });
    }

    // Generate Unique, Sequential Ticket ID
    const ticketNumber = await getNextSequenceValue('ticketId');
    const ticketId = `TEDX-${String(ticketNumber).padStart(5, '0')}`; 
    // Example: TEDX-00001, TEDX-00002

    // Store Ticket Details in DB
    const ticket = await Ticket.create({
      ticketId,
      razorpayOrderId: razorpay_order_id,
      razorpayPaymentId: razorpay_payment_id,
      razorpaySignature: razorpay_signature,
      name,
      email,
      phone,
      organization,
      session,
      amount
    });

    // Generate PDF ticket file path
    const pdfPath = await generateTicket({
      name,
      email,
      phone,
      session,
      amount,
      razorpayPaymentId: razorpay_payment_id,
      ticketId
    });

    // Send ticket email with PDF attachment
    await sendTicketEmail({
      to: email,
      name,
      ticketId,
      session,
      amount,
      pdfPath
    });

    // Respond with success and Ticket ID
    res.json({
      success: true,
      message: 'Payment verified, ticket stored, and email sent successfully',
      ticketId: ticket.ticketId
    });

  } catch (err) {
    console.error('Error during payment verification, ticket storage, or email sending:', err);
    res.status(500).json({ success: false, message: 'Failed to verify payment, store ticket, or send email' });
  }
});

module.exports = router;
