import React, { useState } from 'react';

const NavBar = ({ currentPage, setCurrentPage }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'privacy', label: 'Privacy Policy' }
  ];

  const handleNavClick = (pageId) => {
    setCurrentPage(pageId);
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-gray-900 border-b border-gray-800 px-6 py-4">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <h1 
            className="text-white text-2xl font-bold cursor-pointer hover:text-blue-400 transition-colors focus:outline-none focus:underline focus:underline-offset-4 focus:decoration-blue-400"
            onClick={() => handleNavClick('home')}
          >
            NOT-SO-NORMAL NAME GENERATOR
          </h1>
          <span className="ml-2 text-xs bg-blue-600 text-white px-2 py-1 rounded-full">PRO</span>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`transition-colors focus:outline-none focus:underline focus:underline-offset-4 focus:decoration-blue-400 ${
                currentPage === item.id
                  ? 'text-white font-medium'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        
        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            className="text-white focus:outline-none focus:bg-gray-700 focus:rounded"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>
      
      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 pb-4 border-t border-gray-800">
          <div className="flex flex-col space-y-2 mt-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left px-2 py-2 rounded-lg transition-colors focus:outline-none focus:bg-gray-700 focus:rounded ${
                  currentPage === item.id
                    ? 'text-white bg-gray-800 font-medium'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;