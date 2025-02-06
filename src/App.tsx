import React from 'react';
import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import AlunoForm from './components/AlunoForm';
import AlunoList from './components/AlunoList';

const App = () => {
  return (
    <Container maxWidth="lg" sx={{ paddingY: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Sistema de Gerenciamento de Notas e Frequência
        </Typography>
      </Box>

      <Paper sx={{ padding: 3, marginBottom: 4 }}>
        <AlunoForm />
      </Paper>

      <Paper sx={{ padding: 3 }}>
        <AlunoList />
      </Paper>
    </Container>
  );
};

export default App;
