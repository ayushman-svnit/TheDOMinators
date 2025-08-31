import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import MapComponent from './MapComponent';
import { useState, useEffect } from 'react';

function AdminBusStopMarkers() {
  const [busStops, setStops] = useState([]);
  useEffect(() => {
    fetch("/api/admin/stops")
      .then(res => res.json())
      .then(setStops);
  }, []);
  const [focus, setFocus] = useState({ lat: 21.1702, lng: 72.8311 });

  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '90vw', overflow: 'hidden' }}>
      <MapComponent busStops={busStops} focus={focus} />
      <Sidebar busStops={busStops} setStops={setStops} focus={focus} setFocus={setFocus} />
    </Box>
  );
}

export default AdminBusStopMarkers;