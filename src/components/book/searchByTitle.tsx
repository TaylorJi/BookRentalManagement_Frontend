import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, Card, CardContent, Typography, Box } from '@mui/material';

// Define the Book interface
interface Book {
    id: string;
    title: string;
    is_available: boolean;
    fee: number;
    duration: number;
}

function SearchByTitle() {
    const [title, setTitle] = useState('');
    const [books, setBooks] = useState<Book[] | null>(null);
    const [error, setError] = useState('');

    const handleSearch = async () => {
        setError('');
        setBooks(null);

        try {
            const response = await axios.get(`/api/books/searchByTitle?title=${title}`);
            setBooks(response.data.books);
            console.log('Books:', response.data.books);
        } catch (err) {
            setError('Failed to fetch books');
            console.error(err);
        }
    };

    return (
        <Box sx={{ padding: 3 }}>
            <Typography variant="h4" gutterBottom>Search Books by Title</Typography>
            <TextField
                label="Enter Book Title"
                variant="outlined"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                sx={{ marginBottom: 2 }}
            />
            <Button variant="contained" onClick={handleSearch} color="primary">Search</Button>

            {books && books.length > 0 && (
                <Card variant="outlined" sx={{ marginTop: 2 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">Search Results:</Typography>
                        <ul>
                            {books.map((book, index) => (
                                <li key={index}>
                                    {book.title} - Availability: {book.is_available ? 'Available' : 'Not Available'}
                                </li>
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

export default SearchByTitle;
