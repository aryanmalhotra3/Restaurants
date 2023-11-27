import React, { useState, useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog,DialogTitle, DialogContent, DialogActions, } from '@mui/material';
import EditDataForm from './EditDataForm';

function ShowData() {
    const [data, setData] = useState([]);
    const [showEditForm, setShowEditForm] = useState(false);
    const [selectedData, setSelectedData] = useState(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteClick = (id) => {
        setSelectedItemId(id);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        fetch(`http://localhost:3001/delete/${selectedItemId}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(data => {
                console.log(data.message);
                setDeleteDialogOpen(false);
                fetchData();
            })
            .catch(error => console.error('Error deleting data:', error));
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
    };

    const fetchData = () => {
        fetch('http://localhost:3001/showdata')
            .then(response => response.json())
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    };

    const handleEditClick = (rowData) => {
        setSelectedData(rowData);
        setShowEditForm(true);
    };

    const handleEditFormClose = () => {
        setShowEditForm(false);
        fetchData();
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell>Address</TableCell>
                        <TableCell>Contact</TableCell>
                        <TableCell>Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.id}</TableCell>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{row.address}</TableCell>
                            <TableCell>{row.contact}</TableCell>
                            <TableCell>
                                <Button variant="outlined" color="primary" onClick={() => handleEditClick(row)}>
                                    Edit
                                </Button>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={() => handleDeleteClick(row.id)}
                                >
                                    Delete
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {showEditForm && selectedData && (
                <Dialog open={showEditForm} onClose={handleEditFormClose}>
                    <EditDataForm data={selectedData} onClose={handleEditFormClose} />
                </Dialog>
            )}

            <Dialog open={deleteDialogOpen} onClose={handleDeleteCancel}>
                <DialogTitle>Confirm Deletion</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this item?
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} color="primary">
                        No
                    </Button>
                    <Button onClick={handleDeleteConfirm} color="secondary">
                        Yes
                    </Button>
                </DialogActions>
            </Dialog>
        </TableContainer>


    );
}

export default ShowData;
