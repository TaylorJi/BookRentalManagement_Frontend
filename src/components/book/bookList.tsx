import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Table, TableBody, TableCell, TableHead, TableRow, Button, Paper, TextField,
  FormControl, InputLabel, Select, MenuItem, Checkbox
} from '@mui/material';
import { SelectChangeEvent } from '@mui/material/Select';

interface Type {
  _id: string;
  name: string;
  fee: number;
  duration: number;
}

interface Book {
  _id: string;
  title: string;
  book_type: Type;
  borrow_count: number;
  is_available: boolean;
  price: number;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [typeList, setTypeList] = useState<Type[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editBookId, setEditBookId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Book | null>(null);

  useEffect(() => {
    fetchBooks();
    fetchTypes();
  }, []);

  const fetchBooks = () => {
    axios.get("/api/books")
      .then(response => setBooks(response.data))
      .catch(error => setError(error.message));
  };

  const fetchTypes = () => {
    axios.get("/api/types")
      .then(response => setTypeList(response.data))
      .catch(error => setError(error.message));
  };

  const handleEditClick = (book: Book) => {
    setEditBookId(book._id);
    setEditFormData(book);
  };

  const handleBookTypeChange = (event: SelectChangeEvent<string>) => {
    const newType = typeList.find(type => type._id === event.target.value);
    if (editFormData && newType) {
      setEditFormData({ ...editFormData, book_type: newType });
    }
  };

  const handleBookAvailabilityChange = (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    if (editFormData) {
      setEditFormData({ ...editFormData, is_available: checked });
    }
  };

  const handleUpdate = () => {
    if (editFormData) {
      axios.put(`/api/books/update/${editBookId}`, editFormData)
        .then(() => {
          fetchBooks();
          setEditBookId(null);
          setEditFormData(null);
        })
        .catch(error => setError(error.message));
    }
  };

  const handleCancel = () => {
    setEditBookId(null);
    setEditFormData(null);
  };

  const handleDelete = (id: string) => {
    axios.delete(`/api/books/${id}`)
      .then(() => {
        fetchBooks();
      })
      .catch(error => setError(error.message));
  };

  if (error) {
    return <Paper>Error: {error}</Paper>;
  }

  return (
    <Paper sx={{ width: '100%', overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Book Type</TableCell>
            <TableCell>Availability</TableCell>
            <TableCell>Borrow Count</TableCell>
            <TableCell>Used Book Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book._id}>
              <TableCell>{book._id.slice(-6)}</TableCell>
              <TableCell>
                {editBookId === book._id ? (
                  <TextField
                    size="small"
                    fullWidth
                    value={editFormData?.title || ''}
                    onChange={e => setEditFormData({ ...editFormData, title: e.target.value } as Book)}
                  />
                ) : (
                  book.title
                )}
              </TableCell>
              <TableCell>
                {editBookId === book._id ? (
                  <FormControl fullWidth>
                    <InputLabel>Book Type</InputLabel>
                    <Select
                      value={editFormData?.book_type._id || ''}
                      onChange={handleBookTypeChange}
                      label="Book Type"
                    >
                      {typeList.map((type) => (
                        <MenuItem key={type._id} value={type._id}>{type.name}</MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                ) : (
                  book.book_type.name
                )}
              </TableCell>
              <TableCell>
                {editBookId === book._id ? (
                  <Checkbox
                    checked={editFormData?.is_available || false}
                    onChange={handleBookAvailabilityChange}
                  />
                ) : (
                  book.is_available ? 'Yes' : 'No'
                )}
              </TableCell>
              <TableCell>{book.borrow_count}</TableCell>
              <TableCell>
                {book.price - (book.book_type.fee * book.borrow_count)}
                {/* {editBookId === book._id ? (
                  <TextField
                    type="number"
                    size="small"
                    fullWidth
                    value={editFormData?.price || 0}
                    onChange={e => setEditFormData({ ...editFormData, price: parseFloat(e.target.value) } as Book)}
                  />
                ) : (
                  book.price
                )} */}
              </TableCell>
              <TableCell>
                {editBookId === book._id ? (
                  <>
                    <Button onClick={handleUpdate} color="primary">Save</Button>
                    <Button onClick={handleCancel} color="secondary">Cancel</Button>
                  </>
                ) : (
                  <>
                    <Button onClick={() => handleEditClick(book)} color="primary">Edit</Button>
                    <Button onClick={() => handleDelete(book._id)} color="secondary">Delete</Button>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default BookList;

