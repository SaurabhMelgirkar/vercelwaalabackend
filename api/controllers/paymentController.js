const { createOrder } = require('./utils/razorpay');
const Ticket = require('./models/Ticket');

exports.createPaymentOrder = async (req, res) => {
  try {
    const { name, email, phone, session, amount } = req.body;
    if (!name || !email || !phone || !session || !amount) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const order = await createOrder(amount);
    res.json({ orderId: order.id, amount: order.amount });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.verifyPayment = async (req, res) => {
  try {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature, name, email, phone, session, amount } = req.body;
    const { verifyPayment } = require('./utils/razorpay');
    const isValid = verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature);

    if (!isValid) {
      return res.status(400).json({ error: "Invalid payment signature" });
    }

    const ticket = new Ticket({
      name,
      email,
      phone,
      session,
      amount,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
    });
    await ticket.save();

    // Generate PDF ticket and send email
    const { generateTicket } = require('./utils/pdfGenerator');
    const filePath = await generateTicket(ticket.toObject());
    const { sendEmail } = require('./utils/emailService');
    await sendEmail(email, "Your TEDx DYP Akurdi Ticket", "Please find your ticket attached.", filePath);

    res.json({ success: true, message: "Payment verified and ticket sent to email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
