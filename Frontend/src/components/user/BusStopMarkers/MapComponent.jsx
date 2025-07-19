import { useEffect, useRef } from 'react';
import "./MapComponent.css"


const MapComponent = ({ busStops }) => {
  const mapRef = useRef(null); // to store map instance
  useEffect(() => {

    function initMap() {
      const map = new window.google.maps.Map(document.getElementById("map"), {
        center: { lat: 21.1702, lng: 72.8311 },
        zoom: 14,
      });

      mapRef.current = map;

      // 🔵 Add My Location button manually
      const locationButton = document.createElement("button");
      locationButton.innerHTML = `<img class="location" src="/My_location.png" alt="My Location" />`;
      locationButton.classList.add("custom-location-button");
      map.controls[window.google.maps.ControlPosition.RIGHT_BOTTOM].push(locationButton);

      // 🔵 On button click: center map on user location
      locationButton.addEventListener("click", () => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              };

              // Add marker or move it
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
            () => {
              alert("Geolocation permission denied.");
            }
          );
        } else {
          alert("Geolocation is not supported by your browser.");
        }
      });

      // 🚏 Bus stop markers
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
        ${stop.timetable.map((bus) => `
          <div class="bus-item">
            <div class="bus-icon"><img src="./bus.svg" alt="Bus" width="16" height="16"></div>
            <div class="bus-badge badge-blue">${bus.bus_number}</div>
            <div class="bus-details">
              <div class="destination">${bus.destination}</div>
            </div>
            <div class="time">${bus.time}</div>
          </div>
        `).join('')}
      </div>
    `;

        const infoWindow = new window.google.maps.InfoWindow({ content: infoContent });

        let closeTimeout;

        function cancelClose() {
          if (closeTimeout) {
            clearTimeout(closeTimeout);
            closeTimeout = null;
          }
        }

        function scheduleClose() {
          closeTimeout = setTimeout(() => infoWindow.close(), 200);
        }

        marker.addListener("mouseover", () => {
          cancelClose();
          infoWindow.open(map, marker);
          window.google.maps.event.addListenerOnce(infoWindow, 'domready', () => {
            const container = document.querySelector('.brts-container');
            if (container) {
              container.addEventListener('mouseenter', cancelClose);
              container.addEventListener('mouseleave', scheduleClose);
            }
          });
        });

        marker.addListener("mouseout", scheduleClose);
      });
    }
    if (window.google && window.google.maps) {
      initMap();

    } else {
      console.error("Google Maps API not loaded");
    }
  }, [busStops]);
  return (
    <div id="map" />
  );
};

export default MapComponent;
