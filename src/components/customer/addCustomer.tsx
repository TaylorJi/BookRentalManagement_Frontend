// import axios from "axios";
// import React, { useState } from "react";

// interface AddCustomerProps {
//     onCustomerAdded: () => void; // Callback function to update the customer list
// }

// const AddCustomer: React.FC<AddCustomerProps> = ({ onCustomerAdded }) => {
//     const [formData, setFormData] = useState({
//         name: "",
//         contact: "",
//         address: "",
//         note: "",
//         late_fee: 0,
//     });

//     const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value,
//         });
//     };

//     const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
//         e.preventDefault();

//         axios.post("/api/customers", formData)
//         .then(() => {
//             onCustomerAdded();
//             setFormData({
//                 name: "",
//                 contact: "",
//                 address: "",
//                 note: "",
//                 late_fee: 0,
//             });
        
//         })
     
//         // // For example:
//         // fetch("/api/customers", {
//         //     method: "POST",
//         //     headers: {
//         //         "Content-Type": "application/json",
//         //     },
//         //     body: JSON.stringify(formData),
//         // })
//         //     .then(response => response.json())
//         //     .then(() => {
//         //         // Call the callback to update the customer list
//         //         onCustomerAdded();
//         //         // Reset the form data
//         //         setFormData({
//         //             name: "",
//         //             contact: "",
//         //             address: "",
//         //             note: "",
//         //             late_fee: 0,
//         //         });
//         //     })
//             .catch(error => console.error("Error adding customer:", error));
//     };

//     return (
//         <div>
//             <h2>Add Customer</h2>
//             <form onSubmit={handleSubmit}>
//                 <label>
//                     Name:
//                     <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
//                 </label>
//                 <label>
//                     Contact:
//                     <input type="text" name="contact" value={formData.contact} onChange={handleInputChange} />
//                 </label>
//                 <label>
//                     Address:
//                     <input type="text" name="address" value={formData.address} onChange={handleInputChange} />
//                 </label>
//                 <label>
//                     Note:
//                     <input type="text" name="note" value={formData.note} onChange={handleInputChange} />
//                 </label>
//                 <label>
//                     Late Fee:
//                     <input type="number" name="late_fee" value={formData.late_fee} onChange={handleInputChange} />
//                 </label>
//                 <button type="submit">Add Customer</button>
//             </form>
//         </div>
//     );
// };

// export default AddCustomer;


import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, Box } from '@mui/material';

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
    const [formErrors, setFormErrors] = useState({
        name: '',
        contact: '',
        address: ''
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        // Clear error on input change
        if (value.trim() !== "") {
            setFormErrors({ ...formErrors, [name]: "" });
        }
    };

    const validateForm = () => {
        const errors = { name: '', contact: '', address: '' };
        let isValid = true;
        if (!formData.name.trim()) {
            errors.name = "Name is required.";
            isValid = false;
        }
        if (!formData.contact.trim()) {
            errors.contact = "Contact is required.";
            isValid = false;
        }
        if (!formData.address.trim()) {
            errors.address = "Address is required.";
            isValid = false;
        }
        setFormErrors(errors);
        return isValid;
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (validateForm()) {
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
                .catch(error => console.error("Error adding customer:", error));
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" component="h2" gutterBottom>
                Add Customer
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ '& > :not(style)': { m: 1 }, display: 'flex', flexDirection: 'column' }}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                        required
                    />
                    <TextField
                        label="Contact"
                        variant="outlined"
                        name="contact"
                        value={formData.contact}
                        onChange={handleInputChange}
                        error={!!formErrors.contact}
                        helperText={formErrors.contact}
                        required
                    />
                    <TextField
                        label="Address"
                        variant="outlined"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        error={!!formErrors.address}
                        helperText={formErrors.address}
                        required
                    />
                    <TextField
                        label="Note"
                        variant="outlined"
                        name="note"
                        value={formData.note}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="Late Fee"
                        type="number"
                        variant="outlined"
                        name="late_fee"
                        value={formData.late_fee}
                        onChange={handleInputChange}
                    />
                    <Button type="submit" variant="contained" color="primary">
                        Add Customer
                    </Button>
                </Box>
            </form>
        </Container>
    );
};

export default AddCustomer;

