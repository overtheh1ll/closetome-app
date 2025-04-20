import React, { useState } from 'react';

function Directions({ place, onClose }) {
  const [transportMode, setTransportMode] = useState('driving');
  const [userLocation, setUserLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [directions, setDirections] = useState(null);
  const [error, setError] = useState(null);

  // Get user's current location
  const getUserLocation = () => {
    setIsLoading(true);
    setError(null);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          setIsLoading(false);
          // Once we have the location, generate directions
          generateDirections({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error('Error getting location:', error);
          setError('Could not get your location. Please check your browser settings.');
          setIsLoading(false);
        },
        { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
      );
    } else {
      setError('Geolocation is not supported by your browser.');
      setIsLoading(false);
    }
  };

  // Generate mock directions
  const generateDirections = (startLocation) => {
    setIsLoading(true);

    // In a real app, you would call a directions API here
    // For now, we'll generate mock directions

    // Calculate rough distance and time based on mode
    const lat1 = startLocation.lat;
    const lon1 = startLocation.lng;
    const lat2 = place.lat;
    const lon2 = place.lng;

    // Simple distance calculation (Haversine formula)
    const R = 6371; // Radius of the earth in km
    const dLat = deg2rad(lat2 - lat1);
    const dLon = deg2rad(lon2 - lon1);
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
      Math.sin(dLon/2) * Math.sin(dLon/2); 
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    const distance = R * c; // Distance in km

    // Calculate time based on mode
    let speed, timeMinutes;
    switch(transportMode) {
      case 'walking':
        speed = 5; // km/h
        break;
      case 'bicycling':
        speed = 15; // km/h
        break;
      case 'transit':
        speed = 25; // km/h
        break;
      case 'driving':
      default:
        speed = 40; // km/h in city
        break;
    }

    timeMinutes = Math.round((distance / speed) * 60);

    // Generate mock steps
    const steps = generateMockSteps(transportMode, place);

    setDirections({
      distance: distance.toFixed(1),
      time: timeMinutes,
      steps: steps
    });

    setIsLoading(false);
  };

  // Helper function for distance calculation
  const deg2rad = (deg) => {
    return deg * (Math.PI/180);
  };

  // Generate mock direction steps
  const generateMockSteps = (mode, place) => {
    const steps = [];

    switch(mode) {
      case 'walking':
        steps.push('Head north on your current street');
        steps.push('Turn right at the first intersection');
        steps.push('Continue straight for 2 blocks');
        steps.push('Turn left onto ' + (place.address.split(' ').slice(1).join(' ')));
        steps.push('Arrive at ' + place.name + ' on your right');
        break;

      case 'bicycling':
        steps.push('Head north on your current street');
        steps.push('Turn right at the first intersection');
        steps.push('Continue straight and use the bike lane');
        steps.push('Turn left onto ' + (place.address.split(' ').slice(1).join(' ')));
        steps.push('Arrive at ' + place.name + ' on your right');
        break;

      case 'transit':
        steps.push('Walk to the nearest bus stop');
        steps.push('Take bus 38 towards Downtown');
        steps.push('Get off at ' + (place.address.split(' ').slice(1).join(' ')));
        steps.push('Walk 1 block to ' + place.name);
        break;

      case 'driving':
      default:
        steps.push('Head north on your current street');
        steps.push('Turn right at the first intersection');
        steps.push('Continue straight for 3 blocks');
        steps.push('Turn left onto ' + (place.address.split(' ').slice(1).join(' ')));
        steps.push('Arrive at ' + place.name + ' on your right');
        steps.push('Parking is available nearby');
        break;
    }

    return steps;
  };

  // Handle transport mode change
  const handleModeChange = (mode) => {
    setTransportMode(mode);
    if (userLocation) {
      generateDirections(userLocation);
    }
  };

  return (
    <div className="directions-container">
      <div className="directions-header">
        <h3>Directions to {place.name}</h3>
        <button className="close-button" onClick={onClose}>×</button>
      </div>

      <div className="transport-modes">
        <button 
          className={transportMode === 'driving' ? 'active' : ''} 
          onClick={() => handleModeChange('driving')}
        >
          🚗 Driving
        </button>
        <button 
          className={transportMode === 'walking' ? 'active' : ''} 
          onClick={() => handleModeChange('walking')}
        >
          🚶 Walking
        </button>
        <button 
          className={transportMode === 'bicycling' ? 'active' : ''} 
          onClick={() => handleModeChange('bicycling')}
        >
          🚲 Bicycling
        </button>
        <button 
          className={transportMode === 'transit' ? 'active' : ''} 
          onClick={() => handleModeChange('transit')}
        >
          🚌 Transit
        </button>
      </div>

      {!userLocation && !isLoading && !error && (
        <div className="location-prompt">
          <p>We need your location to provide directions.</p>
          <button className="primary-button" onClick={getUserLocation}>
            📍 Use My Location
          </button>
        </div>
      )}

      {isLoading && (
        <div className="loading">
          <div className="loading-spinner"></div>
          <p>Getting directions...</p>
        </div>
      )}

      {error && (
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => setError(null)}>Dismiss</button>
        </div>
      )}

      {directions && (
        <div className="directions-results">
          <div className="directions-summary">
            <div className="summary-item">
              <span className="label">Distance:</span>
              <span className="value">{directions.distance} km</span>
            </div>
            <div className="summary-item">
              <span className="label">Time:</span>
              <span className="value">
                {directions.time < 60 
                  ? `${directions.time} min` 
                  : `${Math.floor(directions.time / 60)} hr ${directions.time % 60} min`}
              </span>
            </div>
          </div>

          <div className="directions-steps">
            <h4>Directions:</h4>
            <ol>
              {directions.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </div>
  );
}

export default Directions;
