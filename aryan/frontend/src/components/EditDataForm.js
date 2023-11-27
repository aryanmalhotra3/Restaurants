// EditDataForm.js
import React, { useState,} from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';

function EditDataForm({ data, onClose }) {
  const [formData, setFormData] = useState({
    id: data.id,
    name: data.name,
    address: data.address,
    contact: data.contact
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
    fetch(`http://localhost:3001/edit/${data.id}`, {
      method: 'PUT',
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
        console.error('Error updating data:', error);
      });
  };

  const handleConfirmationClose = () => {
    setShowConfirmation(false);
    onClose();
  };

  return (
    <>
      <DialogTitle>Edit Data</DialogTitle>
      <DialogContent>
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
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit}>Submit</Button>
      </DialogActions>

      <Dialog open={showConfirmation} onClose={handleConfirmationClose}>
        <DialogTitle>Confirmation</DialogTitle>
        <DialogContent>
          <div>Data updated successfully!</div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmationClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditDataForm;
