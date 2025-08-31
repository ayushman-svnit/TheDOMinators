import React from "react";
import { 
  TextField, 
  Button, 
  InputAdornment,
  FormControl,
  Box,
  Slide,
  Fade
} from "@mui/material";
import { Search as SearchIcon, DirectionsCar as CarIcon } from "@mui/icons-material";
import { styled } from "@mui/material/styles";

const SearchForm = styled('form')(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  alignItems: 'center',
  width: '100%',
  maxWidth: '800px',
  margin: '0 auto 32px auto',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    gap: theme.spacing(1),
  }
}));

const SearchInput = styled(TextField)(({ theme }) => ({
  flexGrow: 1,
  '& .MuiOutlinedInput-root': {
    borderRadius: '50px',
    backgroundColor: theme.palette.background.paper,
    transition: 'all 0.3s ease',
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
      borderWidth: 2,
    },
  },
}));

const SearchButton = styled(Button)(({ theme }) => ({
  borderRadius: '50px',
  padding: '12px 24px',
  fontWeight: 600,
  flexShrink: 0,
  textTransform: 'none',
  boxShadow: theme.shadows[2],
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
  [theme.breakpoints.down('sm')]: {
    width: '100%',
  }
}));

export default function Search({ search, handleSearch }) {
  const handleChange = (e) => {
    handleSearch(e.target.value);
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(search);
  };

  return (
    <Fade in timeout={800}>
      <Box sx={{ px: 2 }}>
        <SearchForm onSubmit={handleSubmit}>
          <SearchInput
            fullWidth
            variant="outlined"
            placeholder="Search by parking name or location..."
            value={search}
            onChange={handleChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <Slide direction="left" in timeout={1000}>
            <SearchButton
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              endIcon={<CarIcon />}
            >
              Find Parking
            </SearchButton>
          </Slide>
        </SearchForm>
      </Box>
    </Fade>
  );
}