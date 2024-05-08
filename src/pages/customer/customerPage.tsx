import React, { useState} from "react";
import axios from "axios";
import { Button, Dialog, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

import CustomerList from "../../components/customer/customerList";
import AddCustomer from "../../components/customer/addCustomer";


function CustomerPage() {
    const [open, setOpen] = useState(false);

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [showCustomerList, setShowCustomerList] = useState(false);
    const [showAddCustomer, setShowAddCustomer] = useState(false);


    const handleCustomerAdded = () => {
        window.alert('Customer added successfully');
        if (showCustomerList) {
            fetchCustomers(); // Fetch updated customer list after adding a customer
            setShowCustomerList(false); // Hide the customer list
        } else {
            setShowCustomerList(true); // Show the customer list after adding a customer
        }
        setShowAddCustomer(false); // Hide the add customer form after successful addition
    };

    const fetchCustomers = () => {
        axios.get('/api/customers')
        .then((response) => {
            setShowCustomerList(response.data);
            setShowCustomerList(true);
        })

        .catch(error => console.error('Error fetching customers:', error));
    };

    return (
        <div>
            <h1>Customer Management</h1>
            <Button 
            variant="contained" onClick={handleOpen}>
                Show Customer List
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
                <IconButton
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <CustomerList />
            </Dialog>
            <Button
            sx={{ backgroundColor: 'green', '&:hover': { backgroundColor: 'darkgreen' } }} 
            variant="contained" onClick={handleOpen}>
                Add a Customer
            </Button>
            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="lg">
                <IconButton
                    onClick={handleClose}
                    sx={{ position: 'absolute', right: 8, top: 8 }}
                >
                    <CloseIcon />
                </IconButton>
                <AddCustomer onCustomerAdded={handleCustomerAdded} />
            </Dialog>
        </div>
    );
}

export default CustomerPage;
