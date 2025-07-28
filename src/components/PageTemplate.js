import React from 'react';

const PageTemplate = ({ title, subtitle, children, className = "" }) => {
  return (
    <div className={`min-h-screen bg-gray-50 ${className}`}>
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{title}</h1>
          {subtitle && (
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">{subtitle}</p>
          )}
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        {children}
      </div>
    </div>
  );
};

export default PageTemplate;
