import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

function AddDataForm({ onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    contact: ''
  });

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    fetch('http://localhost:3001/savedata', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => response.json())
      .then(data => {
        setShowConfirmation(true);
      })
      .catch(error => {
        console.error('Error submitting data:', error);
      });
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    onClose();
  };

  return (
    <>
      <div>
        <TextField
          label="Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Address"
          name="address"
          value={formData.address}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <DialogActions>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </div>
      <Dialog open={showConfirmation} onClose={handleConfirmationClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <div>Data submitted successfully!</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddDataForm;
