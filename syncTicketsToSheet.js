require('dotenv').config();
const mongoose = require('mongoose');
const Ticket = require('./models/Ticket');
// const appendRowToSheet = require('./googleSheetsService');
// ✅ Correct
const appendRowToSheet = require('./utils/googleSheetsService');


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ Connected to MongoDB');
  watchTickets();
}).catch(err => {
  console.error('❌ MongoDB Connection Error:', err);
});

function watchTickets() {
  const changeStream = Ticket.watch();

  changeStream.on('change', async (change) => {
    if (change.operationType === 'insert') {
      const ticket = change.fullDocument;
      const rowData = [
        ticket.name,
        ticket.email,
        ticket.phone,
        ticket.session,
        ticket.amount,
        ticket.razorpayOrderId,
        ticket.razorpayPaymentId,
        ticket.ticketId,
        new Date(ticket.createdAt).toLocaleString()
      ];

      try {
        await appendRowToSheet(rowData);
        console.log('✅ Ticket data added to Google Sheet');
      } catch (err) {
        console.error('❌ Error appending to Google Sheet:', err.message);
      }
    }
  });
}
