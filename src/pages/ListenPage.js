// src/pages/ListenPage.js

import React from 'react';
import PageTemplate from '../components/PageTemplate';

const ListenPage = () => {
  return (
    <PageTemplate 
      title="Listen"
      subtitle="Experience the talks from TEDx DYP Akurdi"
    >
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-2xl font-bold mb-4">Coming Soon</h2>
        <p>Stay tuned for recordings of our inspiring talks!</p>
      </div>
    </PageTemplate>
  );
};

export default ListenPage;
