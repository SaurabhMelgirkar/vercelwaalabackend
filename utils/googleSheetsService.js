const { google } = require('googleapis');
const { GoogleAuth } = require('google-auth-library');
const path = require('path');
require('dotenv').config();

const CREDENTIALS_PATH = path.resolve(process.env.GOOGLE_CREDENTIALS);
const SHEET_ID = process.env.SHEET_ID;

const auth = new GoogleAuth({
  keyFile: CREDENTIALS_PATH,
  scopes: ['https://www.googleapis.com/auth/spreadsheets']
});

const headers = [
  'Name',
  'Email',
  'Phone',
  'Session',
  'Amount',
  'Razorpay Order ID',
  'Payment ID',
  'Ticket ID',
  'Created At'
];

async function appendRowToSheet(rowData) {
  const authClient = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: authClient });

  // Step 1: Check if sheet is empty
  const readResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: SHEET_ID,
    range: 'Sheet1!A1:A1',
  });

  const sheetIsEmpty = !readResponse.data.values;

  // Step 2: If empty, add headers
  if (sheetIsEmpty) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: 'Sheet1!A1',
      valueInputOption: 'RAW',
      resource: {
        values: [headers],
      },
    });
    console.log('✅ Header row added to Google Sheet');
  }

  // Step 3: Append new ticket data
  await sheets.spreadsheets.values.append({
    spreadsheetId: SHEET_ID,
    range: 'Sheet1!A1',
    valueInputOption: 'USER_ENTERED',
    insertDataOption: 'INSERT_ROWS',
    resource: {
      values: [rowData],
    },
  });
}

module.exports = appendRowToSheet;
