import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import { useState, useEffect } from 'react'

function MapComponent(props) {
  const position = [props.x, props.y];

  useEffect(() => {
  const timer = setTimeout(() => {
    const element = document.querySelector('.leaflet-attribution-flag');
    if (element) {
      element.remove();
    }
  }, 1);
  return () => clearTimeout(timer);
  }, []);

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={true} style={{ height: "100%", width: "100%" }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          {props.currentadress}
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;
