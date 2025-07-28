import React from 'react';
import { Link } from 'react-router-dom';
import { SPEAKERS } from '../utils/constants';
import SpeakerCard from '../components/SpeakerCard';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-black text-white min-h-screen flex items-center relative overflow-hidden">
        <div className="container mx-auto px-4 z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <span className="text-6xl md:text-8xl font-bold text-tedx-red">X</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Between Light and Shadow
              <br />
              <span className="text-tedx-red">Lies the Spectrum of Ideas</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Join us at TEDx DYP Akurdi for an extraordinary journey of discovery, 
              innovation, and inspiration that will challenge your perspective.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/buy-tickets" className="btn-primary text-lg px-8 py-4">
                Get Your Tickets
              </Link>
              <Link to="/speakers" className="btn-secondary text-lg px-8 py-4">
                Meet Our Speakers
              </Link>
            </div>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-tedx-red rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
      </section>

      {/* Featured Speakers Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Featured Speakers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the minds that will illuminate new perspectives and challenge conventional thinking
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {SPEAKERS.map((speaker) => (
              <SpeakerCard key={speaker.id} speaker={speaker} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/speakers" className="btn-primary">
              View All Speakers
            </Link>
          </div>
        </div>
      </section>

      {/* About Event Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-8">
              Why TEDx DYP Akurdi?
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-tedx-red text-4xl mb-4">💡</div>
                <h3 className="text-xl font-bold mb-4">Innovation</h3>
                <p className="text-gray-600">
                  Explore groundbreaking ideas that are shaping our future
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-tedx-red text-4xl mb-4">🌟</div>
                <h3 className="text-xl font-bold mb-4">Inspiration</h3>
                <p className="text-gray-600">
                  Get inspired by stories of transformation and success
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="text-tedx-red text-4xl mb-4">🤝</div>
                <h3 className="text-xl font-bold mb-4">Connection</h3>
                <p className="text-gray-600">
                  Network with like-minded individuals and thought leaders
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-tedx-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Experience Ideas Worth Spreading?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Don't miss this opportunity to be part of something extraordinary. 
            Secure your spot today!
          </p>
          <Link to="/buy-tickets" className="bg-white text-tedx-red px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 transition-colors duration-300">
            Buy Tickets Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
