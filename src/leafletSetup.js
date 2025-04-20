// leafletSetup.js
// This file ensures Leaflet is properly loaded and available globally

// Import Leaflet
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Make Leaflet available globally
window.L = L;

// Fix Leaflet icon paths
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

console.log('Leaflet setup complete');
