import React, { useEffect, useState } from "react";
import {
  TextField, FormControl, Select, MenuItem, Button, Box, InputLabel, Typography, FormHelperText
} from '@mui/material';

interface Type {
  _id: string;
  name: string;
  fee: number;
  duration: number;
}

interface AddBookProps {
  onBookAdded: () => void; // Callback function to update the book list
}

const AddBook: React.FC<AddBookProps> = ({ onBookAdded }) => {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [typeList, setTypeList] = useState<Type[]>([]);
  const [price, setPrice] = useState('');
  const [errors, setErrors] = useState<{ title: boolean, type: boolean, price: boolean }>({ title: false, type: false, price: false });
  const apiUrl = process.env.REACT_APP_HOSTED_BACKEND;


  useEffect(() => {
    fetch(`${apiUrl}/types`)
      .then(res => res.json())
      .then(data => {
        setTypeList(data);
      })
      .catch(error => console.error('Error:', error));
  }, []);

  const validateForm = () => {
    const newErrors = {
      title: title === '',
      type: type === '',
      price: price === ''
    };
    setErrors(newErrors);
    return Object.values(newErrors).every(e => !e);
  };

  const addBook = () => {
    if (validateForm()) {
      fetch(`${apiUrl}/books/addBook`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, book_type: type, price: Number(price) }),
      })
      .then(res => res.json())
      .then(data => {
        onBookAdded();
        setTitle('');
        setType('');
        setPrice('');
      })
      .catch(error => console.error('Error:', error));
    }
  };

  return (
    <Box sx={{ maxWidth: 300, m: 'auto', p: 3 }}>
      <Typography variant="h6">Add Book</Typography>
      <TextField
        fullWidth
        label="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        margin="normal"
        error={errors.title}
        helperText={errors.title ? "Title is required" : ""}
        required
      />
      <FormControl fullWidth margin="normal" error={errors.type}>
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          label="Type"
          onChange={e => setType(e.target.value)}
          required
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          {typeList.map((type) => (
            <MenuItem key={type._id} value={type._id}>{type.name}</MenuItem>
          ))}
        </Select>
        {errors.type && <FormHelperText>Type is required</FormHelperText>}
      </FormControl>
      <TextField
        fullWidth
        label="Price"
        type="number"
        value={price}
        onChange={e => setPrice(e.target.value)}
        margin="normal"
        error={errors.price}
        helperText={errors.price ? "Price is required" : ""}
        required
      />
      <Button
        variant="contained"
        color="primary"
        onClick={addBook}
        sx={{ mt: 2 }}
      >
        Add Book
      </Button>
    </Box>
  );
};

export default AddBook;
