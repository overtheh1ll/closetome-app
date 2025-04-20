import React from 'react';

function PlaceDetails({ place, onClose }) {
  if (!place) return null;

  // Function to render star rating
  const renderStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

    return (
      <div className="stars">
        {[...Array(fullStars)].map((_, i) => (
          <span key={`full-${i}`} className="star full">★</span>
        ))}
        {halfStar && <span className="star half">★</span>}
        {[...Array(emptyStars)].map((_, i) => (
          <span key={`empty-${i}`} className="star empty">☆</span>
        ))}
      </div>
    );
  };

  return (
    <div className="place-details-overlay">
      <div className="place-details-modal">
        <button className="close-button" onClick={onClose}>×</button>

        <div className="place-header">
          <h2>{place.name}</h2>
          <div className="place-subheader">
            <div className="rating-container">
              {renderStars(place.rating)}
              <span className="rating-text">{place.rating} ({place.reviewCount} reviews)</span>
            </div>
            <span className="price-level">{place.priceLevel}</span>
          </div>
        </div>

        <div className="place-info-grid">
          <div className="info-section">
            <h3>Location</h3>
            <p className="address">{place.address}</p>
            <p className="distance">{place.distance} miles away</p>
            <div className="hours-container">
              <h4>Hours</h4>
              <p>{place.hours}</p>
              <p className="full-hours">Mon-Fri: 8:00 AM - 10:00 PM<br />Sat-Sun: 9:00 AM - 8:00 PM</p>
            </div>
          </div>

          <div className="info-section">
            <h3>Details</h3>
            <p className="description">
              {place.description || `${place.name} is a popular destination for health-conscious individuals looking for ${place.tags.join(', ')} options in the area.`}
            </p>
            <div className="tags-section">
              <h4>Categories</h4>
              <div className="tags">
                {place.tags.map(tag => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="place-features">
          <h3>Features</h3>
          <div className="features-grid">
            <div className="feature">
              <span className="feature-icon">✓</span>
              <span className="feature-text">Takeout Available</span>
            </div>
            <div className="feature">
              <span className="feature-icon">✓</span>
              <span className="feature-text">Delivery</span>
            </div>
            <div className="feature">
              <span className="feature-icon">✓</span>
              <span className="feature-text">Outdoor Seating</span>
            </div>
            <div className="feature">
              <span className="feature-icon">✓</span>
              <span className="feature-text">Wheelchair Accessible</span>
            </div>
            <div className="feature">
              <span className="feature-icon">✓</span>
              <span className="feature-text">Accepts Credit Cards</span>
            </div>
            <div className="feature">
              <span className="feature-icon">✓</span>
              <span className="feature-text">Free Wi-Fi</span>
            </div>
          </div>
        </div>

        <div className="action-buttons">
          <button className="action-button primary">Get Directions</button>
          <button className="action-button secondary">Save</button>
          <button className="action-button secondary">Share</button>
        </div>
      </div>
    </div>
  );
}

export default PlaceDetails;
