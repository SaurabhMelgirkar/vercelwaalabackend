import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAVIGATION } from '../utils/constants';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="bg-black text-white sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="text-2xl font-bold">
              <span className="text-tedx-red">TEDx</span>
              <span className="text-white">DYP Akurdi</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {NAVIGATION.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`hover:text-tedx-red transition-colors duration-300 ${
                  location.pathname === item.path ? 'text-tedx-red' : ''
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to="/buy-tickets" className="btn-primary">
              Buy Tickets
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <div className="w-6 h-6 flex flex-col justify-center items-center">
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? 'rotate-45 translate-y-1' : '-translate-y-0.5'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm my-0.5 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
              <span className={`bg-white block transition-all duration-300 ease-out h-0.5 w-6 rounded-sm ${isMenuOpen ? '-rotate-45 -translate-y-1' : 'translate-y-0.5'}`}></span>
            </div>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              {NAVIGATION.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`hover:text-tedx-red transition-colors duration-300 ${
                    location.pathname === item.path ? 'text-tedx-red' : ''
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <Link 
                to="/buy-tickets" 
                className="btn-primary w-fit"
                onClick={() => setIsMenuOpen(false)}
              >
                Buy Tickets
              </Link>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
