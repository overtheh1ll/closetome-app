import React from 'react';

function CategoryButtons({ categories, activeCategory, onCategoryChange }) {
  return (
    <div className="category-buttons">
      {categories.map(category => (
        <button
          key={category}
          className={`category-button ${activeCategory === category ? 'active' : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}

export default CategoryButtons;
