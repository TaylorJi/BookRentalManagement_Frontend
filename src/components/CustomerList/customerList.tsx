import React, { useState, useEffect } from "react";

// Define the customer type based on the expected structure of customer data
interface Customer {
    _id: string;
    name: string;
    contact: string;
    note: string;
    late_fee: number;

    // add other properties as needed
}


const CustomerList: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      fetch('/api/customers')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => setCustomers(data))
        .catch(error => setError(error.message));
    }, []);
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <ul>
        {customers.map(customer => (
          <li key={customer._id}>{customer.name}</li>
        ))}
      </ul>
    );
  }
  
  export default CustomerList;

// function CustomerList() {
//     const [customers, setCustomers] = useState<Customer[]>([]);
//     const [loading, setLoading] = useState(true);

//     const fetchCustomers = async () => {
//         setLoading(true);
//         try {
//             const response = await fetch('/customers');
//             const data: Customer[] = await response.json();
//             setCustomers(data);
//             setLoading(false);
//         } catch (error) {
//             console.error('Error fetching customers:', error);
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchCustomers();
//     }, []);

//     if (loading) {
//         return <div>Loading customers...</div>;
//     }

//     async function deleteCustomer(id: string) {
//         try {
//             const response = await fetch(`/customers/${id}`, {
//                 method: 'DELETE',
//             });
//             const data = await response.json();
//             console.log(data.message);
//             fetchCustomers(); // Refresh the list after deletion
//         } catch (error) {
//             console.error('Error deleting customer:', error);
//         }
//     }

//     return (
//         <div>
//             <h1>Customer List</h1>
//             <ul>
//                 {customers.map((customer) => (
//                     <li key={customer._id}>
//                         {customer.name} - {customer.contact}
//                         <button onClick={() => deleteCustomer(customer._id)}>Delete</button>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// }

// export default CustomerList;
