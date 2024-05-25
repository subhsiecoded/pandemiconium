import React, { useState, useEffect } from "react";
import styled from "styled-components";
import mapboxgl from "mapbox-gl";
import "../css/CustomScrollbar.css";

const NearbyLocationsSidebarContainer = styled.div`
  position: fixed;
  top: 150px;
  left: 0;
  width: 300px;
  height: calc(100vh - 200px);
  background-color: white;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.3);
  z-index: 3;
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: dark gray transparent;
  display: ${(props) => (props.sidebarOpen ? "block" : "none")};
  transition: transform 0.3s ease;
  transform: ${(props) =>
    props.sidebarOpen ? "translateX(0)" : "translateX(-100%)"};
  /* Apply custom scrollbar style */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: darkgray;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: gray;
  }
`;

const NearbyLocationItem = styled.div`
  color: black;
  padding: 10px;
  border-bottom: 1px solid #ccc;
  transition: background-color 0.3s ease;
  cursor: pointer;
  font-family: "Comic Sans MS", cursive; 
  &:hover {
    background-color: #f0f0f0;
  }
`;

const Header = styled.h3`
  font-weight: bold;
  color: black;
`;

const NearbyLocationsSidebar = ({ mapRef, sidebarOpen }) => {
  const [nearbyLocations, setNearbyLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    const fetchNearbyLocations = async () => {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });

        const response = await fetchNearbyHealthcareFacilities(
          latitude,
          longitude
        );
        const data = await response.json();

        // Filter locations by name containing the specified words
        const filteredLocations = data.features.filter((location) =>
          matchesKeywords(location.text)
        );

        setNearbyLocations(filteredLocations);
      } catch (error) {
        console.error("Error fetching nearby locations:", error);
        setNearbyLocations([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNearbyLocations();
  }, []);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  const fetchNearbyHealthcareFacilities = async (latitude, longitude) => {
    const radius = 15000; // in meters (15 km)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=${longitude},${latitude}&radius=${radius}&access_token=${mapboxgl.accessToken}`;
    return await fetch(url);
  };

  const matchesKeywords = (name) => {
    const keywords = [
      "hospital",
      "healthcare",
      "nursing",
      "medical",
      "medicine",
      "pharmacy",
      "specialty",
      "dental",
      "speciality",
    ];
    const regex = new RegExp(keywords.join("|"), "i");
    return regex.test(name);
  };

  const handleLocationClick = (location) => {
    const coordinates = location.geometry.coordinates;
    scrollToMarker(coordinates);
  };

  const scrollToMarker = (coordinates) => {
    const [lng, lat] = coordinates;
    const lngLat = new mapboxgl.LngLat(lng, lat);

    mapRef.current.flyTo({
      center: lngLat,
      essential: true,
    });
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3; // Earth radius in meters
    const φ1 = (lat1 * Math.PI) / 180;
    const φ2 = (lat2 * Math.PI) / 180;
    const Δφ = ((lat2 - lat1) * Math.PI) / 180;
    const Δλ = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
      Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;

    return distance;
  };

  const formatDistance = (distance) => {
    if (distance >= 1000) {
      return `${(distance / 1000).toFixed(2)} km`;
    } else {
      return `${distance.toFixed(0)} m`;
    }
  };

  return (
    <NearbyLocationsSidebarContainer sidebarOpen={sidebarOpen}>
      <Header>Nearby Healthcare Facilities ({nearbyLocations.length})</Header>
      {isLoading ? (
        <p>Loading...</p>
      ) : nearbyLocations.length > 0 ? (
        nearbyLocations.map((location, index) => {
          const [lng, lat] = location.geometry.coordinates;
          const distance = userLocation
            ? calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                lat,
                lng
              )
            : "N/A";

          return (
            <NearbyLocationItem
              key={index}
              onClick={() => handleLocationClick(location)}
            >
              <p>Name: {location.text}</p>
              {/* Fetch full address if available */}
              {location.properties.address && (
                <p>Address: {location.properties.address}</p>
              )}
              <p>
                Coordinates: {location.geometry.coordinates[0]},{" "}
                {location.geometry.coordinates[1]}
              </p>
              <p>Distance: {formatDistance(distance)}</p>
            </NearbyLocationItem>
          );
        })
      ) : (
        <p>No nearby healthcare facilities found.</p>
      )}
    </NearbyLocationsSidebarContainer>
  );
};

export default NearbyLocationsSidebar;
