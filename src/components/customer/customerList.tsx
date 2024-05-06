import React, { useState, useEffect } from "react";
import axios from "axios";
import RentedBooksPopup from "./rentedBookPopup";

interface BorrowedBook {
  id: string;
  title: string;
}

// Define the customer type based on the expected structure of customer data
interface Customer {
  _id: string;
  name: string;
  contact: string;
  address: string;
  note: string;
  late_fee: number;
  rented_books: BorrowedBook[];
  // add other properties as needed
}

const CustomerList: React.FC = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
  const [showRentedBooks, setShowRentedBooks] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get("/api/customers")
      .then((response) => {
        console.log("Customers:", response.data);
        setCustomers(response.data);
      })
      .catch((error) => console.error("Error:", error));
  };

  const toggleRentedBooks = (customerId: string) => {
    setShowRentedBooks(showRentedBooks === customerId ? null : customerId);
  };

  const handleDelete = (id: string) => {
    axios.delete(`/api/customers/${id}`).then((response) => {
      console.log("Customer deleted successfully:", response.data);
      window.alert("Customer deleted successfully");
      fetchCustomers();
    });
  };

  const handleEdit = (customer: Customer) => {
    setEditCustomer(customer);
  };

  const handleUpdate = () => {
    if (editCustomer) {
      axios
        .put(`/api/customers/update/${editCustomer._id}`, {
          contact: editCustomer.contact,
          address: editCustomer.address,
          note: editCustomer.note,
          late_fee: editCustomer.late_fee,
        })
        .then((response) => {
          console.log(response.data);
          window.alert("Customer updated successfully");
          fetchCustomers(); // Update the list after successful update
          setEditCustomer(null); // Reset the edit customer state
        })
        .catch((error) => {
          // Handle error more effectively; Axios wraps the error response in error.response
          const message = error.response
            ? `Error: ${error.response.status} ${error.response.statusText}`
            : error.message;
          setError(message);
        });
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editCustomer) {
      setEditCustomer({
        ...editCustomer,
        [name]: value,
      });
    }
  };

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Contact</th>
            <th>Address</th>
            <th>Note</th>
            <th>Late Fee</th>
            <th>Rented Books</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer._id.slice(-6)}</td>
              <td>{customer.name}</td>
              <td>
                {editCustomer && editCustomer._id === customer._id ? (
                  <input
                    type="text"
                    name="contact"
                    value={editCustomer.contact}
                    onChange={handleInputChange}
                  />
                ) : (
                  customer.contact
                )}
              </td>
              <td>
                {editCustomer && editCustomer._id === customer._id ? (
                  <input
                    type="text"
                    name="address"
                    value={editCustomer.address}
                    onChange={handleInputChange}
                  />
                ) : (
                  customer.address
                )}
              </td>
              <td>
                {editCustomer && editCustomer._id === customer._id ? (
                  <input
                    type="text"
                    name="note"
                    value={editCustomer.note}
                    onChange={handleInputChange}
                  />
                ) : (
                  customer.note
                )}
              </td>
              <td>
                {editCustomer && editCustomer._id === customer._id ? (
                  <input
                    type="number"
                    name="late_fee"
                    value={editCustomer.late_fee}
                    onChange={handleInputChange}
                  />
                ) : (
                  customer.late_fee
                )}
              </td>

              <td>
                <button onClick={() => toggleRentedBooks(customer._id)}>
                  {showRentedBooks === customer._id
                    ? "Hide Rented Books"
                    : "Show Rented Books"}
                </button>
              </td>

              <td>
                {editCustomer && editCustomer._id === customer._id ? (
                  <button onClick={handleUpdate}>Save</button>
                ) : (
                  <button onClick={() => handleEdit(customer)}>Edit</button>
                )}
                <button onClick={() => handleDelete(customer._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        {showRentedBooks && (
            <RentedBooksPopup
                customer={
                    customers.find(
                        (customer) => customer._id === showRentedBooks
                    ) || { _id: "", rented_books: [], name: "" }
                }
                onClose={() => setShowRentedBooks(null)}
            />
        )}
      </table>
    </div>
  );
};

export default CustomerList;
