// src/pages/ShippingDeliveryPage.js

import React from 'react';
import PageTemplate from '../components/PageTemplate';

const ShippingDeliveryPage = () => {
  return (
    <PageTemplate 
      title="Shipping & Delivery Policy"
      subtitle="Our policy regarding ticket delivery and shipping"
    >
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Shipping & Delivery Policy</h2>
        <p className="mb-4">All tickets are delivered electronically via email. You will receive a confirmation email with your ticket details immediately after purchase.</p>
        <p className="mb-4">If you do not receive your ticket, please check your spam folder or contact us for assistance.</p>
        <p>Physical tickets are not available for this event.</p>
      </div>
    </PageTemplate>
  );
};

export default ShippingDeliveryPage;
