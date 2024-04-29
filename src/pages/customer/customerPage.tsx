import React, { useState} from "react";
import axios from "axios";
import CustomerList from "../../components/customer/customerList";
import AddCustomer from "../../components/customer/addCustomer";
import { set } from "mongoose";


function CustomerPage() {
    const [showCustomerList, setShowCustomerList] = useState(false);
    const [showAddCustomer, setShowAddCustomer] = useState(false);


    const toggleCustomerList = () => {
        setShowCustomerList(!showCustomerList);
    };

    const toggleAddCustomer = () => {
        setShowAddCustomer(!showAddCustomer);
    };

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
            <button onClick={toggleCustomerList}>{showCustomerList ? 'Hide Customer List' : 'Show Customer List'}</button>
            {showCustomerList && <CustomerList />} {/* Pass customers prop to CustomerList */}
            <button onClick={toggleAddCustomer}>{showAddCustomer ? 'Hide Customer Addition' : 'Add a Customer'}</button>
            {showAddCustomer && <AddCustomer onCustomerAdded={handleCustomerAdded} />}
        </div>
    );
}

export default CustomerPage;
