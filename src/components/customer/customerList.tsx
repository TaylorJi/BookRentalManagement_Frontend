import React, { useState, useEffect } from "react";
import axios from "axios";
import RentedBooksPopup from "./rentedBookPopup";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Typography
} from '@mui/material';

interface BorrowedBook {
  id: string;
  title: string;
}

interface Customer {
  _id: string;
  name: string;
  contact: string;
  address: string;
  note: string;
  late_fee: number;
  rented_books: BorrowedBook[];
}

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [showRentedBooks, setShowRentedBooks] = useState<string | null>(null);
  const apiUrl = process.env.REACT_APP_HOSTED_BACKEND;

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    console.log(apiUrl)
    axios
      .get(`${apiUrl}/customers`)
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        const errorMessage = error.response ? `${error.response.status} ${error.response.statusText}` : error.message;
        setError(errorMessage);
      });
  };

  const handleDelete = (id: string) => {
    axios.delete(`${apiUrl}/customers/${id}`)
      .then(() => {
        alert("Customer deleted successfully");
        fetchCustomers();
      })
      .catch((error) => setError(error.message));
  };

  const handleEdit = (customer: Customer) => {
    setEditCustomer(customer);
  };

  const handleUpdate = () => {
    if (editCustomer) {
      axios
        .put(`${apiUrl}/customers/update/${editCustomer._id}`, editCustomer)
        .then(() => {
          alert("Customer updated successfully");
          fetchCustomers();
          setEditCustomer(null);
        })
        .catch((error) => setError(error.message));
    }
  };

  const toggleRentedBooks = (customerId: string) => {
        setShowRentedBooks(showRentedBooks === customerId ? null : customerId);
      };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editCustomer) {
      setEditCustomer({ ...editCustomer, [name]: value });
    }
  };

  if (error) {
    return <Typography color="error">{`Error: ${error}`}</Typography>;
  }

  return (
    <Paper sx={{ maxWidth: '100%', overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Id</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Contact</TableCell>
            <TableCell>Address</TableCell>
            <TableCell>Note</TableCell>
            <TableCell>Late Fee</TableCell>
            <TableCell>Rented Books</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer._id}>
              <TableCell>{customer._id.slice(-6)}</TableCell>
              <TableCell>{customer.name}</TableCell>
              <TableCell>
                {editCustomer && editCustomer._id === customer._id ? (
                  <TextField
                    size="small"
                    name="contact"
                    value={editCustomer.contact}
                    onChange={handleInputChange}
                  />
                ) : (
                  customer.contact
                )}
              </TableCell>
              <TableCell>
                {editCustomer && editCustomer._id === customer._id ? (
                  <TextField
                    size="small"
                    name="address"
                    value={editCustomer.address}
                    onChange={handleInputChange}
                  />
                ) : (
                  customer.address
                )}
              </TableCell>
              <TableCell>
                {editCustomer && editCustomer._id === customer._id ? (
                  <TextField
                    size="small"
                    name="note"
                    value={editCustomer.note}
                    onChange={handleInputChange}
                  />
                ) : (
                  customer.note
                )}
              </TableCell>
              <TableCell>
                {editCustomer && editCustomer._id === customer._id ? (
                  <TextField
                    type="number"
                    size="small"
                    name="late_fee"
                    value={editCustomer.late_fee}
                    onChange={handleInputChange}
                  />
                ) : (
                  customer.late_fee
                )}
              </TableCell>
              <TableCell>
                <Button variant="outlined" onClick={() => toggleRentedBooks(customer._id)}>
                  {showRentedBooks === customer._id ? "Hide" : "Show"} Rented Books
                </Button>
              </TableCell>
              <TableCell>
                {editCustomer && editCustomer._id === customer._id ? (
                  <Button onClick={handleUpdate} color="primary">Save</Button>
                ) : (
                  <Button onClick={() => handleEdit(customer)} color="primary">Edit</Button>
                )}
                <Button onClick={() => handleDelete(customer._id)} color="error">Delete</Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {showRentedBooks && (
        <RentedBooksPopup
          customer={customers.find((customer) => customer._id === showRentedBooks) || { _id: "", rented_books: [], name: "" }}
          onClose={() => setShowRentedBooks(null)}
        />
      )}
    </Paper>
  );
};

export default CustomerList;
