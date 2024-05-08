// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import RentedBooksPopup from "./rentedBookPopup";

// interface BorrowedBook {
//   id: string;
//   title: string;
// }

// // Define the customer type based on the expected structure of customer data
// interface Customer {
//   _id: string;
//   name: string;
//   contact: string;
//   address: string;
//   note: string;
//   late_fee: number;
//   rented_books: BorrowedBook[];
//   // add other properties as needed
// }

// const CustomerList: React.FC = () => {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [editCustomer, setEditCustomer] = useState<Customer | null>(null);
//   const [showRentedBooks, setShowRentedBooks] = useState<string | null>(null);

//   useEffect(() => {
//     fetchCustomers();
//   }, []);

//   const fetchCustomers = () => {
//     axios
//       .get("/api/customers")
//       .then((response) => {
//         console.log("Customers:", response.data);
//         setCustomers(response.data);
//       })
//       .catch((error) => console.error("Error:", error));
//   };

//   const toggleRentedBooks = (customerId: string) => {
//     setShowRentedBooks(showRentedBooks === customerId ? null : customerId);
//   };

//   const handleDelete = (id: string) => {
//     axios.delete(`/api/customers/${id}`).then((response) => {
//       console.log("Customer deleted successfully:", response.data);
//       window.alert("Customer deleted successfully");
//       fetchCustomers();
//     });
//   };

//   const handleEdit = (customer: Customer) => {
//     setEditCustomer(customer);
//   };

//   const handleUpdate = () => {
//     if (editCustomer) {
//       axios
//         .put(`/api/customers/update/${editCustomer._id}`, {
//           contact: editCustomer.contact,
//           address: editCustomer.address,
//           note: editCustomer.note,
//           late_fee: editCustomer.late_fee,
//         })
//         .then((response) => {
//           console.log(response.data);
//           window.alert("Customer updated successfully");
//           fetchCustomers(); // Update the list after successful update
//           setEditCustomer(null); // Reset the edit customer state
//         })
//         .catch((error) => {
//           // Handle error more effectively; Axios wraps the error response in error.response
//           const message = error.response
//             ? `Error: ${error.response.status} ${error.response.statusText}`
//             : error.message;
//           setError(message);
//         });
//     }
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     if (editCustomer) {
//       setEditCustomer({
//         ...editCustomer,
//         [name]: value,
//       });
//     }
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <table>
//         <thead>
//           <tr>
//             <th>Id</th>
//             <th>Name</th>
//             <th>Contact</th>
//             <th>Address</th>
//             <th>Note</th>
//             <th>Late Fee</th>
//             <th>Rented Books</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {customers.map((customer) => (
//             <tr key={customer._id}>
//               <td>{customer._id.slice(-6)}</td>
//               <td>{customer.name}</td>
//               <td>
//                 {editCustomer && editCustomer._id === customer._id ? (
//                   <input
//                     type="text"
//                     name="contact"
//                     value={editCustomer.contact}
//                     onChange={handleInputChange}
//                   />
//                 ) : (
//                   customer.contact
//                 )}
//               </td>
//               <td>
//                 {editCustomer && editCustomer._id === customer._id ? (
//                   <input
//                     type="text"
//                     name="address"
//                     value={editCustomer.address}
//                     onChange={handleInputChange}
//                   />
//                 ) : (
//                   customer.address
//                 )}
//               </td>
//               <td>
//                 {editCustomer && editCustomer._id === customer._id ? (
//                   <input
//                     type="text"
//                     name="note"
//                     value={editCustomer.note}
//                     onChange={handleInputChange}
//                   />
//                 ) : (
//                   customer.note
//                 )}
//               </td>
//               <td>
//                 {editCustomer && editCustomer._id === customer._id ? (
//                   <input
//                     type="number"
//                     name="late_fee"
//                     value={editCustomer.late_fee}
//                     onChange={handleInputChange}
//                   />
//                 ) : (
//                   customer.late_fee
//                 )}
//               </td>

//               <td>
//                 <button onClick={() => toggleRentedBooks(customer._id)}>
//                   {showRentedBooks === customer._id
//                     ? "Hide Rented Books"
//                     : "Show Rented Books"}
//                 </button>
//               </td>

//               <td>
//                 {editCustomer && editCustomer._id === customer._id ? (
//                   <button onClick={handleUpdate}>Save</button>
//                 ) : (
//                   <button onClick={() => handleEdit(customer)}>Edit</button>
//                 )}
//                 <button onClick={() => handleDelete(customer._id)}>
//                   Delete
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//         {showRentedBooks && (
//             <RentedBooksPopup
//                 customer={
//                     customers.find(
//                         (customer) => customer._id === showRentedBooks
//                     ) || { _id: "", rented_books: [], name: "" }
//                 }
//                 onClose={() => setShowRentedBooks(null)}
//             />
//         )}
//       </table>
//     </div>
//   );
// };

// export default CustomerList;



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

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = () => {
    axios
      .get("/api/customers")
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        const errorMessage = error.response ? `${error.response.status} ${error.response.statusText}` : error.message;
        setError(errorMessage);
      });
  };

  const handleDelete = (id: string) => {
    axios.delete(`/api/customers/${id}`)
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
        .put(`/api/customers/update/${editCustomer._id}`, editCustomer)
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
