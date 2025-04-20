// TestMap.js
import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

function TestMap() {
  const mapRef = useRef(null);
  
  useEffect(() => {
    // Initialize map
    if (mapRef.current) {
      const map = L.map(mapRef.current).setView([37.785, -122.398], 15);
      
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      // Add a test marker
      L.marker([37.785, -122.398])
        .addTo(map)
        .bindPopup('Test marker')
        .openPopup();
      
      // Clean up on unmount
      return () => {
        map.remove();
      };
    }
  }, []);
  
  return (
    <div style={{ padding: '20px' }}>
      <h3>Test Map</h3>
      <div 
        ref={mapRef} 
        style={{ 
          height: '400px', 
          width: '100%', 
          border: '1px solid #ccc',
          marginTop: '10px'
        }}
      ></div>
    </div>
  );
}

export default TestMap;