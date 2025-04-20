// ThemeToggle.js
import React from 'react';

function ThemeToggle({ darkMode, onToggleDarkMode }) {
  return (
    <button 
      className={`theme-toggle ${darkMode ? 'dark' : 'light'}`}
      onClick={onToggleDarkMode}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? '☀️' : '🌙'}
    </button>
  );
}

export default ThemeToggle;
