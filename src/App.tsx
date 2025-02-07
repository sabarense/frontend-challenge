import React from 'react';
import { Container, Typography, Box, Paper, IconButton, Toolbar, AppBar, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import AlunoForm from './components/AlunoForm';
import AlunoList from './components/AlunoList';
import { School as SchoolIcon } from '@mui/icons-material';


const App = () => {
  const theme = createTheme({
    palette: {
      mode: 'light', 
      background: {
        default: '#e3f2fd',
        paper: '#ffffff',
      },
      text: {
        primary: '#333',
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
      <AppBar position="fixed" sx={{ background: '#f9f9f9', paddingY: 1 }}>
        <Toolbar>
          <Typography variant="h5" sx={{ flexGrow: 1, textAlign: 'center', color: '#333'  }}>
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
            backgroundColor: '#f9f9f9',
            color: '#333',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
          }}
        >
          <AlunoForm />
        </Paper>

        <Paper sx={{
          padding: 3,
          backgroundColor: '#f9f9f9',
          color: '#333',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        }}>
          <AlunoList />
        </Paper>
      </Container>

      {/* Footer */}
      <Box sx={{ backgroundColor: '#f5f5f5', padding: 2, textAlign: 'center' }}>
        <Typography variant="body2" sx={{ color: '#333' }}>
          © 2025 Sistema de Gerenciamento de Notas e Frequência. Todos os direitos reservados.
        </Typography>
      </Box>
    </ThemeProvider>
  );
};

export default App;
