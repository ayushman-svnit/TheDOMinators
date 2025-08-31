import { createTheme } from '@mui/material/styles';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#006bd6', // Deep GitHub blue
      light: '#3d8eff',
      dark: '#0052a3',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#00FFA3', // Keeping the electric green for accents
      light: '#66FFC2',
      dark: '#00CC82',
      contrastText: '#1e1e1e',
    },
    background: {
      default: '#0d1117', // GitHub dark background
      paper: '#161a20', // Card background
    },
    text: {
      primary: '#e6edf3', // Brighter text for readability
      secondary: '#9ba3b4', // Muted text as requested
      disabled: '#6e7681',
    },
    success: {
      main: '#2ea043', // GitHub success green
    },
    error: {
      main: '#f85149', // GitHub error red
    },
    warning: {
      main: '#d29922', // GitHub warning yellow
    },
    divider: '#30363d', // GitHub border color
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: { 
      color: '#006bd6', 
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h2: { 
      color: '#006bd6',
      fontWeight: 600,
      fontSize: '2rem',
    },
    body1: {
      color: '#9ba3b4', // Muted text color
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @keyframes pulse {
          0% {
            box-shadow: 0 0 0 0 rgba(0, 107, 214, 0.7);
          }
          70% {
            box-shadow: 0 0 0 10px rgba(0, 107, 214, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(0, 107, 214, 0);
          }
        }
      `,
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
        background: 'linear-gradient(135deg, #007bff 0%, #0052a3 100%)',
        animation: 'pulse 2s infinite',
        '&:hover': {
          animation: 'none', // Stop pulse on hover
          transform: 'translateY(-2px)',
          boxShadow: '0 4px 12px rgba(0, 107, 214, 0.3)',
        },
      },
        root: {
          borderRadius: '6px',
          fontWeight: 600,
          textTransform: 'none',
          padding: '6px 16px',
          transition: 'all 0.2s ease',
          fontSize: '0.875rem',
        },
        
        containedSecondary: {
          backgroundColor: '#238636', // GitHub button green
          '&:hover': {
            backgroundColor: '#2ea043',
            transform: 'translateY(-1px)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          backgroundColor: '#161a20',
          border: '1px solid #30363d',
          boxShadow: '0 1px 0 rgba(27, 31, 36, 0.04)',
          transition: 'border-color 0.2s ease',
          '&:hover': {
            borderColor: '#006bd6',
            boxShadow: '0 4px 12px rgba(0, 107, 214, 0.15)',
          },
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#161a20',
          borderBottom: '1px solid #30363d',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: '#30363d',
        },
      },
    },
  },
});

export default darkTheme;