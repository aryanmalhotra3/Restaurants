import React, { useState } from 'react';
import { Button, Grid } from '@mui/material';
import AddDataForm from './AddDataForm';
import ShowData from './ShowData';
import './style.css';

function RestaurantDetails() {
  const [showAddData, setShowAddData] = useState(false);
  const [showData, setShowData] = useState(false);

  const handleAddDataClick = () => {
    setShowAddData(true);
    setShowData(false);
  };

  const handleShowDataClick = () => {
    setShowAddData(false);
    setShowData(true);
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} align="center">
        <Button variant="contained" color="primary" onClick={handleAddDataClick}>
          Add Data
        </Button>{' '}
        <Button variant="contained" color="primary" onClick={handleShowDataClick}>
          Show Data
        </Button>
      </Grid>
      <Grid item xs={12} align="center">
        {showAddData && <AddDataForm onClose={() => setShowAddData(false)} />}
        {showData && <ShowData />}
      </Grid>
    </Grid>
  );
}

export default RestaurantDetails;
