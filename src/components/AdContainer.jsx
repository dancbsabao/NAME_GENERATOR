// Save this as: src/components/AdContainer.jsx
import React from 'react';
import AdSense from './AdSense';

const AdContainer = () => {
  // Show placeholder until you get approved for AdSense
  const showRealAds = false; // Set to true once you have AdSense approval
  
  if (showRealAds) {
    return (
      <div className="w-full bg-gray-800 border-b border-gray-700">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <AdSense
            client="ca-pub-XXXXXXXXXXXXXXXXX" // Replace with your AdSense client ID
            slot="XXXXXXXXXX" // Replace with your ad unit slot ID  
            style={{
              display: 'block',
              width: '100%',
              height: '90px'
            }}
            format="horizontal"
            className="rounded-lg overflow-hidden"
          />
        </div>
      </div>
    );
  }

  // Placeholder ad container for development/pre-approval
  return (
    <div className="w-full bg-gray-800 border-b border-gray-700">
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="bg-gray-700 rounded-lg p-8 text-center border border-gray-600">
          <div className="flex items-center justify-center space-x-2 mb-2">
            <div className="w-4 h-4 bg-red-500 rounded"></div>
            <div className="w-4 h-4 bg-yellow-500 rounded"></div>
            <div className="w-4 h-4 bg-green-500 rounded"></div>
          </div>
          <p className="text-gray-400 text-sm font-medium">Google Ads Space</p>
          <p className="text-gray-500 text-xs mt-1">728 x 90 Leaderboard Advertisement</p>
          <div className="mt-3 text-xs text-gray-600">
            Your targeted ads will appear here after AdSense approval
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdContainer;