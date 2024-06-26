import React, { useState} from "react";
import axios from "axios";
import { Button, Dialog, IconButton, Box, Container, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import CustomerList from "../../components/customer/customerList";
import AddCustomer from "../../components/customer/addCustomer";


function CustomerPage() {

    const [showCustomerList, setShowCustomerList] = useState(false);
    const [showCustomerListDialog, setShowCustomerListDialog] = useState(false);
    const [showAddCustomerDialog, setShowAddCustomerDialog] = useState(false);
    const apiUrl = process.env.REACT_APP_HOSTED_BACKEND;




    const handleCustomerAdded = () => {
        window.alert('Customer added successfully');
        if (showCustomerList) {
            fetchCustomers(); // Fetch updated customer list after adding a customer
            setShowCustomerListDialog(false); // Hide the customer list dialog
            setShowAddCustomerDialog(false); // Hide the add customer dialog
            setShowCustomerList(false); // Hide the customer list
        } else {
            setShowCustomerList(true); // Show the customer list after adding a customer
        }
    };

    const handleOpenCustomerList = () => {
        setShowCustomerListDialog(true);
    };

    const handleCloseCustomerList = () => {
        setShowCustomerListDialog(false);
    };

    const handleOpenAddCustomer = () => {
        setShowAddCustomerDialog(true);
    };

    const handleCloseAddCustomer = () => {
        setShowAddCustomerDialog(false);
    };


    const fetchCustomers = () => {
        axios.get(`${apiUrl}/customers`)
        .then((response) => {
            setShowCustomerList(response.data);
            setShowCustomerList(true);
        })

        .catch(error => console.error('Error fetching customers:', error));
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>
                Customer Management
            </Typography>
            <Box display="flex" mt={2} gap={2}>
            <Button 
            variant="contained" onClick={handleOpenCustomerList}>
                Show Customer List
            </Button>
            <Dialog open={showCustomerListDialog} onClose={handleCloseCustomerList} fullWidth maxWidth="lg">
                <IconButton
                    onClick={handleCloseCustomerList}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <CustomerList />
            </Dialog>
            <Button
            sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }} 
            variant="contained" onClick={handleOpenAddCustomer}>
                Add a Customer
            </Button>
            <Dialog open={showAddCustomerDialog} onClose={handleCloseAddCustomer} fullWidth maxWidth="lg">
                <IconButton
                    onClick={handleCloseAddCustomer}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <AddCustomer onCustomerAdded={handleCustomerAdded} />
            </Dialog>
            </Box>
        </Container>
    );
}

export default CustomerPage;
