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
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Contact</th>
                        <th>Address</th>
                        <th>Note</th>
                        <th>Late Fee</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer._id}>
                            <td>{customer.name}</td>
                            <td>{customer.contact}</td>
                            <td>{customer.address}</td>
                            <td>{customer.note}</td>
                            <td>{customer.late_fee}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
  }
  
  export default CustomerList;
