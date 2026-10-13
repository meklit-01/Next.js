"use client";

import { useEffect, useRef } from "react";

const LOCATIONS = {
  bole: [8.995, 38.785],
  piassa: [9.035, 38.746],
  arat: [9.010, 38.761],
  kazanchis: [9.018, 38.767],
  mexico: [9.012, 38.750],
  default: [8.980, 38.757],
};

export default function DeliveryMap({ area }) {
  const elementRef = useRef(null);
  const mapRef = useRef(null);

  useEffect(() => {
    let cancelled = false;
    let map;
    let cleanup = () => {};

    import("leaflet").then((L) => {
      if (cancelled || !elementRef.current || mapRef.current) return;
      const key = String(area || "").toLowerCase();
      const delivery = LOCATIONS[Object.keys(LOCATIONS).find((name) => name !== "default" && key.includes(name)) || "default"];
      const courier = [delivery[0] + 0.009, delivery[1] - 0.012];
      map = L.map(elementRef.current, { scrollWheelZoom: false }).setView(delivery, 13);
      mapRef.current = map;
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(map);
      L.marker(courier).addTo(map).bindPopup("Courier (demo location)");
      L.marker(delivery).addTo(map).bindPopup(`Delivery address: ${area || "Addis Ababa"}`);
      L.polyline([courier, delivery], { color: "#222", weight: 4, dashArray: "7 7" }).addTo(map);
      map.fitBounds([courier, delivery], { padding: [30, 30] });
      cleanup = () => { map.remove(); mapRef.current = null; };
    }).catch(() => {});

    return () => {
      cancelled = true;
      cleanup();
      if (map && !mapRef.current) map.remove();
    };
  }, [area]);

  return <div ref={elementRef} className="delivery-map" role="img" aria-label={`Map showing courier and delivery location in ${area || "Addis Ababa"}`} />;
}
