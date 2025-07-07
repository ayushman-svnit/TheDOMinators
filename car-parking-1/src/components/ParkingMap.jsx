import { useState, useEffect } from "react";
import {
  GoogleMap,
  Marker,
  InfoWindow,
  useLoadScript,
} from "@react-google-maps/api";

// Map configuration
const mapContainerStyle = {
  width: "100%",
  height: "70vh",
  borderRadius: "8px",
  boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
};

const defaultCenter = {
  lat: 37.7749,
  lng: -122.4194,
};

// Mock data
const mockParkingSpots = [
  {
    id: 1,
    name: "Downtown Parking",
    address: "123 Main St, San Francisco, CA",
    available: 5,
    total: 20,
    rate: 5.5,
    position: { lat: 37.7749, lng: -122.4194 },
    features: ["24/7 Access", "EV Charging"],
  },
  {
    id: 2,
    name: "City Center Garage",
    address: "456 Market St, San Francisco, CA",
    available: 3,
    total: 15,
    rate: 7.0,
    position: { lat: 37.7859, lng: -122.4064 },
    features: ["Covered Parking"],
  },
  {
    id: 3,
    name: "Harbor Parking",
    address: "789 Beach Rd, San Francisco, CA",
    available: 8,
    total: 25,
    rate: 6.25,
    position: { lat: 37.7699, lng: -122.4294 },
    features: ["Near Pier", "Valet Available"],
  },
];

const libraries = ["places"];

export default function ParkingMap({ searchQuery = "", maxRate = null }) {
  // Google Maps API loading
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  // State management
  const [selectedSpot, setSelectedSpot] = useState(null);
  const [parkingSpots, setParkingSpots] = useState([]);
  const [center, setCenter] = useState(defaultCenter);
  const [userLocation, setUserLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Geolocation
  useEffect(() => {
    if (navigator.geolocation) {
      setIsLoading(true);
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setUserLocation(userPos);
          setCenter(userPos);
          setLocationError(null);
          setIsLoading(false);
        },
        (error) => {
          console.warn("Location error:", error.message);
          setLocationError(error.message);
          setCenter(defaultCenter);
          setIsLoading(false);
        },
        { timeout: 10000 }
      );
    } else {
      setIsLoading(false);
    }
  }, []);

  // Search and filter functionality
  useEffect(() => {
    const filtered = mockParkingSpots.filter((spot) => {
      const matchesSearch = searchQuery
        ? spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          spot.address.toLowerCase().includes(searchQuery.toLowerCase())
        : true;

      const matchesRate = maxRate ? spot.rate <= maxRate : true;

      return matchesSearch && matchesRate;
    });

    setParkingSpots(filtered);
  }, [searchQuery, maxRate]);

  const handleReserve = (spotId) => {
    alert(`Reservation requested for spot ${spotId}`);
    setSelectedSpot(null);
  };

  if (loadError) {
    return (
      <div className="error">
        Error loading Google Maps. Please refresh the page.
      </div>
    );
  }

  if (!isLoaded) {
    return <div className="loading">Loading maps...</div>;
  }

  return (
    <div className="parking-map-container">
      {locationError && (
        <div className="location-warning">
          Location service: {locationError}. Showing default map view.
        </div>
      )}

      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={14}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
          fullscreenControl: false,
        }}
      >
        {/* User location marker */}
        {userLocation && (
          <Marker
            position={userLocation}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: "#4285F4",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "white",
            }}
          />
        )}

        {/* Parking spots */}
        {parkingSpots.map((spot) => (
          <Marker
            key={spot.id}
            position={spot.position}
            onClick={() => setSelectedSpot(spot)}
            icon={{
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 8,
              fillColor: spot.available > 0 ? "#2ECC71" : "#E74C3C",
              fillOpacity: 1,
              strokeWeight: 2,
              strokeColor: "white",
            }}
          />
        ))}

        {/* Selected spot info */}
        {selectedSpot && (
          <InfoWindow
            position={selectedSpot.position}
            onCloseClick={() => setSelectedSpot(null)}
          >
            <div className="info-window">
              <h3>{selectedSpot.name}</h3>
              <p className="address">{selectedSpot.address}</p>
              <div className="availability">
                <span
                  className={`status ${
                    selectedSpot.available > 0 ? "available" : "full"
                  }`}
                >
                  {selectedSpot.available > 0
                    ? `${selectedSpot.available}/${selectedSpot.total} available`
                    : "FULL"}
                </span>
                <span className="rate">${selectedSpot.rate}/hr</span>
              </div>
              {selectedSpot.features.length > 0 && (
                <div className="features">
                  <p>Features:</p>
                  <ul>
                    {selectedSpot.features.map((feature, i) => (
                      <li key={i}>{feature}</li>
                    ))}
                  </ul>
                </div>
              )}
              <button
                className={`reserve-btn ${
                  selectedSpot.available <= 0 ? "disabled" : ""
                }`}
                onClick={() => handleReserve(selectedSpot.id)}
                disabled={selectedSpot.available <= 0}
              >
                {selectedSpot.available > 0 ? "Reserve Now" : "Unavailable"}
              </button>
            </div>
          </InfoWindow>
        )}
      </GoogleMap>

      {/* Debug info (remove in production) */}
      <div className="debug-info">
        <p>Showing {parkingSpots.length} spots matching:</p>
        <p>
          Search: "{searchQuery}" | Max rate: {maxRate || "Any"}
        </p>
      </div>
    </div>
  );
}
