// Save this as: src/components/AdSense.jsx
import React, { useEffect } from 'react';

const AdSense = ({ 
  client = "ca-pub-XXXXXXXXXXXXXXXXX", // Replace with your AdSense client ID
  slot = "XXXXXXXXXX", // Replace with your ad unit slot ID
  style = { display: 'block' },
  format = "auto",
  responsive = "true",
  className = ""
}) => {
  useEffect(() => {
    try {
      if (window.adsbygoogle && window.adsbygoogle.loaded) {
        (window.adsbygoogle = window.adsbygoogle || []).push({});
      }
    } catch (error) {
      console.log('AdSense error:', error);
    }
  }, []);

  return (
    <div className={className}>
      <ins
        className="adsbygoogle"
        style={style}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive={responsive}
      />
    </div>
  );
};

export default AdSense;