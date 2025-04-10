import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, GlobalStyles } from '@mui/material';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Wishlist from './pages/Wishlist';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      primary: {
        main: darkMode ? '#90caf9' : '#1976d2',
        light: darkMode ? '#64b5f6' : '#42a5f5',
        dark: darkMode ? '#42a5f5' : '#1565c0',
      },
      background: {
        default: darkMode ? '#0a1929' : '#f5f5f5',
        paper: darkMode ? 'rgba(18, 18, 18, 0.8)' : 'rgba(255, 255, 255, 0.8)',
      },
    },
    shape: {
      borderRadius: 16,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            backdropFilter: 'blur(10px)',
            transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
            '&:hover': {
              transform: 'translateY(-8px)',
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: darkMode 
              ? 'linear-gradient(45deg, rgba(18, 18, 18, 0.9), rgba(10, 25, 41, 0.9))'
              : 'linear-gradient(45deg, rgba(25, 118, 210, 0.9), rgba(66, 165, 245, 0.9))',
            backdropFilter: 'blur(10px)',
            borderBottom: `1px solid ${darkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            textTransform: 'none',
          },
        },
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    localStorage.setItem('darkMode', JSON.stringify(!darkMode));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles 
        styles={{
          body: {
            background: darkMode
              ? 'radial-gradient(circle at 50% -20%, #1a237e 0%, #0a1929 50%)'
              : 'radial-gradient(circle at 50% -20%, #bbdefb 0%, #f5f5f5 50%)',
            backgroundAttachment: 'fixed',
          },
          '::-webkit-scrollbar': {
            width: '8px',
          },
          '::-webkit-scrollbar-track': {
            background: darkMode ? '#1e1e1e' : '#f1f1f1',
          },
          '::-webkit-scrollbar-thumb': {
            background: darkMode ? '#555' : '#888',
            borderRadius: '4px',
            '&:hover': {
              background: darkMode ? '#666' : '#999',
            },
          },
        }}
      />
      <BrowserRouter>
        <Navigation darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;