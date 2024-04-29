import axios from "axios";
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

        axios.post("/api/customers", formData)
        .then(() => {
            onCustomerAdded();
            setFormData({
                name: "",
                contact: "",
                address: "",
                note: "",
                late_fee: 0,
            });
        
        })
     
        // // For example:
        // fetch("/api/customers", {
        //     method: "POST",
        //     headers: {
        //         "Content-Type": "application/json",
        //     },
        //     body: JSON.stringify(formData),
        // })
        //     .then(response => response.json())
        //     .then(() => {
        //         // Call the callback to update the customer list
        //         onCustomerAdded();
        //         // Reset the form data
        //         setFormData({
        //             name: "",
        //             contact: "",
        //             address: "",
        //             note: "",
        //             late_fee: 0,
        //         });
        //     })
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
