import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography, Box, Checkbox } from '@mui/material';

// Define interfaces
interface Book {
    id: string;
    id_str: string;
    title: string;
    fee: number;
    duration: number;
    return_date: string;
    _id: string;
}

interface Customer {
    _id: string;
    name: string;
}

interface BookRental {
    _id: string;
    customer_ID: Customer;
    borrowed_books: Book[];
    borrow_date: string;
    total_rent_fee: number;
    status: string;
    __v: number;
}

function ReturnPage() {
  const [bookId, setBookId] = useState('');
  const [bookRental, setBookRental] = useState<BookRental[] | null>(null);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    setError('');
    setBookRental(null);

    try {
      const response = await axios.get<BookRental[]>(`/api/bookRents/searchByBook/${bookId}`);
      setBookRental(response.data);
    } catch (err) {
      setError('Failed to fetch book rental');
      console.error(err);
    }
  };

  const handleSelectBook = (bookId: string) => {
    setSelectedBooks(prev => {
      if (prev.includes(bookId)) {
        return prev.filter(id => id !== bookId);
      } else {
        return [...prev, bookId];
      }
    });
  };
  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom>Return Book</Typography>
      <TextField
        label="Enter Book ID"
        variant="outlined"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        fullWidth
        sx={{ marginBottom: 2 }}
      />
      <Button variant="contained" onClick={handleSearch} color="primary">Search</Button>

      {bookRental && (
        <Card variant="outlined" sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h5" component="div">Book Rental Details:</Typography>
            {bookRental.map((rental, index) => (
              <Box key={index} sx={{ marginTop: 1 }}>
                <Typography variant="body1" component="div">Customer: {rental.customer_ID?.name}</Typography>
                <Typography variant="body1" component="div">Borrowed book titles:</Typography>
                <ul>
                  {rental.borrowed_books.map(book => (
                    <li key={book._id}>
                      <Checkbox
                        checked={selectedBooks.includes(book._id)}
                        onChange={() => handleSelectBook(book._id)}
                      />
                      {book.title}, {book._id.slice(-6)}
                    </li>
                  ))}
                </ul>
              </Box>
            ))}
          </CardContent>
        </Card>
      )}

      {selectedBooks.length > 0 && (
        <Card variant="outlined" sx={{ marginTop: 2 }}>
          <CardContent>
            <Typography variant="h5">Selected Books for Return:</Typography>
            <ul>
              {bookRental?.flatMap(rental => rental.borrowed_books.filter(book => selectedBooks.includes(book._id))).map(book => (
                <li key={book._id}>{book.title}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {error && (
        <Typography color="error" sx={{ marginTop: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  );
}

export default ReturnPage;



