
"use client";

import "leaflet/dist/leaflet.css";
import { useEffect } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
} from "react-leaflet";
import L from "leaflet";

const courier = [9.035, 38.746];
const delivery = [9.020, 38.752];

const courierIcon = L.divIcon({
  className: "",
  html: '<span style="font-size:28px">🛵</span>',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const deliveryIcon = L.divIcon({
  className: "",
  html: '<span style="font-size:28px">📍</span>',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

function FitMarkers() {
  const map = useMap();

  useEffect(() => {
    map.fitBounds([courier, delivery], {
      padding: [40, 40],
    });
  }, [map]);

  return null;
}

export default function DeliveryMap() {
  return (
    <section>
      <h2>Delivery map</h2>

      <div style={{ height: 350, width: "100%" }}>
        <MapContainer
          center={courier}
          zoom={13}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <FitMarkers />

          <Marker position={courier} icon={courierIcon}>
            <Popup>Courier location</Popup>
          </Marker>

          <Marker position={delivery} icon={deliveryIcon}>
            <Popup>Delivery location</Popup>
          </Marker>
        </MapContainer>
      </div>

      <p>
        Courier: latitude 9.035, longitude 38.746.
        Delivery: latitude 9.020, longitude 38.752.
      </p>
    </section>
  );
}
