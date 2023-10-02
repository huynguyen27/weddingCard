// Importing necessary modules from react and react-leaflet packages
import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';  // Leaflet library for mapping
import 'leaflet/dist/leaflet.css';  // Import Leaflet CSS for map styling
import pinpoint from './assets/pinpoint.png';  // Import custom pinpoint icon for map marker

// Creating a custom icon using Leaflet's Icon API
const customIcon = new L.Icon({
  iconUrl: pinpoint,  // URL to the marker image
  iconRetinaUrl: pinpoint,  // URL to the image for retina displays
  iconSize: [25, 41],  // Size of the icon in pixels
  iconAnchor: [12, 41],  // Anchor point of the icon in pixels (x, y)
  popupAnchor: [1, -34],  // Anchor point of the popup in pixels
  shadowSize: [41, 41]  // Size of the icon shadow (not used here but still configurable)
});

// WeddingMap React functional component
const WeddingMap = () => {
  // Setting initial map position using latitude and longitude coordinates
  const position = [10.792438127183601, 106.72269343890265];

  // Rendering the map
  return (
    <MapContainer
      center={position}  // Center the map based on the initial position
      zoom={13}  // Initial zoom level
      style={{ height: "400px", width: "100%" }}  // Map dimensions
    >
      {/* TileLayer to load and display tile layers on the map */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"  // OpenStreetMap tile server URL
      />
      {/* Marker component to place a marker on the map */}
      <Marker
        position={position}  // Marker position
        icon={customIcon}  // Using the custom icon
      >
        {/* Popup to show information when the marker is clicked */}
        <Popup>
          Wedding Location  // Text to display inside the popup
        </Popup>
      </Marker>
    </MapContainer>
  );
};

// Exporting the WeddingMap component to be used in other parts of the application
export default WeddingMap;
