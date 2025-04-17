// src/components/MapView.jsx
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const MapView = ({ coordinates }) => {
  const [route, setRoute] = useState([]);

  useEffect(() => {
    if (coordinates && coordinates.length) {
      // Convert [lon, lat] to [lat, lon] for Leaflet
      const reordered = coordinates.map(([lon, lat]) => [lat, lon]);
      setRoute(reordered);
    }
  }, [coordinates]);

  return (
    <MapContainer center={[12.9716, 77.5946]} zoom={12} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {route.map((pos, index) => (
        <Marker key={index} position={pos}>
          <Popup>Stop {index + 1}</Popup>
        </Marker>
      ))}
      {route.length > 1 && (
        <Polyline positions={route} color="blue" />
      )}
    </MapContainer>
  );
};

export default MapView;