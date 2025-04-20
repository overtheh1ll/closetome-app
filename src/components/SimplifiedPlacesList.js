import React from 'react';

function PlacesList({ places, onSelectPlace, selectedPlace }) {
  const handleGetDirections = (place, e) => {
    e.stopPropagation(); // Prevent triggering the place selection
    alert(`Getting directions to ${place.name}. This feature will be implemented soon!`);
  };

  return (
    <div className="places-list">
      {places.map(place => (
        <div 
          key={place.id} 
          className={`place-card ${selectedPlace === place.id ? 'selected' : ''}`}
          onClick={() => onSelectPlace(place.id)}
        >
          <div className="place-info">
            <h3 className="place-name">{place.name}</h3>
            <p className="place-address">{place.address}</p>

            <div className="place-rating">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={i < Math.floor(place.rating) ? 'star filled' : 'star'}>★</span>
              ))}
              <span className="rating-number">{place.rating}</span>
              <span className="review-count">({place.reviewCount})</span>
            </div>

            <div className="place-details">
              <span className="price-level">{place.priceLevel}</span>
              <span className="hours">{place.hours}</span>
            </div>

            <p className="place-distance">{place.distance} miles away</p>

            <div className="place-tags">
              {place.tags.map(tag => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>

          <div className="place-actions">
            <button 
              className="directions-button"
              onClick={(e) => handleGetDirections(place, e)}
            >
              Get Directions
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default PlacesList;
