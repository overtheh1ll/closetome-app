import React, { useEffect, useRef } from 'react';

function Map({ selectedPlace, searchQuery }) {
  const mapContainerRef = useRef(null);

  useEffect(() => {
    // Check if the map container exists
    if (!mapContainerRef.current) return;

    // Create a simple placeholder map with CSS
    const mapContainer = mapContainerRef.current;
    mapContainer.innerHTML = '';
    mapContainer.style.backgroundColor = '#e8e8e8';

    // Create map elements
    const mapContent = document.createElement('div');
    mapContent.className = 'map-content';
    mapContent.style.width = '100%';
    mapContent.style.height = '100%';
    mapContent.style.position = 'relative';
    mapContent.style.overflow = 'hidden';

    // Add a grid to simulate a map
    for (let i = 0; i < 20; i++) {
      for (let j = 0; j < 20; j++) {
        const gridCell = document.createElement('div');
        gridCell.style.position = 'absolute';
        gridCell.style.left = `${j * 5}%`;
        gridCell.style.top = `${i * 5}%`;
        gridCell.style.width = '5%';
        gridCell.style.height = '5%';
        gridCell.style.border = '1px solid rgba(200, 200, 200, 0.3)';
        mapContent.appendChild(gridCell);
      }
    }

    // Add some "roads"
    const roads = [
      { x1: 10, y1: 0, x2: 10, y2: 100, width: 3 },
      { x1: 30, y1: 0, x2: 30, y2: 100, width: 2 },
      { x1: 50, y1: 0, x2: 50, y2: 100, width: 4 },
      { x1: 70, y1: 0, x2: 70, y2: 100, width: 2 },
      { x1: 0, y1: 20, x2: 100, y2: 20, width: 3 },
      { x1: 0, y1: 40, x2: 100, y2: 40, width: 2 },
      { x1: 0, y1: 60, x2: 100, y2: 60, width: 4 },
      { x1: 0, y1: 80, x2: 100, y2: 80, width: 2 },
    ];

    roads.forEach(road => {
      const roadEl = document.createElement('div');
      roadEl.style.position = 'absolute';
      roadEl.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';

      if (road.x1 === road.x2) {
        // Vertical road
        roadEl.style.left = `${road.x1}%`;
        roadEl.style.top = `${road.y1}%`;
        roadEl.style.width = `${road.width}%`;
        roadEl.style.height = `${road.y2 - road.y1}%`;
      } else {
        // Horizontal road
        roadEl.style.left = `${road.x1}%`;
        roadEl.style.top = `${road.y1}%`;
        roadEl.style.width = `${road.x2 - road.x1}%`;
        roadEl.style.height = `${road.width}%`;
      }

      mapContent.appendChild(roadEl);
    });

    // Add location markers
    const locations = [
      { name: 'Whole Foods Market', x: 15, y: 25, color: '#4CAF50' },
      { name: 'Vitality Bowls', x: 35, y: 45, color: '#2196F3' },
      { name: 'Sweetgreen', x: 55, y: 35, color: '#4CAF50' },
      { name: 'Project Juice', x: 25, y: 65, color: '#2196F3' },
      { name: 'Pressed Juicery', x: 75, y: 55, color: '#2196F3' },
      { name: "Trader Joe's", x: 45, y: 75, color: '#FFC107' },
    ];

    locations.forEach((loc, index) => {
      const marker = document.createElement('div');
      marker.className = 'map-marker';
      marker.style.position = 'absolute';
      marker.style.left = `${loc.x}%`;
      marker.style.top = `${loc.y}%`;
      marker.style.width = '12px';
      marker.style.height = '12px';
      marker.style.borderRadius = '50%';
      marker.style.backgroundColor = loc.color;
      marker.style.border = '2px solid white';
      marker.style.boxShadow = '0 0 5px rgba(0,0,0,0.3)';
      marker.style.transform = 'translate(-50%, -50%)';
      marker.style.zIndex = '10';
      marker.setAttribute('data-id', index + 1);

      // Highlight selected place
      if (selectedPlace === index + 1) {
        marker.style.width = '16px';
        marker.style.height = '16px';
        marker.style.boxShadow = '0 0 8px rgba(0,0,0,0.5)';
        marker.style.zIndex = '20';

        // Add a pulse effect
        const pulse = document.createElement('div');
        pulse.style.position = 'absolute';
        pulse.style.left = '50%';
        pulse.style.top = '50%';
        pulse.style.width = '30px';
        pulse.style.height = '30px';
        pulse.style.borderRadius = '50%';
        pulse.style.backgroundColor = 'rgba(255,255,255,0.4)';
        pulse.style.transform = 'translate(-50%, -50%)';
        pulse.style.animation = 'pulse 1.5s infinite';
        marker.appendChild(pulse);
      }

      // Add tooltip on hover
      marker.title = loc.name;

      // Add click handler
      marker.addEventListener('click', () => {
        console.log(`Clicked on ${loc.name}`);
        // You would typically update state here
      });

      mapContent.appendChild(marker);
    });

    // Add location button
    const locationButton = document.createElement('button');
    locationButton.className = 'location-button';
    locationButton.innerHTML = '📍 My Location';
    locationButton.style.position = 'absolute';
    locationButton.style.bottom = '20px';
    locationButton.style.right = '20px';
    locationButton.style.padding = '8px 12px';
    locationButton.style.backgroundColor = 'white';
    locationButton.style.border = 'none';
    locationButton.style.borderRadius = '4px';
    locationButton.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    locationButton.style.cursor = 'pointer';
    locationButton.style.fontSize = '14px';

    locationButton.addEventListener('click', () => {
      alert('Getting your location...');
      // In a real implementation, you would use the Geolocation API here
    });

    mapContent.appendChild(locationButton);

    // Add zoom controls
    const zoomControls = document.createElement('div');
    zoomControls.className = 'zoom-controls';
    zoomControls.style.position = 'absolute';
    zoomControls.style.top = '20px';
    zoomControls.style.left = '20px';
    zoomControls.style.display = 'flex';
    zoomControls.style.flexDirection = 'column';
    zoomControls.style.gap = '5px';

    const zoomIn = document.createElement('button');
    zoomIn.innerHTML = '+';
    zoomIn.style.width = '30px';
    zoomIn.style.height = '30px';
    zoomIn.style.backgroundColor = 'white';
    zoomIn.style.border = 'none';
    zoomIn.style.borderRadius = '4px';
    zoomIn.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    zoomIn.style.cursor = 'pointer';
    zoomIn.style.fontSize = '18px';
    zoomIn.style.display = 'flex';
    zoomIn.style.alignItems = 'center';
    zoomIn.style.justifyContent = 'center';

    const zoomOut = document.createElement('button');
    zoomOut.innerHTML = '−';
    zoomOut.style.width = '30px';
    zoomOut.style.height = '30px';
    zoomOut.style.backgroundColor = 'white';
    zoomOut.style.border = 'none';
    zoomOut.style.borderRadius = '4px';
    zoomOut.style.boxShadow = '0 2px 5px rgba(0,0,0,0.2)';
    zoomOut.style.cursor = 'pointer';
    zoomOut.style.fontSize = '18px';
    zoomOut.style.display = 'flex';
    zoomOut.style.alignItems = 'center';
    zoomOut.style.justifyContent = 'center';

    zoomControls.appendChild(zoomIn);
    zoomControls.appendChild(zoomOut);
    mapContent.appendChild(zoomControls);

    // Add CSS for pulse animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse {
        0% {
          transform: translate(-50%, -50%) scale(0.5);
          opacity: 1;
        }
        100% {
          transform: translate(-50%, -50%) scale(1.5);
          opacity: 0;
        }
      }
    `;
    document.head.appendChild(style);

    // Add the map content to the container
    mapContainer.appendChild(mapContent);

    return () => {
      // Clean up
      if (style.parentNode) {
        document.head.removeChild(style);
      }
    };
  }, [selectedPlace, searchQuery]);

  return (
    <div className="map-container" ref={mapContainerRef} style={{ width: '100%', height: '100%' }}>
      <div className="map-loading">
        <p>Loading map...</p>
      </div>
    </div>
  );
}

export default Map;
