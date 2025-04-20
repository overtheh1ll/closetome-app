import React from 'react';

function StaticMap({ selectedPlace }) {
  // San Francisco coordinates
  const center = '37.7749,-122.4194';
  const zoom = 14;
  const size = '800x600';
  const scale = 2; // Retina display
  const mapType = 'roadmap';

  // Mock data for places
  const mockPlaces = [
    {
      id: 1,
      name: 'Whole Foods Market',
      address: '399 4th St',
      lat: 37.782,
      lng: -122.396,
    },
    {
      id: 2,
      name: 'Vitality Bowls',
      address: '270 5th St',
      lat: 37.781,
      lng: -122.398,
    },
    {
      id: 3,
      name: 'Sweetgreen',
      address: '171 2nd St',
      lat: 37.787,
      lng: -122.399,
    },
    {
      id: 4,
      name: 'Project Juice',
      address: '525 Market St',
      lat: 37.789,
      lng: -122.401,
    },
    {
      id: 5,
      name: 'Pressed Juicery',
      address: '301 Mission St',
      lat: 37.791,
      lng: -122.397,
    },
    {
      id: 6,
      name: "Trader Joe's",
      address: '555 9th St',
      lat: 37.770,
      lng: -122.411,
    }
  ];

  // Create marker parameters for all places
  const markers = mockPlaces.map(place => {
    const color = selectedPlace === place.id ? 'red' : 'blue';
    return `markers=color:${color}%7Clabel:${place.id}%7C${place.lat},${place.lng}`;
  }).join('&');

  // For demonstration, we'll use a placeholder map image
  // In a real implementation, you would use:
  // const mapUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${center}&zoom=${zoom}&size=${size}&scale=${scale}&maptype=${mapType}&${markers}&key=YOUR_API_KEY`;

  // Placeholder map image URL (OpenStreetMap)
  const mapUrl = 'https://maps.wikimedia.org/img/osm-intl,14,37.7749,-122.4194,800x600.png';

  // Styling for the map container
  const mapContainerStyle = {
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  };

  // Styling for the map image
  const mapImageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  // Styling for the location button
  const locationButtonStyle = {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    padding: '8px 12px',
    backgroundColor: 'white',
    border: 'none',
    borderRadius: '4px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    cursor: 'pointer',
    fontSize: '14px',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
  };

  // Styling for the markers overlay
  const markersOverlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
  };

  // Function to handle location button click
  const handleLocationClick = () => {
    alert('Getting your location...');
    // In a real implementation, you would use the Geolocation API
    // and update the map center to the user's location
  };

  // Create a fallback map display
  const createFallbackMap = () => {
    return (
      <div style={{
        width: '100%',
        height: '100%',
        backgroundColor: '#e8e8e8',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        textAlign: 'center',
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          border: '2px dashed #ccc',
          borderRadius: '8px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          <div style={{ fontSize: '24px', marginBottom: '10px' }}>📍</div>
          <div style={{ fontWeight: 'bold', marginBottom: '10px' }}>Map Display</div>
          <div style={{ color: '#666', maxWidth: '80%' }}>
            This is where the map would be displayed. In a production environment, 
            you would integrate with a mapping service like Google Maps, Mapbox, or OpenStreetMap.
          </div>

          <div style={{ 
            marginTop: '20px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            maxWidth: '80%'
          }}>
            {mockPlaces.map(place => (
              <div key={place.id} style={{
                padding: '8px 12px',
                backgroundColor: selectedPlace === place.id ? '#4361ee' : 'white',
                color: selectedPlace === place.id ? 'white' : 'black',
                borderRadius: '20px',
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                fontSize: '14px',
              }}>
                {place.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="map-container" style={mapContainerStyle}>
      {/* Use the fallback map instead of trying to load an external image */}
      {createFallbackMap()}

      <button 
        className="location-button" 
        style={locationButtonStyle}
        onClick={handleLocationClick}
      >
        📍 My Location
      </button>
    </div>
  );
}

export default StaticMap;
