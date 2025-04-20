// Header.js
import React from 'react';
import ThemeToggle from './ThemeToggle';
import LayoutToggle from './LayoutToggle';

function Header({ 
  searchQuery, 
  onSearchChange, 
  darkMode, 
  onToggleDarkMode, 
  compactLayout, 
  onToggleCompactLayout 
}) {
  return (
    <header className="header">
      <div className="logo">closetome.ai</div>

      <div className="search-container">
        <input
          type="text"
          placeholder="Search for places..."
          value={searchQuery}
          onChange={onSearchChange}
          className="search-input"
        />
      </div>

      <div className="header-controls">
        <ThemeToggle 
          darkMode={darkMode} 
          onToggleDarkMode={onToggleDarkMode} 
        />
        <LayoutToggle 
          compactLayout={compactLayout} 
          onToggleCompactLayout={onToggleCompactLayout} 
        />
      </div>
    </header>
  );
}

export default Header;
