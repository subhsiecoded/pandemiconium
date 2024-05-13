// MapContainer.js
import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const MapContainer = ({ children, center, zoom, onMapInit }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && !mapRef.current.leafletMap) {
      const map = L.map(mapRef.current).setView(center, zoom);

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      mapRef.current.leafletMap = map;
      onMapInit(map);

      return () => {
        map.remove();
      };
    }
  }, [center, zoom, onMapInit]);

  return <div ref={mapRef} style={{ width: "80%", height: "80%" }}>{children}</div>;
};

export default MapContainer;