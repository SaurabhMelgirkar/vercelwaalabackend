// src/pages/CancellationRefundPage.js

import React from 'react';
import PageTemplate from '../components/PageTemplate';

const CancellationRefundPage = () => {
  return (
    <PageTemplate 
      title="Cancellation & Refund Policy"
      subtitle="Our policy regarding ticket cancellations and refunds"
    >
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Cancellation Policy</h2>
        <p className="mb-6">You may cancel your ticket up to 7 days before the event for a full refund. Cancellations made less than 7 days before the event are non-refundable.</p>
        <h2 className="text-2xl font-bold mb-4">Refund Policy</h2>
        <p>Refunds will be processed within 10 business days after cancellation and will be credited back to your original payment method.</p>
      </div>
    </PageTemplate>
  );
};

export default CancellationRefundPage;
