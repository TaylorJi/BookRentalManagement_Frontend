// import React, {useState} from "react";

// interface AddCustomerProps {
//     onCustomerAdded: () => void;
// }

// const AddCustomer: React.FC = () => {
//     const [name, setName] = useState('');
//     const [contact, setContact] = useState('');
//     const [address, setAddress] = useState(''); // Added address field to the customer object
//     const [note, setNote] = useState('');
//     const [late_fee, setLateFee] = useState(0);

//     const addCustomer = () => {
//         fetch('/api/customers/addCustomer', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//             },
//             body: JSON.stringify({ name, contact, address, note, late_fee }),
//         })
//         .then(res => res.json())
//         .then(data => {
//             console.log('Customer added:', data);
//             setName('');
//             setContact('');
//             setNote('');
//             setLateFee(0);
//         })
//         .catch(error => console.error('Error:', error));
//     };

//     return (
//         <div>
//             <h2>Add Customer</h2>
//             <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Name" />
//             <input type="text" value={contact} onChange={e => setContact(e.target.value)} placeholder="Contact" />
//             <input type="text" value={note} onChange={e => setNote(e.target.value)} placeholder="Note" />
//             <input type="text" value={address} onChange={e => setAddress(e.target.value)} placeholder="Address" />
//             <input type="number" value={late_fee} onChange={e => setLateFee(Number(e.target.value))} placeholder="Late Fee" />
//             <button onClick={addCustomer}>Add Customer</button>
//         </div>
//     );
// }

// export default AddCustomer;

import React, { useState } from "react";

interface AddCustomerProps {
    onCustomerAdded: () => void; // Callback function to update the customer list
}

const AddCustomer: React.FC<AddCustomerProps> = ({ onCustomerAdded }) => {
    const [formData, setFormData] = useState({
        name: "",
        contact: "",
        address: "",
        note: "",
        late_fee: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Your code to send the form data to the server and add the customer
        // After successful addition, call the onCustomerAdded callback
        // For example:
        fetch("/api/customers", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        })
            .then(response => response.json())
            .then(() => {
                // Call the callback to update the customer list
                onCustomerAdded();
                // Reset the form data
                setFormData({
                    name: "",
                    contact: "",
                    address: "",
                    note: "",
                    late_fee: 0,
                });
            })
            .catch(error => console.error("Error adding customer:", error));
    };

    return (
        <div>
            <h2>Add Customer</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </label>
                <label>
                    Contact:
                    <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} />
                </label>
                <label>
                    Address:
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
                </label>
                <label>
                    Note:
                    <input type="text" name="note" value={formData.note} onChange={handleInputChange} />
                </label>
                <label>
                    Late Fee:
                    <input type="number" name="late_fee" value={formData.late_fee} onChange={handleInputChange} />
                </label>
                <button type="submit">Add Customer</button>
            </form>
        </div>
    );
};

export default AddCustomer;
