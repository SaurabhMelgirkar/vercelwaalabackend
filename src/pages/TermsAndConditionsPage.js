// src/pages/TermsAndConditionsPage.js

import React from 'react';
import PageTemplate from '../components/PageTemplate';

const TermsAndConditionsPage = () => {
  return (
    <PageTemplate 
      title="Terms & Conditions"
      subtitle="Terms governing your participation in TEDx DYP Akurdi"
    >
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
        <p className="mb-4">By purchasing a ticket, you agree to abide by the rules and regulations of TEDx DYP Akurdi.</p>
        <p className="mb-4">Tickets are non-transferable and may not be resold. Attendees must present a valid ID matching the ticket name at the event.</p>
        <p className="mb-4">The organizers reserve the right to refuse entry or remove any attendee for inappropriate behavior or violations of event policies.</p>
        <p>All sales are final except as outlined in our Cancellation & Refund Policy.</p>
      </div>
    </PageTemplate>
  );
};

export default TermsAndConditionsPage;
