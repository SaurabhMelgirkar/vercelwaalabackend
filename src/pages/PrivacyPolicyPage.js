// src/pages/PrivacyPolicyPage.js

import React from 'react';
import PageTemplate from '../components/PageTemplate';

const PrivacyPolicyPage = () => {
  return (
    <PageTemplate 
      title="Privacy Policy"
      subtitle="How we handle your personal information"
    >
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Privacy Policy</h2>
        <p className="mb-4">We are committed to protecting your privacy. Any personal information collected during ticket purchase will be used solely for event-related communication and will not be shared with third parties without your consent.</p>
        <p className="mb-4">We use secure payment gateways to process your transactions and do not store credit card information.</p>
        <p>If you have any questions about our privacy practices, please contact us.</p>
      </div>
    </PageTemplate>
  );
};

export default PrivacyPolicyPage;
