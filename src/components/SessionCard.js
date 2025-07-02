import React from 'react';

const SessionCard = ({ session, onSelect, isSelected }) => {
  return (
    <div 
      className={`bg-white rounded-lg shadow-lg p-6 cursor-pointer transition-all duration-300 ${
        isSelected ? 'ring-2 ring-tedx-red bg-red-50' : 'hover:shadow-xl'
      }`}
      onClick={() => onSelect(session)}
    >
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-bold text-gray-900">{session.name}</h3>
        <div className="text-right">
          <span className="text-2xl font-bold text-tedx-red">₹{session.price}</span>
        </div>
      </div>
      <p className="text-gray-600 mb-2">{session.time}</p>
      <p className="text-gray-700">{session.description}</p>
      {isSelected && (
        <div className="mt-4 flex items-center text-tedx-red">
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          Selected
        </div>
      )}
    </div>
  );
};

export default SessionCard;
