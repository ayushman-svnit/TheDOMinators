import React, { useState, useEffect, useRef } from 'react';
import { GoogleMap, useJsApiLoader, Marker, Polyline, TrafficLayer } from '@react-google-maps/api';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import './Combii.css'; // Import your CSS styles

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const libraries = ['places', 'geometry'];
const GOOGLE_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;

// Transport modes with pricing
const transportModes = [
  { name: "Walking", mode: "foot-walking", baseFare: 0, perKm: 0, perMin: 0, color: "#4CAF50" },
  { name: "Cycling", mode: "cycling-regular", baseFare: 0, perKm: 1, perMin: 0, color: "#2196F3" },
  { name: "Bike", mode: "driving-motorcycle", baseFare: 5, perKm: 3, perMin: 0.5, color: "#FF9800" },
  { name: "Car", mode: "driving-car", baseFare: 20, perKm: 10, perMin: 1, color: "#F44336" }
];

function Combii() {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_API_KEY,
    libraries,
  });

  const [mapMode, setMapMode] = useState('source'); // 'source' or 'destination'
  const [source, setSource] = useState({ coords: null, address: '' });
  const [destination, setDestination] = useState({ coords: null, address: '' });
  const [routes, setRoutes] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 28.6139, lng: 77.2090 });
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [isLoadingRoutes, setIsLoadingRoutes] = useState(false);
  
  const sourceAutocompleteRef = useRef(null);
  const destAutocompleteRef = useRef(null);
  const mapRef = useRef(null);
  const polylinesRef = useRef([]);
  const infoWindowsRef = useRef([]);

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
    
    // Clear routes when markers change
    setRoutes([]);
    setSelectedRoute(null);
    clearRoutes();
  };

  const handleMapClick = (e) => {
  handleSetMarker(mapMode, e.latLng.lat(), e.latLng.lng());
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

  // Calculate transport fares based on distance and duration
  const calculateFares = (distance, duration) => {
    return transportModes.map(mode => {
      const distanceKm = distance / 1000;
      const durationMin = duration / 60;
      
      const fare = mode.baseFare + 
                  (distanceKm * mode.perKm) + 
                  (durationMin * mode.perMin);
      
      return {
        ...mode,
        distance: distanceKm,
        duration: durationMin,
        fare: parseFloat(fare.toFixed(2))
      };
    });
  };

  const clearRoutes = () => {
    // Clear existing polylines and info windows
    polylinesRef.current.forEach(polyline => polyline.setMap(null));
    infoWindowsRef.current.forEach(infoWindow => infoWindow.close());
    polylinesRef.current = [];
    infoWindowsRef.current = [];
  };

  const getRoutes = async () => {
    if (!source.coords || !destination.coords) {
      alert("Please select both source and destination.");
      return;
    }

    // Clear previous routes
    clearRoutes();
    setRoutes([]);
    setSelectedRoute(null);
    setIsLoadingRoutes(true);

    try {
      const directionsService = new window.google.maps.DirectionsService();
      
      directionsService.route({
        origin: source.coords,
        destination: destination.coords,
        travelMode: window.google.maps.TravelMode.DRIVING,
        provideRouteAlternatives: true
      }, (result, status) => {
        setIsLoadingRoutes(false);
        
        if (status !== window.google.maps.DirectionsStatus.OK || !result.routes) {
          alert("Could not fetch directions");
          return;
        }

        let shortestIndex = 0;
        let shortestDistance = Infinity;

        const processedRoutes = result.routes.map((route, index) => {
          const leg = route.legs[0];
          const distance = leg.distance.value;
          const duration = leg.duration.value;

          if (distance < shortestDistance) {
            shortestDistance = distance;
            shortestIndex = index;
          }

          // Calculate fares for all transport modes for this route
          const fares = calculateFares(distance, duration);

          return {
            index,
            distance: leg.distance,
            duration: leg.duration,
            path: window.google.maps.geometry.encoding.decodePath(route.overview_polyline),
            fares,
            isShortest: index === shortestIndex
          };
        });

        // Now set the isShortest flag
        processedRoutes.forEach((route, index) => {
          route.isShortest = (index === shortestIndex);
        });

        setRoutes(processedRoutes);
        setSelectedRoute(processedRoutes[0]);
        
        // Draw routes on the map
        processedRoutes.forEach((route, index) => {
          const isShortest = route.isShortest;
          const path = route.path;
          
          // Create polyline
          const polyline = new window.google.maps.Polyline({
            path,
            strokeColor: isShortest ? "#FF0000" : "#" + Math.floor(Math.random() * 0x777777 + 0x333333).toString(16).padStart(6, '0'),
            strokeOpacity: 0.8,
            strokeWeight: isShortest ? 6 : 4,
            map: mapRef.current
          });
          
          polylinesRef.current.push(polyline);
          
          // Create info window
          const midPoint = path[Math.floor(path.length / 2)];
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div class="info-window">
                <b>Route ${index + 1}</b><br>
                Distance: ${route.distance.text}<br>
                Duration: ${route.duration.text}
              </div>
            `,
            position: midPoint
          });
          
          infoWindowsRef.current.push(infoWindow);
          
          // Add click listener to show info window
          polyline.addListener("click", () => {
            infoWindowsRef.current.forEach(iw => iw.close());
            infoWindow.open(mapRef.current);
            setSelectedRoute(route);
          });
        });

        // Fit map to bounds
        const bounds = new window.google.maps.LatLngBounds();
        bounds.extend(source.coords);
        bounds.extend(destination.coords);
        mapRef.current.fitBounds(bounds);
      });
    } catch (err) {
      setIsLoadingRoutes(false);
      console.error(err);
      alert("Error fetching routes - check console for details.");
    }
  };

  // Prepare data for the fare comparison chart
  const getChartData = (fares) => {
    if (!fares || fares.length === 0) return null;
    
    return {
      labels: fares.map(mode => mode.name),
      datasets: [
        {
          label: 'Fare (USD)',
          data: fares.map(mode => mode.fare),
          backgroundColor: fares.map(mode => mode.color),
          borderColor: fares.map(mode => mode.color),
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Transport Fare Comparison',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `$${context.parsed.y}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Fare (USD)'
        }
      }
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
        <h1>Multi-Route Fare Calculator</h1>
        <p>Compare different routes and their fare estimates</p>
      </header>

      <div className="controls-container">
        <div className="map-mode-toggle">
          <h3>Map Interaction Mode:</h3>
  <div className="mode-radio1-group">
    <label className={`mode-radio1-label ${mapMode === 'source' ? 'selected' : ''}`}>
      <input
        type="radio"
        name="mapMode"
        value="source"
        checked={mapMode === 'source'}
        onChange={() => setMapMode('source')}
      />
      <span className="custom-radio1"></span>
      Set Source
    </label>
    <label className={`mode-radio1-label ${mapMode === 'destination' ? 'selected' : ''}`}>
      <input
        type="radio"
        name="mapMode"
        value="destination"
        checked={mapMode === 'destination'}
        onChange={() => setMapMode('destination')}
      />
      <span className="custom-radio1"></span>
      Set Destination
    </label>
  </div>
  <p className="tip">Click on the map to set {mapMode === 'source' ? 'source' : 'destination'} location</p>
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

        <div className="button-group">
          <button className="route-btn" onClick={getRoutes}>
            Get Routes & Calculate Fares 🚗
          </button>
        </div>
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

      {isLoadingRoutes && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p>Finding the best routes...</p>
        </div>
      )}

      <div className="routes-container">
        {routes.length > 0 && (
          <div className="route-selector">
            <h3>Select a Route:</h3>
            <div className="route-buttons">
              {routes.map((route) => (
                <button
                  key={route.index}
                  className={`route-btn ${selectedRoute?.index === route.index ? 'active' : ''}`}
                  onClick={() => setSelectedRoute(route)}
                >
                  Route {route.index + 1}
                  {route.isShortest && <span className="shortest-badge">Shortest</span>}
                </button>
              ))}
            </div>
          </div>
        )}

        {selectedRoute && (
          <div className="route-details">
            <div className="route-header">
              <h3>Route {selectedRoute.index + 1} Details</h3>
              {selectedRoute.isShortest && (
                <div className="shortest-route">Shortest Route</div>
              )}
            </div>
            
            <div className="route-stats">
              <div className="stat">
                <div className="stat-value">{selectedRoute.distance.text}</div>
                <div className="stat-label">Distance</div>
              </div>
              <div className="stat">
                <div className="stat-value">{selectedRoute.duration.text}</div>
                <div className="stat-label">Duration</div>
              </div>
            </div>
            
            <div className="fare-comparison">
              <div className="chart-container">
                <Bar data={getChartData(selectedRoute.fares)} options={chartOptions} />
              </div>
              
              <div className="fare-table-container">
                <table className="fare-table">
                  <thead>
                    <tr>
                      <th>Transport Mode</th>
                      <th>Base Fare</th>
                      <th>Per Km</th>
                      <th>Per Min</th>
                      <th>Total Fare</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedRoute.fares.map((mode, index) => (
                      <tr key={index}>
                        <td>
                          <div className="mode-indicator" style={{ backgroundColor: mode.color }}></div>
                          {mode.name}
                        </td>
                        <td>${mode.baseFare.toFixed(2)}</td>
                        <td>${mode.perKm.toFixed(2)}</td>
                        <td>${mode.perMin.toFixed(2)}</td>
                        <td className="total-fare">${mode.fare.toFixed(2)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {!selectedRoute && !isLoadingRoutes && (
          <div className="instructions">
            <p>Set source and destination to find routes and fare estimates</p>
            <div className="tip">
              <span>💡 Tip:</span> Click on a route on the map to see detailed fare information
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Combii;