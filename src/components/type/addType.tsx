import React, { useState } from "react";
import axios from "axios";
import { TextField, Button, Typography, Container, Box, Alert } from "@mui/material";

interface AddTypeProps {
  onTypeAdded: () => void;
}

const AddGenre: React.FC<AddTypeProps> = ({ onTypeAdded }) => {
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.REACT_APP_HOSTED_BACKEND;

  const [formData, setFormData] = useState({
    name: "",
    fee: 0,
    duration: 0,
    late_fee: 0,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!formData.name) {
        throw new Error("Name is required");
      }
      const response = await axios.post(`${apiUrl}/types`, formData);
      alert("Type added successfully");
      console.log(response);
      onTypeAdded();
      setFormData({
        name: "",
        fee: 0,
        duration: 0,
        late_fee: 0,
      });
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An unknown error occurred");
      }
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Add Type
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            variant="outlined"
            required
            
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Fee"
            name="fee"
            type="number"
            value={formData.fee}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Duration"
            name="duration"
            type="number"
            value={formData.duration}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Late Fee"
            name="late_fee"
            type="number"
            value={formData.late_fee}
            onChange={handleInputChange}
            variant="outlined"
            required
          />
        </Box>
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Type
        </Button>
      </form>
    </Container>
  );
};

export default AddGenre;
