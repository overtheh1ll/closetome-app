// LayoutToggle.js
import React from 'react';

function LayoutToggle({ compactLayout, onToggleCompactLayout }) {
  return (
    <button 
      className={`layout-toggle ${compactLayout ? 'compact' : 'standard'}`}
      onClick={onToggleCompactLayout}
      aria-label={compactLayout ? 'Switch to standard layout' : 'Switch to compact layout'}
    >
      {compactLayout ? '↔️' : '↕️'}
    </button>
  );
}

export default LayoutToggle;
