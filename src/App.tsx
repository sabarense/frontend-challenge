import React, { useState } from 'react';
import { Container, Typography, Box, Paper, IconButton, Toolbar, AppBar, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AlunoForm from './components/AlunoForm';
import AlunoList from './components/AlunoList';
import { WbSunny as SunIcon, School as SchoolIcon } from '@mui/icons-material';

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
      background: {
        default: darkMode ? '#1c1c1c' : '#f5f5f5',
        paper: darkMode ? '#262626' : '#ffffff',
      },
      text: {
        primary: darkMode ? '#e0e0e0' : '#333',
      },
    },
    typography: {
      fontFamily: 'Poppins, Roboto, sans-serif',
    },
    shape: {
      borderRadius: 12,
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="fixed" sx={{ background: darkMode ? '#333' : '#f9f9f9', paddingY: 1 }}>
        <Toolbar>
          <IconButton
            onClick={() => setDarkMode(!darkMode)}
            color="primary"
            aria-label="Toggle theme"
            edge="start"
            sx={{ padding: 0 }} 
          >
            <SunIcon sx={{ fontSize: 28 }} /> 
          </IconButton>
          <Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'center', color: darkMode ? '#f5f5f5' : '#333' }}>
            Sistema de Gerenciamento de Notas e Frequência
          </Typography>
        </Toolbar>
      </AppBar>
      <Toolbar />
      <Container maxWidth="lg" sx={{ paddingY: 4, marginTop: 3 }}>
        
        <Box display="flex" justifyContent="center" mb={4}>
          <SchoolIcon color="primary" sx={{ fontSize: 80 }} />
        </Box>

        <Paper
          sx={{
            padding: 1,  
            marginBottom: 4,
            backgroundColor: darkMode ? '#3c3c3c' : '#f9f9f9', 
            color: darkMode ? '#e0e0e0' : '#333',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <AlunoForm />
        </Paper>

        <Paper sx={{
          padding: 3,
          backgroundColor: darkMode ? '#3c3c3c' : '#f9f9f9', 
          color: darkMode ? '#e0e0e0' : '#333',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
        }}>
          <AlunoList />
        </Paper>
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: darkMode ? '#333' : '#f5f5f5', padding: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: darkMode ? '#e0e0e0' : '#333' }}>
          © 2025 Sistema de Gerenciamento de Notas e Frequência. Todos os direitos reservados.
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default App;
