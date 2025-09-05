import React from 'react';

const GenderSelector = ({ gender, setGender }) => (
  <div className="mb-8">
    <h3 className="text-white text-lg font-medium mb-3 text-center">Gender Selection</h3>
    <div className="flex bg-gray-800 rounded-lg p-1">
      <button
        onClick={() => setGender('male')}
        className={`flex-1 px-4 py-3 rounded-md text-sm font-medium transition-all ${
          gender === 'male'
            ? 'bg-blue-600 text-white shadow-lg'
            : 'text-gray-300 hover:text-white hover:bg-gray-700'
        }`}
      >
        <div className="flex flex-col items-center">
          <span className="text-lg mb-1">♂️</span>
          <span>Male</span>
        </div>
      </button>
      <button
        onClick={() => setGender('female')}
        className={`flex-1 px-4 py-3 rounded-md text-sm font-medium transition-all ${
          gender === 'female'
            ? 'bg-pink-600 text-white shadow-lg'
            : 'text-gray-300 hover:text-white hover:bg-gray-700'
        }`}
      >
        <div className="flex flex-col items-center">
          <span className="text-lg mb-1">♀️</span>
          <span>Female</span>
        </div>
      </button>
      <button
        onClick={() => setGender('unisex')}
        className={`flex-1 px-4 py-3 rounded-md text-sm font-medium transition-all ${
          gender === 'unisex'
            ? 'bg-purple-600 text-white shadow-lg'
            : 'text-gray-300 hover:text-white hover:bg-gray-700'
        }`}
      >
        <div className="flex flex-col items-center">
          <span className="text-lg mb-1">⚧️</span>
          <span>Unisex</span>
        </div>
      </button>
    </div>
  </div>
);

export default GenderSelector;