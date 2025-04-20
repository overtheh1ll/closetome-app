// PlacesList.js - Enhanced with improved hover effects
import React from 'react';

function PlacesList({ places, onSelectPlace, selectedPlace, onHoverPlace, hoveredPlace }) {
  // Function to render star rating
  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) {
        stars.push(<span key={i} className="star filled">★</span>);
      } else if (i - 0.5 <= rating) {
        stars.push(<span key={i} className="star half-filled">★</span>);
      } else {
        stars.push(<span key={i} className="star">☆</span>);
      }
    }
    return stars;
  };

  // Function to format tags with blue styling
  const renderTags = (tags) => {
    return (
      <div className="place-tags">
        {tags.map((tag, index) => (
          <span key={index} className="place-tag">{tag}</span>
        ))}
      </div>
    );
  };

  return (
    <div className="places-list">
      {places.map(place => (
        <div 
          key={place.id} 
          className={`place-card ${selectedPlace === place.id ? 'selected' : ''} ${hoveredPlace === place.id ? 'hovered' : ''}`}
          onClick={() => onSelectPlace(place.id)}
          onMouseEnter={() => onHoverPlace(place.id)}
          onMouseLeave={() => onHoverPlace(null)}
        >
          <div className="place-name">{place.name}</div>
          <div className="place-address">{place.address}</div>
          <div className="place-details">
            <div className="place-rating">
              {renderStars(place.rating)} 
              <span className="review-count">({place.reviewCount})</span>
            </div>
            <div className="place-hours">{place.hours}</div>
            <div className="place-distance">{place.distance} miles away</div>
            {renderTags(place.tags)}
            <button className="get-directions">Get Directions</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlacesList;
