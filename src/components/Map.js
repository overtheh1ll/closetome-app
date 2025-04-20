import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Default icons
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

const HighlightedIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [35, 57],
  iconAnchor: [17, 57],
  className: 'highlighted-marker',
});

// "You Are Here" icon (blue marker)
const YouAreHereIcon = L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-blue.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [30, 46],
  iconAnchor: [15, 46],
});

L.Marker.prototype.options.icon = DefaultIcon;

function MapController({ selectedPlace, places }) {
  const map = useMap();

  useEffect(() => {
    if (selectedPlace) {
      const place = places.find(p => p.id === selectedPlace);
      if (place) {
        map.setView([place.lat, place.lng], map.getZoom());
      }
    }
  }, [selectedPlace, places, map]);

  return null;
}

function Map({ places, selectedPlace, onSelectPlace, hoveredPlace, userLocation }) {
  const center = [37.785, -122.398];
  const zoom = 15;

  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100%', width: '100%' }} className="map-container">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* User location marker */}
      {userLocation && (
        <Marker position={userLocation} icon={YouAreHereIcon}>
          <Popup>You are here!</Popup>
        </Marker>
      )}

      <MapController selectedPlace={selectedPlace} places={places} />

      {places.map(place => (
        <Marker
          key={place.id}
          position={[place.lat, place.lng]}
          icon={hoveredPlace === place.id ? HighlightedIcon : DefaultIcon}
          eventHandlers={{
            click: () => onSelectPlace(place.id),
          }}
        >
          {selectedPlace === place.id && (
            <Popup closeButton={true} autoPan={true}>
              <div className="popup-content">
                <h3>{place.name}</h3>
                <p>{place.address}</p>
                <div className="popup-tags">
                  {place.tags.map((tag, index) => (
                    <span key={index} className="popup-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  );
}

export default Map;