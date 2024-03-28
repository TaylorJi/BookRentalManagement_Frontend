import React, { useState, useEffect } from "react";

// Define the customer type based on the expected structure of customer data

interface Genre{
  genre: string;
}

interface Book {
    _id: string;
    title: string;
    genre: Genre;
    rental_duration: boolean;
    is_available: number;

    // add other properties as needed
}


const BookList: React.FC = () => {
    const [books, setCustomers] = useState<Book[]>([]);
    const [error, setError] = useState<string | null>(null);
  
    useEffect(() => {
      fetch('/api/books')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => setCustomers(data))
        .catch(error => setError(error.message));
    }, []);
    const handleDelete = (id: string) => {
      // Delete book logic here
      console.log('Delete book with id:', id);
  };

  const handleUpdate = (id: string) => {
      // Update book logic here
      console.log('Update book with id:', id);
  };

  
    if (error) {
      return <div>Error: {error}</div>;
    }
  
    return (
      <div>
            <h2>Book List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Genre</th>
                        <th>Rental Duration (days)</th>
                        <th>Available</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map(book => (
                        <tr key={book._id}>
                            <td>{book.title}</td>
                            <td>{book.genre.genre}</td>
                            <td>{book.rental_duration}</td>
                            <td>{book.is_available ? 'Yes' : 'No'}</td>
                            <td>
                                <button onClick={() => handleUpdate(book._id)}>Update</button>
                                <button onClick={() => handleDelete(book._id)}>Delete</button>
                            </td>

                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
  }
  
  export default BookList;