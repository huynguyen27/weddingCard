import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import pinpoint from './assets/pinpoint.png';  // Import the image

// Create a custom icon
const customIcon = new L.Icon({
  iconUrl: pinpoint,
  iconRetinaUrl: pinpoint,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const WeddingMap = () => {
  const position = [10.792438127183601, 106.72269343890265];

  return (
    <MapContainer center={position} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position} icon={customIcon}>
        <Popup>
          Wedding Location
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default WeddingMap;
