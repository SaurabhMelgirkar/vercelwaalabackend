// utils/email.js

const nodemailer = require('nodemailer');
const fs = require('fs');
const path = require('path');
const { generateTicket } = require('../utils/pdfGenerator'); // Adjust path if needed

// Configure the transporter
const transporter = nodemailer.createTransport({
  service: 'gmail', // Or your SMTP provider
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

/**
 * Sends a ticket email with PDF attachment.
 * @param {Object} ticketData - Ticket details (name, email, phone, session, amount, razorpayPaymentId, ticketId, etc.)
 * @returns {Promise<void>}
 */
const sendTicketEmail = async (ticketData) => {
  let pdfPath;
  try {
    // Generate the PDF ticket and get its file path
    pdfPath = await generateTicket(ticketData);

    const mailOptions = {
      from: `"TEDx DYP Akurdi" <${process.env.EMAIL_USER}>`,
      to: ticketData.email || ticketData.to, // Accepts 'email' or 'to'
      subject: 'Your TEDx Ticket & Welcome!',
      html: `
        <h2>Welcome to TEDx DYP Akurdi!</h2>
        <p>Dear <strong>${ticketData.name}</strong>,</p>
        <p>Thank you for registering for our event. Your ticket is attached as a PDF.</p>
        <ul>
          <li><strong>Ticket ID:</strong> ${ticketData.ticketId || ''}</li>
          <li><strong>Session:</strong> ${ticketData.session}</li>
          <li><strong>Amount Paid:</strong> ₹${ticketData.amount}</li>
          <li><strong>Payment ID:</strong> ${ticketData.razorpayPaymentId || ''}</li>
        </ul>
        <p>We look forward to welcoming you!</p>
        <p>Best regards,<br/>TEDx DYP Akurdi Team</p>
      `,
      attachments: [
        {
          filename: path.basename(pdfPath),
          path: pdfPath,
          contentType: 'application/pdf'
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    console.log(`Ticket email sent to ${mailOptions.to}`);

  } catch (err) {
    console.error('Error sending ticket email:', err);
    throw err;
  } finally {
    // Delete the PDF after sending (cleanup)
    if (pdfPath && fs.existsSync(pdfPath)) {
      fs.unlink(pdfPath, (err) => {
        if (err) {
          console.error(`Failed to delete PDF: ${pdfPath}`, err);
        } else {
          console.log(`Deleted PDF: ${pdfPath}`);
        }
      });
    }
  }
};

module.exports = { sendTicketEmail };
