import React from 'react';

const ModeSelector = ({ mode, setMode }) => (
  <div className="mb-6">
    <h3 className="text-white text-lg font-medium mb-3 text-center">Generation Mode</h3>
    <div className="flex bg-gray-800 rounded-lg p-1">
      <button
        onClick={() => setMode('fictional')}
        className={`flex-1 px-6 py-3 rounded-md text-sm font-medium transition-all ${
          mode === 'fictional'
            ? 'bg-white text-black shadow-lg'
            : 'text-gray-300 hover:text-white hover:bg-gray-700'
        }`}
      >
        <div className="flex flex-col items-center">
          <span className="text-lg mb-1">🏰</span>
          <span>Fictional Mode</span>
          <span className="text-xs opacity-70">Fantasy & Creative</span>
        </div>
      </button>
      <button
        onClick={() => setMode('baby')}
        className={`flex-1 px-6 py-3 rounded-md text-sm font-medium transition-all ${
          mode === 'baby'
            ? 'bg-white text-black shadow-lg'
            : 'text-gray-300 hover:text-white hover:bg-gray-700'
        }`}
      >
        <div className="flex flex-col items-center">
          <span className="text-lg mb-1">👶</span>
          <span>Baby Mode</span>
          <span className="text-xs opacity-70">Popular & Traditional</span>
        </div>
      </button>
      <button
        onClick={() => setMode('math')}
        className={`flex-1 px-6 py-3 rounded-md text-sm font-medium transition-all ${
          mode === 'math'
            ? 'bg-white text-black shadow-lg'
            : 'text-gray-300 hover:text-white hover:bg-gray-700'
        }`}
      >
        <div className="flex flex-col items-center">
          <span className="text-lg mb-1">∫</span>
          <span>Math Mode</span>
          <span className="text-xs opacity-70">Calculus-Based</span>
        </div>
      </button>
    </div>
  </div>
);

export default ModeSelector;