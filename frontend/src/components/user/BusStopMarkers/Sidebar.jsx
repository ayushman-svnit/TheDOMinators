import { useState, useEffect } from 'react';
import { 
  Box,
  InputBase,
  IconButton,
  Paper
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AnimatedList from '../../animatedList/AnimatedList';
import "./Sidebar.css";

function Sidebar({ busData, setData }) {
  const [query, setQuery] = useState("");
  const [filteredBusNumber, setFilteredBusNumber] = useState(busData);

  useEffect(() => {
    setFilteredBusNumber(busData);
  }, [busData]);

  const handleSearch = (text) => {
    setQuery(text);
    const filtered = busData.filter((busNumber) =>
      busNumber.bus_number.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredBusNumber(filtered);
  };

  return (
    <div className="sidebar">
      <Paper 
        component="div"
        sx={{
          p: '4px 8px',
          display: 'flex',
          alignItems: 'center',
          width: '90%',
          margin: '16px auto',
          backgroundColor: '#161a20',
          border: '1px solid #30363d',
          borderRadius: '20px',
          '&:hover': {
            borderColor: '#3f80ea'
          }
        }}
      >
        <IconButton sx={{ p: '10px', color: '#3f80ea' }}>
          <SearchIcon />
        </IconButton>
        <InputBase
          sx={{ 
            ml: 1, 
            flex: 1,
            color: '#e6edf3',
            '& input::placeholder': {
              color: '#6e7681',
              opacity: 1
            }
          }}
          placeholder="Search Bus Number..."
          value={query}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </Paper>
      <AnimatedList items={filteredBusNumber} />
    </div>
  );
}

export default Sidebar;

