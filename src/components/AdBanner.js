import React from 'react';

function AdBanner({ position, size }) {
  // Different ad sizes based on position
  const getAdSize = () => {
    switch (size) {
      case 'leaderboard':
        return { width: '728px', height: '90px' };
      case 'large-rectangle':
        return { width: '336px', height: '280px' };
      case 'medium-rectangle':
        return { width: '300px', height: '250px' };
      case 'wide-skyscraper':
        return { width: '160px', height: '600px' };
      case 'banner':
        return { width: '468px', height: '60px' };
      default:
        return { width: '300px', height: '250px' };
    }
  };

  // Get placeholder colors based on position for demo
  const getPlaceholderColor = () => {
    switch (position) {
      case 'top':
        return '#f8d7da';
      case 'right':
        return '#d1e7dd';
      case 'bottom':
        return '#cfe2ff';
      case 'between':
        return '#fff3cd';
      default:
        return '#e2e3e5';
    }
  };

  const adSize = getAdSize();
  const bgColor = getPlaceholderColor();

  return (
    <div className={`ad-container ad-${position}`}>
      <div 
        className="ad-placeholder" 
        style={{ 
          width: adSize.width, 
          height: adSize.height,
          backgroundColor: bgColor,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '8px',
          color: '#555',
          fontWeight: 'bold',
          border: '1px dashed #aaa'
        }}
      >
        <div className="ad-content">
          <span className="ad-label">ADVERTISEMENT</span>
          <div className="ad-size">{adSize.width} × {adSize.height}</div>
        </div>
      </div>
    </div>
  );
}

export default AdBanner;
