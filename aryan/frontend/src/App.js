import React from 'react';
import { Container, Typography } from '@mui/material';
import RestaurantDetails from './components/RestaurantDetails';

function App() {
  return (
    <Container>
      <Typography variant="h3" align="center" gutterBottom>
        Restaurant Details
      </Typography>
      <RestaurantDetails />
    </Container>
  );
}

export default App;
