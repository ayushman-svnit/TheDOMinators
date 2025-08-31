// import { useEffect, useRef } from 'react';
// import { Box, Typography } from '@mui/material';
// import "./MapComponent.css";

// const MapComponent = ({ busStops }) => {
//   const mapRef = useRef(null);

//   useEffect(() => {
//     function initMap() {
//       const map = new window.google.maps.Map(document.getElementById("Map"), {
//         center: { lat: 21.1702, lng: 72.8311 },
//         zoom: 14,
//         disableDefaultUI: false, // Keep default map styling
//       });

//       mapRef.current = map;

//       // My Location Button
//       const locationButton = document.createElement("button");
//       locationButton.innerHTML = `<img class="location" src="/My_location.png" alt="My Location" />`;
//       locationButton.classList.add("custom-location-button");
//       map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);

//       locationButton.addEventListener("click", () => {
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(
//             (position) => {
//               const pos = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude,
//               };
//               new window.google.maps.Marker({
//                 position: pos,
//                 map,
//                 title: "You are here",
//                 icon: {
//                   path: window.google.maps.SymbolPath.CIRCLE,
//                   scale: 8,
//                   fillColor: "#4285F4",
//                   fillOpacity: 1,
//                   strokeWeight: 2,
//                   strokeColor: "white",
//                 },
//               });
//               map.setCenter(pos);
//               map.setZoom(15);
//             },
//             () => {
//               alert("Geolocation permission denied.");
//             }
//           );
//         } else {
//           alert("Geolocation is not supported by your browser.");
//         }
//       });

//       // 🚏 Bus stop markers
//       busStops.forEach((stop) => {
//         const marker = new window.google.maps.Marker({
//           position: { lat: stop.lat, lng: stop.lng },
//           map,
//           title: stop.name,
//           icon: {
//             url: "./bus_stop_icon.png",
//             scaledSize: new window.google.maps.Size(32, 32),
//           },
//         });

//         const infoContent = `
//       <div class="brts-container">
//         <div class="title">${stop.name}</div>
//         ${stop.timetable.map((bus) => `
//           <div class="bus-item">
//             <div class="bus-icon"><img src="./bus.svg" alt="Bus" width="16" height="16"></div>
//             <div class="bus-badge badge-blue">${bus.bus_number}</div>
//             <div class="bus-details">
//               <div class="destination">${bus.destination}</div>
//             </div>
//             <div class="time">${bus.time}</div>
//           </div>
//         `).join('')}
//       </div>
//     `;

//         const infoWindow = new window.google.maps.InfoWindow({ content: infoContent });

//         let closeTimeout;

//         function cancelClose() {
//           if (closeTimeout) {
//             clearTimeout(closeTimeout);
//             closeTimeout = null;
//           }
//         }

//         function scheduleClose() {
//           closeTimeout = setTimeout(() => infoWindow.close(), 200);
//         }

//         marker.addListener("mouseover", () => {
//           cancelClose();
//           infoWindow.open(map, marker);
//           window.google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
//             const container = document.querySelector('.brts-container');
//             if (container) {
//               container.addEventListener('mouseenter', cancelClose);
//               container.addEventListener('mouseleave', scheduleClose);
//             }
//           });
//         });

//         marker.addListener("mouseout", scheduleClose);
//       });
//     }

//     if (window.google && window.google.maps) {
//       initMap();
//     } else {
//       console.error("Google Maps API not loaded");
//     }
//   }, [busStops]);

//   return (
//     <Box sx={{ width: '70vw', height: '80vh' }}>
//       {/* Heading Section with Blue Accent */}
//       <Box sx={{
//         padding: '16px 30px 12px',
//         backgroundColor: '#161a20',
//         position: 'relative',
//         '&::after': {
//           content: '""',
//           position: 'absolute',
//           bottom: 0,
//           left: '30px',
//           width: '100px',
//           height: '5px',
//           backgroundColor: '#006bd6',
//           borderRadius: '3px'
//         }
//       }}>
//         <Typography
//           variant="h1"
//           sx={{
//             color: '#e6edf3',
//             fontWeight: 600,
//             letterSpacing: '0.5px'
//           }}
//         >
//           Busstop details
//         </Typography>
//       </Box>

//       {/* Map Container */}
//       <Box id="Map"/>
//     </Box>
//   );
// };

// export default MapComponent;

import { useEffect, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import { useJsApiLoader } from '@react-google-maps/api';
import "./MapComponent.css";

const libraries = []; // add 'places' if you need autocomplete later

const MapComponent = ({ busStops }) => {
  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  useEffect(() => {
    if (!isLoaded || loadError) return;

    function initMap() {
      const map = new window.google.maps.Map(mapContainerRef.current, {
        center: { lat: 21.1702, lng: 72.8311 },
        zoom: 14,
        disableDefaultUI: false,
      });
      mapRef.current = map;

      // My Location Button
      const locationButton = document.createElement("button");
      locationButton.innerHTML = `<img class="location" src="/My_location.png" alt="My Location" />`;
      locationButton.classList.add("custom-location-button");
      map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);

      locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };
              new window.google.maps.Marker({
                position: pos,
                map,
                title: "You are here",
                icon: {
                  path: window.google.maps.SymbolPath.CIRCLE,
                  scale: 8,
                  fillColor: "#4285F4",
                  fillOpacity: 1,
                  strokeWeight: 2,
                  strokeColor: "white",
                },
              });
              map.setCenter(pos);
              map.setZoom(15);
            },
            () => alert("Geolocation permission denied.")
          );
        } else {
          alert("Geolocation is not supported by your browser.");
        }
      });

      // Bus stop markers
      busStops.forEach((stop) => {
        const marker = new window.google.maps.Marker({
          position: { lat: stop.lat, lng: stop.lng },
          map,
          title: stop.name,
          icon: {
            url: "./bus_stop_icon.png",
            scaledSize: new window.google.maps.Size(32, 32),
          },
        });

        const infoContent = `
          <div class="brts-container">
            <div class="title">${stop.name}</div>
            ${stop.timetable
              .map(
                (bus) => `
                <div class="bus-item">
                  <div class="bus-icon"><img src="./bus.svg" alt="Bus" width="16" height="16"></div>
                  <div class="bus-badge badge-blue">${bus.bus_number}</div>
                  <div class="bus-details">
                    <div class="destination">${bus.destination}</div>
                  </div>
                  <div class="time">${bus.time}</div>
                </div>
              `
              )
              .join("")}
          </div>
        `;

        const infoWindow = new window.google.maps.InfoWindow({ content: infoContent });

        let closeTimeout;
        function cancelClose() {
          if (closeTimeout) clearTimeout(closeTimeout);
        }
        function scheduleClose() {
          closeTimeout = setTimeout(() => infoWindow.close(), 200);
        }

        marker.addListener("mouseover", () => {
          cancelClose();
          infoWindow.open(map, marker);
          window.google.maps.event.addListenerOnce(infoWindow, "domready", () => {
            const container = document.querySelector(".brts-container");
            if (container) {
              container.addEventListener("mouseenter", cancelClose);
              container.addEventListener("mouseleave", scheduleClose);
            }
          });
        });

        marker.addListener("mouseout", scheduleClose);
      });
    }

    initMap();
  }, [isLoaded, loadError, busStops]);

  if (loadError) return <div>Failed to load Google Maps</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <Box sx={{ width: '70vw', height: '80vh' }}>
      {/* Heading Section with Blue Accent */}
      <Box
        sx={{
          padding: '16px 30px 12px',
          backgroundColor: '#161a20',
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '30px',
            width: '100px',
            height: '5px',
            backgroundColor: '#006bd6',
            borderRadius: '3px',
          },
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: '#e6edf3',
            fontWeight: 600,
            letterSpacing: '0.5px',
          }}
        >
          Busstop details
        </Typography>
      </Box>

      {/* Map Container */}
      <Box ref={mapContainerRef} id="Map" sx={{ width: '100%', height: '100%' }} />
    </Box>
  );
};

export default MapComponent;


// import { useEffect, useRef } from 'react';
// import "./MapComponent.css"


// const MapComponent = ({ busStops }) => {
//   const mapRef = useRef(null); // to store map instance
//   useEffect(() => {

//     function initMap() {
//       const map = new window.google.maps.Map(document.getElementById("map"), {
//         center: { lat: 21.1702, lng: 72.8311 },
//         zoom: 14,
//       });

//       mapRef.current = map;

//       // 🔵 Add My Location button manually
//       const locationButton = document.createElement("button");
//       locationButton.innerHTML = `<img class="location" src="/My_location.png" alt="My Location" />`;
//       locationButton.classList.add("custom-location-button");
//       map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);

//       // 🔵 On button click: center map on user location
//       locationButton.addEventListener("click", () => {
//         if (navigator.geolocation) {
//           navigator.geolocation.getCurrentPosition(
//             (position) => {
//               const pos = {
//                 lat: position.coords.latitude,
//                 lng: position.coords.longitude,
//               };

//               // Add marker or move it
//               new window.google.maps.Marker({
//                 position: pos,
//                 map,
//                 title: "You are here",
//                 icon: {
//                   path: window.google.maps.SymbolPath.CIRCLE,
//                   scale: 8,
//                   fillColor: "#4285F4",
//                   fillOpacity: 1,
//                   strokeWeight: 2,
//                   strokeColor: "white",
//                 },
//               });

//               map.setCenter(pos);
//               map.setZoom(15);
//             },
//             () => {
//               alert("Geolocation permission denied.");
//             }
//           );
//         } else {
//           alert("Geolocation is not supported by your browser.");
//         }
//       });

//   // 🚏 Bus stop markers
//   busStops.forEach((stop) => {
//     const marker = new window.google.maps.Marker({
//       position: { lat: stop.lat, lng: stop.lng },
//       map,
//       title: stop.name,
//       icon: {
//         url: "./bus_stop_icon.png",
//         scaledSize: new window.google.maps.Size(32, 32),
//       },
//     });

//     const infoContent = `
//   <div class="brts-container">
//     <div class="title">${stop.name}</div>
//     ${stop.timetable.map((bus) => `
//       <div class="bus-item">
//         <div class="bus-icon"><img src="./bus.svg" alt="Bus" width="16" height="16"></div>
//         <div class="bus-badge badge-blue">${bus.bus_number}</div>
//         <div class="bus-details">
//           <div class="destination">${bus.destination}</div>
//         </div>
//         <div class="time">${bus.time}</div>
//       </div>
//     `).join('')}
//   </div>
// `;

//     const infoWindow = new window.google.maps.InfoWindow({ content: infoContent });

//     let closeTimeout;

//     function cancelClose() {
//       if (closeTimeout) {
//         clearTimeout(closeTimeout);
//         closeTimeout = null;
//       }
//     }

//     function scheduleClose() {
//       closeTimeout = setTimeout(() => infoWindow.close(), 200);
//     }

//     marker.addListener("mouseover", () => {
//       cancelClose();
//       infoWindow.open(map, marker);
//       window.google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
//         const container = document.querySelector('.brts-container');
//         if (container) {
//           container.addEventListener('mouseenter', cancelClose);
//           container.addEventListener('mouseleave', scheduleClose);
//         }
//       });
//     });

//     marker.addListener("mouseout", scheduleClose);
//   });
//     }
//     if (window.google && window.google.maps) {
//       initMap();

//     } else {
//       console.error("Google Maps API not loaded");
//     }
//   }, [busStops]);
//   return (
//     <div id="map" />
//   );
// };

// export default MapComponent;
