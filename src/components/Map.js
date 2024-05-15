import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { toast } from "react-toastify";
import "leaflet/dist/leaflet.css";
import logo from "./img/logonav.png";
import { Icon } from "leaflet"; // Import Icon from leaflet
import { MdMyLocation } from "react-icons/md";
import CurrentDateTime from "./CurrentDateTime";
import styled from "styled-components";

const StyledNav = styled.nav`
  background-color: #343a40; /* Dark background color */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* Add a subtle box shadow */
  padding: 0.5rem 1rem; /* Add some padding */

  .navbar-brand {
    color: #fff; /* Set the logo text color to white */
  }

  .nav-link {
    color: #ccc; /* Set the default link color to light gray */
    transition: color 0.3s ease, background-color 0.3s ease;
    padding: 0.5rem 1rem; /* Add some padding to the links */
    border-radius: 0.25rem; /* Add rounded corners */

    &:hover {
      background-color: #fff; /* Change the background color to white on hover */
      color: #343a40; /* Change the text color to dark on hover */
    }

    &.active {
      background-color: #007bff; /* Change the background color for the active link */
      color: #fff; /* Change the text color for the active link */
    }
  }

  .navbar-toggler {
    border-color: #ccc; /* Change the border color of the toggler */
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(255, 255, 255, 0.8)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e"); /* Change the toggler icon to a custom SVG */
  }
`;
// Custom icon for the current location button
const locationIcon = new Icon({
  iconUrl: "my-location-icon.png",
  iconSize: [32, 32],
});

// Custom icon for the current location marker
const homeIcon = new Icon({
  iconUrl: "home-icon.png",
  iconSize: [32, 32],
});

const Map = () => {
  const defaultPosition = { latitude: 0, longitude: 0 };
  const [userLocation, setUserLocation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [nearbyPlaces, setNearbyPlaces] = useState([]);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [selectedType, setSelectedType] = useState(""); // State to store selected place type

  useEffect(() => {
    const fetchUserLocation = async () => {
      try {
        const position = await getCurrentPosition();
        const { latitude, longitude } = position.coords;
        setUserLocation({ latitude, longitude });
        setLoading(false); // Update loading state after successfully fetching user location
      } catch (error) {
        console.error("Error getting location:", error);
        toast.error(
          "Location is required. Please grant the access location permission"
        );
      }
    };

    if (!userLocation) {
      fetchUserLocation();
    }
  }, [userLocation]);

  const getCurrentPosition = () => {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });
  };

  useEffect(() => {
    if (userLocation) {
      // Fetch nearby places once userLocation is available
      fetchNearbyPlaces(userLocation.latitude, userLocation.longitude);
    }
  }, [userLocation]);

  const fetchNearbyPlaces = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1500&type=${selectedType}&key=GOOGLE_MAPS_API`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch nearby places");
      }

      const data = await response.json();
      const places = data.results.map((result) => ({
        name: result.name,
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
        type: result.types[0], // Assuming the first type is the most relevant
        address: result.vicinity,
        rating: result.rating,
        // Add more relevant details here
      }));

      setNearbyPlaces(places);
    } catch (error) {
      console.error("Error fetching nearby places:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = async () => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${searchQuery}&type=${selectedType}&key=GOOGLE_MAPS_API`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch search results");
      }

      const data = await response.json();
      const places = data.results.map((result) => ({
        name: result.name,
        latitude: result.geometry.location.lat,
        longitude: result.geometry.location.lng,
        type: result.types[0], // Assuming the first type is the most relevant
        address: result.formatted_address,
        rating: result.rating,
        // Add more relevant details here
      }));

      setNearbyPlaces(places);
      if (places.length > 0) {
        const { latitude, longitude } = places[0]; // Assuming the first place is the most relevant
        setUserLocation({ latitude, longitude });
      }
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const navigateToCurrentLocation = () => {
    if (userLocation) {
      // Scroll to current location
      window.scrollTo({
        top: userLocation.latitude,
        left: userLocation.longitude,
        behavior: "smooth",
      });
    }
  };

  const handlePlaceClick = (place) => {
    setSelectedPlace(place);
  };

  const handleTypeChange = (e) => {
    setSelectedType(e.target.value);
  };

  return (
    <>
      <StyledNav
        className="navbar navbar-expand-lg bg-body-tertiary"
        data-bs-theme="dark"
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <img
            src={logo}
            alt="Logo"
            className="navbar-brand mx-auto"
            style={{ width: "200px", height: "auto" }}
          />
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/news">
                  News
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/inv">
                  Inventory
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/remind">
                  Reminder
                </Link>
              </li>
            </ul>
          </div>
          <CurrentDateTime />
        </div>
      </StyledNav>
      <div style={{ height: "100vh", position: "relative" }}>
        {!loading && (
          <MapContainer
            center={
              userLocation
                ? [userLocation.latitude, userLocation.longitude]
                : [defaultPosition.latitude, defaultPosition.longitude]
            }
            zoom={13}
            style={{ height: "100%", width: "100%" }}
            onMapInit={(map) => {
              map.on("click", () => setSelectedPlace(null)); // Clear selected place on map click
            }}
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution="&copy; OpenStreetMap contributors"
            />
            {userLocation && (
              <Marker
                position={[userLocation.latitude, userLocation.longitude]}
                icon={homeIcon} // Use custom icon for the current location
              >
                <Popup>You are here</Popup>
              </Marker>
            )}
            {nearbyPlaces.map((place, index) => (
              <Marker
                key={index}
                position={[place.latitude, place.longitude]}
                onClick={() => handlePlaceClick(place)}
              >
                <Popup>{place.name}</Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
        {loading && (
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          >
            Loading...
          </div>
        )}
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            zIndex: 9999,
            backgroundColor: "white",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search for places"
            style={{ padding: "5px", width: "200px", marginRight: "10px" }}
          />
          <select
            value={selectedType}
            onChange={handleTypeChange}
            style={{ padding: "5px", marginRight: "10px" }}
          >
            <option value="">Select Type</option>
            <option value="hospital">Hospital</option>
            <option value="medical store">Medical Store</option>
            <option value="nursing home">Nursing Home</option>
            {/* Add more options as needed */}
          </select>
          <button
            onClick={handleSearchSubmit}
            style={{ padding: "5px", cursor: "pointer" }}
          >
            Search
          </button>
          <button
            onClick={navigateToCurrentLocation}
            style={{ padding: "5px", cursor: "pointer", marginLeft: "10px" }}
          >
            <MdMyLocation size={24} /> {/* Using MdMyLocation icon */}
          </button>
        </div>
        {selectedPlace && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 9999,
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <h4>{selectedPlace.name}</h4>
            <p>{selectedPlace.address}</p>
            <p>Rating: {selectedPlace.rating}</p>
            {/* Add more details as needed */}
            <button
              onClick={() => setSelectedPlace(null)}
              style={{ cursor: "pointer" }}
            >
              Close
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Map;
