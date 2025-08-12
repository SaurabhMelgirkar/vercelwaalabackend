// utils/pdfGenerator.js

const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

/**
 * Generates a TEDx ticket PDF and returns the file path.
 * @param {Object} ticketData - Ticket details (name, email, phone, session, amount, razorpayPaymentId, ticketId)
 * @returns {Promise<string>} - Resolves to the PDF file path
 */
const generateTicket = (ticketData) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument();
      const fileName = `ticket_${Date.now()}.pdf`;
      const filePath = path.join(__dirname, '../tickets', fileName);

      // Ensure tickets directory exists
      if (!fs.existsSync(path.dirname(filePath))) {
        fs.mkdirSync(path.dirname(filePath), { recursive: true });
      }

      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);

      // Ticket Header
      doc
        .fontSize(20)
        .text('TEDx DYP Akurdi', { align: 'center' })
        .moveDown(0.5);

      doc
        .fontSize(16)
        .text('OFFICIAL TICKET', { align: 'center', underline: true })
        .moveDown(1);

      // Ticket Details
      doc
        .fontSize(14)
        .text(`Name: ${ticketData.name}`)
        .text(`Email: ${ticketData.email}`)
        .text(`Phone: ${ticketData.phone}`)
        .text(`Session: ${ticketData.session}`)
        .text(`Amount Paid: ₹${ticketData.amount}`)
        .text(`Payment ID: ${ticketData.razorpayPaymentId || 'N/A'}`)
        .text(`Ticket ID: ${ticketData.ticketId || 'N/A'}`)
        .moveDown(2);

      // Footer
      doc
        .fontSize(12)
        .text('This ticket admits one person.', { align: 'center' });

      doc.end();

      stream.on('finish', () => resolve(filePath));
      stream.on('error', reject);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { generateTicket };
