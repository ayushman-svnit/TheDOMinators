// import { useEffect, useRef } from 'react';
// import "./MapComponent.css"


// const MapComponent = ({ busStops, focus }) => {
//   const mapRef = useRef(null); // to store map instance
//   useEffect(() => {

//     function initMap() {
//       const map = new window.google.maps.Map(document.getElementById("map"), {
//         center: { lat: 21.1702, lng: 72.8311 },
//         zoom: 14,
//       });
//       mapRef.current = map; // 🔑 Store map instance
//       busStops.forEach((stop, index) => {
//         const marker = new window.google.maps.Marker({
//           position: { lat: stop.lat, lng: stop.lng },
//           map,
//           title: stop.name,
//           icon: {
//             url: "/bus_stop_icon.png",
//             scaledSize: new window.google.maps.Size(32, 32),
//           },
//         });

//         const infoContent = `
//           <div class="brts-container">
//             <div class="Title">${stop.name}</div>
//             ${stop.timetable.map((bus) => `
//               <div class="bus-item">
//                 <div class="bus-icon"><img src="/bus.svg" alt="Bus" width="16" height="16"></div>
//                 <div class="bus-badge badge-blue">${bus.bus_number}</div>
//                 <div class="bus-details">
//                   <div class="destination">${bus.destination}</div>
//                 </div>
//                 <div class="time">${bus.time}</div>
//               </div>
//             `).join('')}
//           </div>
//         `;

//         const infoWindow = new window.google.maps.InfoWindow({
//           content: infoContent,
//         });

//         let closeTimeout;

//         function cancelClose() {
//           if (closeTimeout) {
//             clearTimeout(closeTimeout);
//             closeTimeout = null;
//           }
//         }

//         function scheduleClose() {
//           closeTimeout = setTimeout(() => {
//             infoWindow.close();
//           }, 200);
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
//   useEffect(() => {
//     if (focus && mapRef.current && focus.lat && focus.lng) {
//       mapRef.current.setCenter({ lat: focus.lat, lng: focus.lng });
//       mapRef.current.setZoom(20);
//     }
//   }, [focus]);
//   return (
//     <div id="map" />
//   );
// };

// export default MapComponent;

import { useEffect, useRef } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';
import "./MapComponent.css";

const libraries = []; // add ['places'] if you need autocomplete here

const MapComponent = ({ busStops, focus }) => {
  const mapRef = useRef(null); // to store map instance
  const mapContainerRef = useRef(null); // div reference

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // from .env
    libraries,
  });

  // init map + markers once loaded
  useEffect(() => {
    if (!isLoaded || loadError) return;

    const map = new window.google.maps.Map(mapContainerRef.current, {
      center: { lat: 21.1702, lng: 72.8311 },
      zoom: 14,
    });
    mapRef.current = map;

    busStops.forEach((stop) => {
      const marker = new window.google.maps.Marker({
        position: { lat: stop.lat, lng: stop.lng },
        map,
        title: stop.name,
        icon: {
          url: "/bus_stop_icon.png",
          scaledSize: new window.google.maps.Size(32, 32),
        },
      });

      const infoContent = `
        <div class="brts-container">
          <div class="Title">${stop.name}</div>
          ${stop.timetable
            .map(
              (bus) => `
            <div class="bus-item">
              <div class="bus-icon"><img src="/bus.svg" alt="Bus" width="16" height="16"></div>
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

      const infoWindow = new window.google.maps.InfoWindow({
        content: infoContent,
      });

      let closeTimeout;

      function cancelClose() {
        if (closeTimeout) {
          clearTimeout(closeTimeout);
          closeTimeout = null;
        }
      }

      function scheduleClose() {
        closeTimeout = setTimeout(() => {
          infoWindow.close();
        }, 200);
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
  }, [isLoaded, loadError, busStops]);

  // center map on focus change
  useEffect(() => {
    if (focus && mapRef.current && focus.lat && focus.lng) {
      mapRef.current.setCenter({ lat: focus.lat, lng: focus.lng });
      mapRef.current.setZoom(20);
    }
  }, [focus]);

  if (loadError) return <div>Failed to load Google Maps</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return <div ref={mapContainerRef} id="map" />;
};

export default MapComponent;
