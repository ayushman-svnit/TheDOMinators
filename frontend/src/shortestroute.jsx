

import React from 'react';
import './shortestroute.css'; 
import { useState, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker,  TrafficLayer } from '@react-google-maps/api';

const libraries = ['places'];
const locationIQKey = import.meta.env.VITE_LOCATIONIQ_KEY; // replaced with env file keys

function ShortestRoute() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // replaced with env file keys
    libraries,
  });

  const [mode, setMode] = useState('source');
  const [source, setSource] = useState({ coords: null, address: '' });
  const [destination, setDestination] = useState({ coords: null, address: '' });
  const [routeInfo, setRouteInfo] = useState(null);
  const [routePath, setRoutePath] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 });
  const [isGeocoding, setIsGeocoding] = useState(false);
  const polylineRef = useRef(null);
  const sourceAutocompleteRef = useRef(null);
  const destAutocompleteRef = useRef(null);
  const mapRef = useRef(null);

  // Initialize autocomplete
  useEffect(() => {
    if (isLoaded && window.google) {
      sourceAutocompleteRef.current = new window.google.maps.places.Autocomplete(
        document.getElementById("sourceInput")
      );
      sourceAutocompleteRef.current.addListener('place_changed', () => {
        const place = sourceAutocompleteRef.current.getPlace();
        if (place.geometry) {
          handleSetMarker('source', place.geometry.location.lat(), place.geometry.location.lng());
          setSource({
            coords: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
            address: place.formatted_address
          });
        }
      });

      destAutocompleteRef.current = new window.google.maps.places.Autocomplete(
        document.getElementById("destinationInput")
      );
      destAutocompleteRef.current.addListener('place_changed', () => {
        const place = destAutocompleteRef.current.getPlace();
        if (place.geometry) {
          handleSetMarker('destination', place.geometry.location.lat(), place.geometry.location.lng());
          setDestination({
            coords: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
            address: place.formatted_address
          });
        }
      });
    }
  }, [isLoaded]);

  // Geocode coordinates to address
  const geocodeCoords = (coords, type) => {
    if (!window.google || !coords) return;
    
    setIsGeocoding(true);
    const geocoder = new window.google.maps.Geocoder();
    
    geocoder.geocode({ location: coords }, (results, status) => {
      setIsGeocoding(false);
      if (status === 'OK' && results[0]) {
        if (type === 'source') {
          setSource(prev => ({ ...prev, address: results[0].formatted_address }));
        } else {
          setDestination(prev => ({ ...prev, address: results[0].formatted_address }));
        }
      }
    });
  };

  const handleSetMarker = (type, lat, lng) => {
    const position = { lat, lng };
    setMapCenter(position);
    
    if (type === 'source') {
      setSource({ coords: position, address: '' });
      geocodeCoords(position, 'source');
    } else {
      setDestination({ coords: position, address: '' });
      geocodeCoords(position, 'destination');
    }
    
    // Clear route when markers change
    // setRoutePath([]);
    setRouteInfo(null);
  };

  const handleMapClick = (e) => {
    handleSetMarker(mode, e.latLng.lat(), e.latLng.lng());
  };

  const handleMarkerDrag = (e, type) => {
    const position = { lat: e.latLng.lat(), lng: e.latLng.lng() };
    
    if (type === 'source') {
      setSource(prev => ({ ...prev, coords: position }));
      geocodeCoords(position, 'source');
    } else {
      setDestination(prev => ({ ...prev, coords: position }));
      geocodeCoords(position, 'destination');
    }
    
    // Clear route when markers change
    // setRoutePath([]);
    setRouteInfo(null);
  };

  const useCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        handleSetMarker('source', latitude, longitude);
      });
    } else {
      alert("Geolocation not supported");
    }
  };

  const getRoute = async () => {
    if (!source.coords || !destination.coords) {
      alert("Please select both source and destination.");
      return;
    }

    // Remove old polyline if exists
    if (polylineRef.current) {
      polylineRef.current.setMap(null);
      polylineRef.current = null;
    }

    setRouteInfo(null);

    const start = `${source.coords.lng},${source.coords.lat}`;
    const end = `${destination.coords.lng},${destination.coords.lat}`;
    const url = `https://us1.locationiq.com/v1/directions/driving/${start};${end}?key=${locationIQKey}&steps=true&alternatives=false&geometries=geojson&overview=full`;

    try {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      const route = data.routes[0];
      const coords = route.geometry.coordinates.map(c => ({ lat: c[1], lng: c[0] }));

      setRouteInfo({
        distance: route.distance,
        duration: route.duration
      });
      setRoutePath(coords);

      // Draw new polyline imperatively
      if (window.google && mapRef.current) {
        polylineRef.current = new window.google.maps.Polyline({
          path: coords,
          strokeColor: "#007bff",
          strokeOpacity: 0.8,
          strokeWeight: 6,
          map: mapRef.current,
        });
      }

      // Fit map to route bounds
      if (mapRef.current && window.google) {
        const bounds = new window.google.maps.LatLngBounds();
        coords.forEach(p => bounds.extend(p));
        mapRef.current.fitBounds(bounds);
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching route - check console for details.");
    }
  };

  if (!isLoaded) return (
    <div className="loading">
      <div className="spinner"></div>
      <p>Loading Map...</p>
    </div>
  );

  return (
    <div className="app-container">
      <header>
        <h1>Smart Route Finder</h1>
        <p>Find the best routes with real-time traffic information</p>
      </header>

      <div className="controls-container">
        <div className="mode-toggle">
          <label className={mode === 'source' ? 'active' : ''}>
            <input 
              type="radio" 
              name="mode" 
              value="source" 
              checked={mode === 'source'}
              onChange={() => setMode('source')} 
            /> 
            Set Source
          </label>
          <label className={mode === 'destination' ? 'active' : ''}>
            <input 
              type="radio" 
              name="mode" 
              value="destination" 
              checked={mode === 'destination'}
              onChange={() => setMode('destination')} 
            /> 
            Set Destination
          </label>
        </div>

        <div className="input-group">
          <label htmlFor="sourceInput">Source Location:</label>
          <div className="input-wrapper">
            <input
              id="sourceInput"
              type="text"
              placeholder="Enter source location"
              value={source.address}
              onChange={(e) => setSource({...source, address: e.target.value})}
            />
            <button className="location-btn" onClick={useCurrentLocation} title="Use current location">
              <span role="img" aria-label="location">📍</span>
            </button>
          </div>
        </div>

        <div className="input-group">
          <label htmlFor="destinationInput">Destination Location:</label>
          <input
            id="destinationInput"
            type="text"
            placeholder="Enter destination location"
            value={destination.address}
            onChange={(e) => setDestination({...destination, address: e.target.value})}
          />
        </div>

        <button className="route-btn" onClick={getRoute}>
          Get Route 🚗
        </button>
      </div>

      <div className="map-container">
        <GoogleMap
  mapContainerClassName="map"
  center={mapCenter}
  zoom={13}
  onClick={handleMapClick}
  onLoad={map => mapRef.current = map}
>
  <TrafficLayer />
  {source.coords && (
    <Marker
      position={source.coords}
      label="S"
      draggable
      onDragEnd={(e) => handleMarkerDrag(e, 'source')}
    />
  )}
  {destination.coords && (
    <Marker
      position={destination.coords}
      label="D"
      draggable
      onDragEnd={(e) => handleMarkerDrag(e, 'destination')}
    />
  )}
  
</GoogleMap>
      </div>

      <div className="info-container">
        {isGeocoding ? (
          <div className="geocoding-notice">
            <div className="loader"></div>
            <p>Looking up address...</p>
          </div>
        ) : routeInfo ? (
          <div className="route-info">
            <h3>Route Information</h3>
            <div className="route-stats">
              <div className="stat">
                <div className="stat-value">{(routeInfo.distance/1000).toFixed(2)} km</div>
                <div className="stat-label">Distance</div>
              </div>
              <div className="stat">
                <div className="stat-value">{(routeInfo.duration/60).toFixed(0)} mins</div>
                <div className="stat-label">Duration</div>
              </div>
              <div className="stat">
                <div className="stat-value">{(routeInfo.distance/1609).toFixed(2)} mi</div>
                <div className="stat-label">Miles</div>
              </div>
            </div>
          </div>
        ) : (
          <div className="instructions">
            <p>Set source and destination to find the best route</p>
            <div className="tip">
              <span>💡 Tip:</span> Click on the map to set locations, or use the search fields above
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ShortestRoute;