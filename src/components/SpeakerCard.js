import React from 'react';

const SpeakerCard = ({ speaker }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <div className="aspect-w-3 aspect-h-4">
        <img 
          src={speaker.image} 
          alt={speaker.name}
          className="w-full h-64 object-cover"
        />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{speaker.name}</h3>
        <p className="text-tedx-red font-semibold mb-3">{speaker.title}</p>
        <p className="text-gray-600 leading-relaxed">{speaker.description}</p>
      </div>
    </div>
  );
};

export default SpeakerCard;
