import React, { useEffect, useRef, useState } from "react";
import { GoogleMap, Marker, InfoWindow } from "@react-google-maps/api";

const MapComponent = () => {
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const [infoWindow, setInfoWindow] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const mapRef = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    if (mapRef.current && !map) {
      const initMap = () => {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: -34.397, lng: 150.644 },
          zoom: 8,
        });
        setMap(map);

        // Get the current location
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const currentPosition = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              setCurrentLocation(currentPosition);
              map.setCenter(currentPosition);
              addCurrentLocationMarker(currentPosition);
            },
            () => {
              console.log("Error getting current location");
            }
          );
        }

        // Add markers for hospitals, healthcare facilities, and medical stores
        const service = new window.google.maps.places.PlacesService(map);
        const request = {
          location: map.getCenter(),
          radius: "50000",
          type: ["hospital", "health", "pharmacy"],
        };

        service.nearbySearch(request, (results, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK) {
            const newMarkers = results.map((place) => {
              const marker = new window.google.maps.Marker({
                position: place.geometry.location,
                map,
                icon: getMarkerIcon(place.types[0]),
                clickable: isMedicalFacility(place.types[0]),
              });

              if (isMedicalFacility(place.types[0])) {
                marker.addListener("click", () => {
                  setInfoWindow(
                    <InfoWindow position={place.geometry.location}>
                      <div>
                        <h4>{place.name}</h4>
                        <p>{place.formatted_address}</p>
                      </div>
                    </InfoWindow>
                  );
                });
              }

              return marker;
            });

            setMarkers(newMarkers);
          }
        });
      };

      initMap();
    }
  }, [map]);

  const isMedicalFacility = (type) => {
    return ["hospital", "health", "pharmacy"].includes(type);
  };

  const getMarkerIcon = (type) => {
    switch (type) {
      case "hospital":
        return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
      case "health":
        return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
      case "pharmacy":
        return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
      default:
        return null;
    }
  };

  const addCurrentLocationMarker = (position) => {
    const currentLocationMarker = new window.google.maps.Marker({
      position: position,
      map: mapRef.current,
      icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
    });
    setMarkers((prevMarkers) => [...prevMarkers, currentLocationMarker]);
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentPosition = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCurrentLocation(currentPosition);
          map.setCenter(currentPosition);
          addCurrentLocationMarker(currentPosition);
        },
        () => {
          console.log("Error getting current location");
        }
      );
    }
  };

  const handleSearch = () => {
    if (searchInputRef.current) {
      const input = searchInputRef.current.value;
      setSearchKeyword(input);

      const service = new window.google.maps.places.PlacesService(map);
      const request = {
        query: input,
        fields: ["name", "geometry", "formatted_address", "types"],
      };

      service.textSearch(request, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const newMarkers = results.map((place) => {
            const marker = new window.google.maps.Marker({
              position: place.geometry.location,
              map,
              icon: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            });

            marker.addListener("click", () => {
              setInfoWindow(
                <InfoWindow position={place.geometry.location}>
                  <div>
                    <h4>{place.name}</h4>
                    <p>{place.formatted_address}</p>
                  </div>
                </InfoWindow>
              );
            });

            return marker;
          });

          setMarkers(newMarkers);
        }
      });
    }
  };

  return (
    <div style={{ height: "100vh", width: "100vw", position: "relative" }}>
      <input
        ref={searchInputRef}
        type="text"
        placeholder="Search for a location"
        style={{
          boxSizing: "border-box",
          border: "1px solid transparent",
          width: "240px",
          height: "32px",
          padding: "0 12px",
          borderRadius: "3px",
          boxShadow: "0 2px 6px rgba(0, 0, 0, 0.3)",
          fontSize: "14px",
          outline: "none",
          textOverflow: "ellipsis",
          position: "absolute",
          top: "10px",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 1,
        }}
      />
      <button
        onClick={getCurrentLocation}
        style={{
          backgroundColor: "#fff",
          border: "1px solid #ccc",
          borderRadius: "3px",
          padding: "5px 10px",
          cursor: "pointer",
          position: "absolute",
          bottom: "10px",
          right: "10px",
          zIndex: 1,
        }}
      >
        <img
          src="https://maps.gstatic.com/mapfiles/api-3/images/mapcnt6.png"
          alt="Current Location"
          style={{ width: "24px", height: "24px" }}
        />
      </button>
      <div ref={mapRef} style={{ height: "100%", width: "100%" }}>
        <GoogleMap
          mapContainerStyle={{ height: "100%", width: "100%" }}
          zoom={8}
          center={currentLocation || { lat: -34.397, lng: 150.644 }}
          onLoad={(map) => setMap(map)}
        >
          {markers.map((marker, index) => (
            <Marker
              key={index}
              position={{
                lat: marker.getPosition().lat(),
                lng: marker.getPosition().lng(),
              }}
              icon={marker.icon}
              onClick={() => {
                setInfoWindow(
                  <InfoWindow position={marker.getPosition()}>
                    <div>
                      <h4>{marker.getTitle()}</h4>
                      <p>{marker.get("formatted_address")}</p>
                    </div>
                  </InfoWindow>
                );
              }}
            />
          ))}
          {infoWindow}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapComponent;
