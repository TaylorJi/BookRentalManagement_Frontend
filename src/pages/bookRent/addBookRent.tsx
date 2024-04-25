import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Customer {
    _id: string;
    name: string;
}

interface Book {
    _id: string;
    title: string;
    is_available: boolean;
}

interface AddBookRentProps {
    onBookRentAdded: () => void; // Callback function to update the book list

}

const BookRentalForm: React.FC<AddBookRentProps> = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [books, setBooks] = useState<Book[]>([]);
    const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
    const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch customers and books on component mount
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('/api/customers');
                setCustomers(response.data);
            } catch (err) {
                setError('Failed to fetch customers');
            }
        };

        const fetchBooks = async () => {
            try {
                const response = await axios.get('/api/books'); // assuming endpoint that only fetches available books
                setBooks(response.data);
            } catch (err) {
                setError('Failed to fetch books');
            }
        };

        fetchCustomers();
        fetchBooks();
    }, []);

    const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCustomerId(e.target.value);
    };

    const handleBookSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
        const bookId = e.target.value;
        setSelectedBooks(prev => e.target.checked ? [...prev, bookId] : prev.filter(id => id !== bookId));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedCustomerId || selectedBooks.length === 0) {
            setError('Please select a customer and at least one book');
            return;
        }

        try {
            const response = await axios.post('/api/bookRents', {
                customer_ID: selectedCustomerId,
                books: selectedBooks
            });
            alert('Books rented successfully');
            console.log(response.data);
        } catch (err) {
            setError('Failed to process book rental');
            console.error(err);
        }
    };

    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h2>Rent Books</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Customer:</label>
                    <select value={selectedCustomerId} onChange={handleCustomerChange}>
                        <option value="">Select a customer</option>
                        {customers.map(customer => (
                            <option key={customer._id} value={customer._id}>{customer.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label>Books:</label>
                    {books.map(book => (
                        <div key={book._id}>
                            <label>
                                <input type="checkbox" value={book._id} onChange={handleBookSelection} />
                                {book.title} ({book.is_available ? 'Available' : 'Unavailable'})
                            </label>
                        </div>
                    ))}
                </div>
                <button type="submit">Rent Books</button>
            </form>
        </div>
    );
};

export default BookRentalForm;
