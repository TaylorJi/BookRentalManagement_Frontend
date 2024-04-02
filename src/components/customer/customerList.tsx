// import React, { useState, useEffect } from "react";

// // Define the customer type based on the expected structure of customer data
// interface Customer {
//     _id: string;
//     name: string;
//     contact: string;
//     address: string;
//     note: string;
//     late_fee: number;
//     // add other properties as needed
// }

// const CustomerList: React.FC = () => {
//     const [customers, setCustomers] = useState<Customer[]>([]);
//     const [error, setError] = useState<string | null>(null);
//     const [editCustomer, setEditCustomer] = useState<Customer | null>(null);

//     useEffect(() => {
//         fetch('/api/customers')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error('Network response was not ok');
//                 }
//                 return response.json();
//             })
//             .then(data => setCustomers(data))
//             .catch(error => setError(error.message));
//     }, []);

//     const handleDelete = (id: string) => {
//         fetch(`/api/customers/${id}`, { method: "DELETE" })
//             .then(response => response.json())
//             .then(() => setCustomers(customers.filter(customer => customer._id !== id)))
//             .catch(error => setError(error.message));
//     };

//     const handleEdit = (customer: Customer) => {
//         setEditCustomer(customer);
//     };

//     const handleUpdate = () => {
//         if (editCustomer) {
//             fetch(`/api/customers/update/${editCustomer._id}`, {
//                 method: "PUT",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify({
//                     contact: editCustomer.contact,
//                     address: editCustomer.address,
//                 }),
//             })
//                 .then(response => response.json())
//                 .then(updatedCustomer => {
//                     const updatedCustomers = customers.map(customer =>
//                         customer._id === updatedCustomer._id ? updatedCustomer : customer
//                     );
//                     setCustomers(updatedCustomers);
//                     setEditCustomer(null);
//                 })
//                 .catch(error => setError(error.message));
//         }
//     };

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         if (editCustomer) {
//             setEditCustomer({
//                 ...editCustomer,
//                 [name]: value,
//             });
//         }
//     };

//     if (error) {
//         return <div>Error: {error}</div>;
//     }

//     return (
//         <div>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>Name</th>
//                         <th>Contact</th>
//                         <th>Address</th>
//                         <th>Note</th>
//                         <th>Late Fee</th>
//                         <th>Action</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {customers.map(customer => (
//                         <tr key={customer._id}>
//                             <td>{customer.name}</td>
//                             <td>{editCustomer && editCustomer._id === customer._id ? (
//                                 <input
//                                     type="text"
//                                     name="contact"
//                                     value={editCustomer.contact}
//                                     onChange={handleInputChange}
//                                 />
//                             ) : customer.contact}</td>
//                             <td>{editCustomer && editCustomer._id === customer._id ? (
//                                 <input
//                                     type="text"
//                                     name="address"
//                                     value={editCustomer.address}
//                                     onChange={handleInputChange}
//                                 />
//                             ) : customer.address}</td>
//                             <td>{customer.note}</td>
//                             <td>{customer.late_fee}</td>
//                             <td>
//                                 {editCustomer && editCustomer._id === customer._id ? (
//                                     <button onClick={handleUpdate}>Save</button>
//                                 ) : (
//                                     <button onClick={() => handleEdit(customer)}>Edit</button>
//                                 )}
//                                 <button onClick={() => handleDelete(customer._id)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default CustomerList;


import React, { useState, useEffect } from "react";

// Define the customer type based on the expected structure of customer data
interface Customer {
    _id: string;
    name: string;
    contact: string;
    address: string;
    note: string;
    late_fee: number;
    // add other properties as needed
}

const CustomerList: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [error, setError] = useState<string | null>(null);
    const [editCustomer, setEditCustomer] = useState<Customer | null>(null);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = () => {
        fetch('/api/customers')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setCustomers(data))
            .catch(error => setError(error.message));
    };

    const handleDelete = (id: string) => {
        fetch(`/api/customers/${id}`, { method: "DELETE" })
            .then(response => response.json())
            .then(() => fetchCustomers()) // Update the list after deletion
            .catch(error => setError(error.message));
        window.alert('Customer deleted successfully');
    };

    const handleEdit = (customer: Customer) => {
        setEditCustomer(customer);
    };

    const handleUpdate = () => {
        if (editCustomer) {
            fetch(`/api/customers/update/${editCustomer._id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    contact: editCustomer.contact,
                    address: editCustomer.address,
                    note: editCustomer.note,
                    late_fee: editCustomer.late_fee,
                }),
            })
                .then(response => response.json())
                .then(() => {
                    fetchCustomers(); // Update the list after successful update
                    setEditCustomer(null);
                })
                .catch(error => setError(error.message));
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
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Note</th>
                        <th>Late Fee</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer._id}>
                            <td>{customer.name}</td>
                            <td>{editCustomer && editCustomer._id === customer._id ? (
                                <input
                                    type="text"
                                    name="contact"
                                    value={editCustomer.contact}
                                    onChange={handleInputChange}
                                />
                            ) : customer.contact}</td>
                            <td>{editCustomer && editCustomer._id === customer._id ? (
                                <input
                                    type="text"
                                    name="address"
                                    value={editCustomer.address}
                                    onChange={handleInputChange}
                                />
                            ) : customer.address}</td>
                            <td>{editCustomer && editCustomer._id === customer._id ? (
                                <input
                                    type="text"
                                    name="note"
                                    value={editCustomer.note}
                                    onChange={handleInputChange}
                                />
                            ) : customer.note}</td>
                            <td>{editCustomer && editCustomer._id === customer._id ? (
                                <input
                                    type="number"
                                    name="late_fee"
                                    value={editCustomer.late_fee}
                                    onChange={handleInputChange}
                                />
                            ) : customer.late_fee}</td>
                            <td>
                                {editCustomer && editCustomer._id === customer._id ? (
                                    <button onClick={handleUpdate}>Save</button>
                                ) : (
                                    <button onClick={() => handleEdit(customer)}>Edit</button>
                                )}
                                <button onClick={() => handleDelete(customer._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default CustomerList;
