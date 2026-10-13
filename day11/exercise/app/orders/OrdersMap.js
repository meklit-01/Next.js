
"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import { useEffect } from "react";

const courier = [9.03, 38.74];
const delivery = [9.04, 38.75];

function FitMarkers() {
  const map = useMap();

  useEffect(() => {
    map.fitBounds([courier, delivery], {
      padding: [30, 30],
    });
  }, [map]);

  return null;
}

export default function OrdersMap() {
  return (
    <MapContainer
      center={courier}
      zoom={13}
      style={{
        height: "350px",
        width: "100%",
        borderRadius: "8px",
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <FitMarkers />

      <Marker position={courier}>
        <Popup>Courier location</Popup>
      </Marker>

      <Marker position={delivery}>
        <Popup>Delivery location</Popup>
      </Marker>
    </MapContainer>
  );
}
