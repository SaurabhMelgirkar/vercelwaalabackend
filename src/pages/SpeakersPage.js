// src/pages/SpeakersPage.js

import React from 'react';
import PageTemplate from '../components/PageTemplate';
import SpeakerCard from '../components/SpeakerCard';
import { SPEAKERS } from '../utils/constants';

const SpeakersPage = () => {
  return (
    <PageTemplate 
      title="Speakers"
      subtitle="Meet the inspiring minds behind TEDx DYP Akurdi"
    >
      <div className="max-w-4xl mx-auto">
        <div className="grid md:grid-cols-2 gap-8">
          {SPEAKERS.map((speaker) => (
            <SpeakerCard key={speaker.id} speaker={speaker} />
          ))}
        </div>
      </div>
    </PageTemplate>
  );
};

export default SpeakersPage;
