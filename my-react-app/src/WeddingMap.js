// Import necessary modules from react and react-leaflet packages
import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet'; // Import Tooltip here
import L from 'leaflet';  // Leaflet library for mapping
import 'leaflet/dist/leaflet.css';  // Import Leaflet CSS for map styling
import pinpoint from './assets/pinpoint.png';  // Import custom pinpoint icon for map marker
import './css/WeddingMap.css'; // Import your CSS file

// Creating a custom icon using Leaflet's Icon API
const customIcon = new L.Icon({
  iconUrl: pinpoint,  // URL to the marker image
  iconRetinaUrl: pinpoint,  // URL to the image for retina displays
  iconSize: [25, 41],  // Size of the icon in pixels
  iconAnchor: [12, 41],  // Anchor point of the icon in pixels (x, y)
  popupAnchor: [1, -34],  // Anchor point of the popup in pixels
  shadowSize: [41, 41]  // Size of the icon shadow (not used here but still configurable)
});

// Address variable
const address = 'White Palace, 194 Hoang Van Thu Street, Ward 9, Phu Nhuan District';


// WeddingMap React functional component
const WeddingMap = () => {
  // Setting initial map position using latitude and longitude coordinates
  const position = [10.800138493663958, 106.67480762278619];
  const [isTooltipVisible, setTooltipVisible] = useState(true); // Tooltip is initially visible

  const toggleTooltip = () => {
    setTooltipVisible(!isTooltipVisible);
  };

  const hideTooltip = () => {
    setTooltipVisible(false);
  };

  useEffect(() => {
    if (!isTooltipVisible) {
      // Delay the removal of the Tooltip to allow the fade-out animation to play
      setTimeout(hideTooltip, 500); // Adjust the duration as needed
    }
  }, [isTooltipVisible]);


  const redirectToGoogleMaps = () => {
    // Replace spaces in the address with "+" and encode it for the URL
    const encodedAddress = encodeURIComponent(address);

    // Build the Google Maps URL with the encoded address
    const googleMapsURL = `https://www.google.com/maps/search/?api=1&query=${encodedAddress}`;

    // Open Google Maps in a new tab or window
    window.open(googleMapsURL, '_blank');
  };

  // Rendering the map
  return (
    <div className="wedding-map-container">
      {/* MapContainer to create the map */}
      <MapContainer
        center={position}  // Center the map based on the initial position
        zoom={13}  // Initial zoom level
        style={{ height: "300px", width: "100%" }}  // Map dimensions
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
          <button className="toggle-button" onClick={toggleTooltip}>{!isTooltipVisible ? `Show Address` : `Hide Address`}</button>
          <button className="redirect-button" onClick={redirectToGoogleMaps}>Google Map</button>

          {isTooltipVisible && (
            <Tooltip className="centered-tooltip" permanent direction="bottom">
              <div className="address-box">{address}</div>
            </Tooltip>
          )}


        </Marker>
      </MapContainer>

    </div>
  );
};

// Exporting the WeddingMap component to be used in other parts of the application
export default WeddingMap;
