import MapComponent from './MapComponent'
import Sidebar from './Sidebar'
import { useState, useEffect } from 'react';
import "./BusStopMarkers.css"

function BusStopMarkers() {
  const [busStops, setBusStops] = useState([]);      // ✅ reactive state
  const [busData, setData] = useState([]);            // ✅ data used in sidebar/map

  useEffect(() => {
    fetch("/api/admin/stops")
      .then(res => res.json())
      .then(data => setBusStops(data))
      .catch(err => console.error("Fetch error:", err));
  }, []);

  useEffect(() => {
    if (!busStops.length) return;

    const transformed = transformBusStops(busStops);
    setData(transformed);
  }, [busStops]);

  function transformBusStops(busStops) {
    const busDataMap = {};

    busStops.forEach((stop) => {
      stop.timetable.forEach(({ bus_number }) => {
        if (!busDataMap[bus_number]) {
          busDataMap[bus_number] = [];
        }

        const alreadyExists = busDataMap[bus_number].some(
          (coord) => coord.lat === stop.lat && coord.lng === stop.lng
        );

        if (!alreadyExists) {
          busDataMap[bus_number].push({
            name: stop.name,
            lat: stop.lat,
            lng: stop.lng,
          });
        }
      });
    });

    return Object.entries(busDataMap).map(([bus_number, coordinates]) => ({
      bus_number,
      coordinates,
    }));
  }

  return (
    <div className="layout-container">
      <MapComponent busStops={busStops} />
      <Sidebar busData={busData} setData={setData} />
    </div>
  );
}

export default BusStopMarkers;
