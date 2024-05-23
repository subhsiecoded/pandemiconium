import React, { useState, useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import logo from "../img/logonav.png";
import { Link } from "react-router-dom";
import "../css/CustomScrollbar.css";
import CurrentDateTime from "../CurrentDateTime";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "mapbox-gl/dist/mapbox-gl.css";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import styled from "styled-components";
import MapHeader from "../headers/MapHeader"; 
import NearbyLocationsSidebar from "./NearbyHospitalsSidebar";

const StyledNav = styled.nav`
  background-color: #343a40;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  padding: 0.5rem 1rem;

  .navbar-brand {
    color: #fff; /* Set the logo text color to white */
  }

  .nav-link {
    color: #ccc;
    transition: color 0.3s ease, background-color 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 0.25rem;

    &:hover {
      background-color: #fff;
      color: #343a40;
    }

    &.active {
      background-color: #007bff;
      color: #fff;
    }
  }

  .navbar-toggler {
    border-color: #ccc;
  }

  .navbar-toggler-icon {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3e%3cpath stroke='rgba(255, 255, 255, 0.8)' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
  }
`;

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3ViaHNpZSIsImEiOiJjbHdmNTV2bzgxY28zMmtwbmUxZnRzd2Y5In0.sTCB0mVORvWAbO7pSxZoFg";

const MapContainer = styled.div`
  height: 75vh;
  width: calc(100vw - 40px);
  margin: 20px;
  border-radius: 20px;
  overflow: hidden;
  position: relative;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 150px;
  right: 0;
  width: 300px;
  height: calc(100vh - 200px);
  background-color: white;
  box-shadow: -2px 0 5px rgba(0, 0, 0, 0.3);
  z-index: 1;
  display: ${(props) => (props.sidebarOpen ? "block" : "none")};
  overflow-y: auto;
  scrollbar-width: thin;
  scrollbar-color: dark gray transparent;
`;

const SidebarItem = styled.div`
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

const SidebarToggleButton = styled.button`
  position: absolute;
  bottom: 10px;
  right: 10px;
  z-index: 2;
`;

const NearbySidebarToggleButton = styled.button`
  position: absolute;
  top: 50%;
  left: 0;
  transform: translateY(-50%);
  z-index: 2;
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px;
  cursor: pointer;
  border-radius: 0 5px 5px 0;
  box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #0056b3;
  }
`;
const NavButton = styled.button`
  position: absolute;
  bottom: 10px;
  left: 10px;
  z-index: 2;
`;

const Map = ({ darkMode }) => {
  const [starredLocations, setStarredLocations] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [nearbySidebarOpen, setNearbySidebarOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const geocoderRef = useRef(null);
  const starMarkers = useRef({});

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [-96, 37.8],
      zoom: 3,
    });

    const storedUserId = JSON.parse(localStorage.getItem("userId"));
    const newUserId = storedUserId?.token;

    if (newUserId !== userId) {
      setUserId(newUserId);
      console.log(newUserId);

      if (newUserId) {
        fetch(
          `https://pandemiconiummanager.azurewebsites.net/GetStarredLocations/${newUserId}`
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Failed to fetch starred locations");
            }
            return response.json();
          })
          .then((data) => {
            // Split the coordinates string and assign lng and lat directly
            const formattedLocations = data.map((location) => {
              const [lng, lat] = location.coordinates.split(",");
              return {
                ...location,
                coordinates: { lng, lat },
              };
            });
            setStarredLocations(formattedLocations);
          })
          .catch((error) => {
            console.error("Error fetching starred locations:", error);
          });
      } else {
        setStarredLocations([]);
      }
    }

    mapRef.current = map;

    map.on("load", () => {
      geocoderRef.current = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false,
      });

      map.addControl(geocoderRef.current);

      map.on("click", async (e) => {
        const features = map.queryRenderedFeatures(e.point);

        if (features.length > 0) {
          const feature = features[0];
          const name = feature.properties?.name || feature.text;

          if (name && isHealthcareFacility(name)) {
            const address = await fetchAddress(e.lngLat);
            const newLocation = {
              coordinates: e.lngLat,
              name,
              address,
            };
            confirmStarLocation(newLocation);
          } else {
            notifyNotHealthcareFacility();
          }
        }
      });

      starredLocations.forEach((location) => {
        addStarMarker(location.coordinates, location.name);
      });

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          map.setCenter([longitude, latitude]);
          map.setZoom(14);
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    });

    return () => {
      Object.values(starMarkers.current).forEach((marker) => marker.remove());
      map.remove();
    };
  }, [userId, starredLocations]);

  const isHealthcareFacility = (locationName) => {
    if (!locationName) {
      return false;
    }

    const categories = [
      "hospital",
      "healthcare",
      "nursing",
      "medical",
      "medicine",
      "pharmacy",
      "pharma",
      "clinic",
      "specialty",
      "dental",
      "speciality",
    ];

    return categories.some((category) =>
      locationName.toLowerCase().includes(category)
    );
  };

  const fetchAddress = async (lngLat) => {
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${lngLat.lng},${lngLat.lat}.json?access_token=${mapboxgl.accessToken}`
    );
    const data = await response.json();
    if (data.features && data.features.length > 0) {
      return data.features[0].place_name;
    }
    return "Address not available";
  };

  const addStarMarker = (coordinates, locationId) => {
    if (!mapRef.current) {
      // Map is not initialized yet, so we cannot add the marker
      return;
    }

    const { lng, lat } = coordinates;
    const lngLat = new mapboxgl.LngLat(lng, lat);

    const marker = new mapboxgl.Marker({ color: "red" })
      .setLngLat(lngLat)
      .addTo(mapRef.current);
    starMarkers.current[locationId] = marker;
  };

  const removeStarMarker = (locationId) => {
    const marker = starMarkers.current[locationId];
    if (marker) {
      marker.remove();
      delete starMarkers.current[locationId];
    }
  };

  const unstarLocation = (index) => {
    const unstarredLocation = starredLocations[index];
    const updatedLocations = [...starredLocations];
    updatedLocations.splice(index, 1);
    setStarredLocations(updatedLocations);
    removeStarMarker(unstarredLocation.name);

    // Make DELETE request to remove starred location
    fetch("https://pandemiconiummanager.azurewebsites.net/DeleteLocation", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId, // Use the token value directly
        coordinates: `${unstarredLocation.coordinates.lng},${unstarredLocation.coordinates.lat}`,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to delete starred location");
        }
      })
      .catch((error) => {
        console.error("Error deleting starred location:", error);
        // Handle error (e.g., show a toast notification)
      });
  };

  const notifyNotHealthcareFacility = () => {
    toast.error("The location you are starring is not a healthcare facility", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const confirmStarLocation = (location) => {
    const toastId = toast(
      <div>
        <p>Star location {location.name}?</p>
        <div>
          <button
            className="btn btn-primary mr-2"
            onClick={() => {
              starLocation(location);
              toast.dismiss(toastId);
            }}
          >
            Yes
          </button>
          <button
            className="btn btn-primary"
            onClick={() => toast.dismiss(toastId)}
          >
            No
          </button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: 10000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  const starLocation = (location) => {
    const coordinates = {
      lng: location.coordinates.lng,
      lat: location.coordinates.lat,
    };

    setStarredLocations((prevLocations) => [
      ...prevLocations,
      { ...location, coordinates },
    ]);
    addStarMarker(coordinates, location.name);

    // Make POST request to save the starred location
    fetch("https://pandemiconiummanager.azurewebsites.net/StarLocation", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: userId, // Use the token value directly
        name: location.name,
        address: location.address,
        coordinates: `${coordinates.lng},${coordinates.lat}`,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to save starred location");
        }
        // If the response is successful, you can do additional operations here if needed
      })
      .catch((error) => {
        console.error("Error saving starred location:", error);
        // Handle error (e.g., show a toast notification)
      });
  };

  const navigateToCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        mapRef.current.setCenter([longitude, latitude]);
        mapRef.current.setZoom(14);
      },
      (error) => {
        console.error("Error getting location:", error);
      }
    );
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const scrollToMarker = (coordinates) => {
    const { lng, lat } = coordinates;
    const lngLat = new mapboxgl.LngLat(lng, lat);

    mapRef.current.flyTo({
      center: lngLat,
      essential: true,
    });
  };

  return (
    <>
      <StyledNav className="navbar navbar-expand-lg" data-bs-theme="dark">
        <div className="container-fluid d-flex justify-content-center">
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
                <Link className="nav-link" to="/pandemic">
                  Pandemic info
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/news">
                  News
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/notes">
                  Notes
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
      <div>
        <MapHeader darkMode={darkMode} />
        <MapContainer ref={mapContainerRef} />
        <NavButton
          className="btn btn-primary"
          onClick={navigateToCurrentLocation}
        >
          <MyLocationIcon />
        </NavButton>
        <SidebarToggleButton
          className="btn btn-primary"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? ">>" : "<<"}
        </SidebarToggleButton>
        <Sidebar sidebarOpen={sidebarOpen} className="custom-scrollbar">
          <div
            style={{ padding: "10px", maxHeight: "100%", overflowY: "auto" }}
          >
            {/* Map through all starred locations and render each one */}
            {starredLocations.length > 0 ? (
              starredLocations.map((location, index) => (
                <SidebarItem
                  key={index}
                  onClick={() => scrollToMarker(location.coordinates)}
                >
                  <p>Name: {location.name}</p>
                  <p>Address: {location.address}</p>
                  <p>
                    Coordinates: {location.coordinates.lng},{" "}
                    {location.coordinates.lat}
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={() => unstarLocation(index)}
                  >
                    Unstar Location
                  </button>
                </SidebarItem>
              ))
            ) : (
              <SidebarItem>
                Click on a healthcare facility location to star it.
              </SidebarItem>
            )}
          </div>
        </Sidebar>
        <NearbySidebarToggleButton
        className="btn btn-primary"
        onClick={() => setNearbySidebarOpen(!nearbySidebarOpen)}
      >
        {nearbySidebarOpen ? "<<" : ">>"}
      </NearbySidebarToggleButton>
      <NearbyLocationsSidebar
        mapRef={mapRef}
        sidebarOpen={nearbySidebarOpen}
      />
        
        <ToastContainer />
      </div>
    </>
  );
};

export default Map;
