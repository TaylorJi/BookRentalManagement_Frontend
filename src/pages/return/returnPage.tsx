import React, { useState } from 'react';
import axios from 'axios';

function ReturnPage() {
  const [bookId, setBookId] = useState('');
  const [bookRental, setBookRental] = useState(null);
  const [error, setError] = useState('');

  const handleSearch = async () => {
    // Clear previous state
    setBookRental(null);
    setError('');

    try {
      // Replace `/api/bookRentals` with the actual endpoint you use to fetch book rentals by book ID
      const response = await axios.get(`/api/bookRentals/${bookId}`);
      setBookRental(response.data);
    } catch (err) {
      setError('Failed to fetch book rental');
      console.error(err);
    }
  };

  return (
    <div>
      <h1>Return Book</h1>
      <input
        type="text"
        value={bookId}
        onChange={(e) => setBookId(e.target.value)}
        placeholder="Enter Book ID"
      />
      <button onClick={handleSearch}>Search</button>

      {bookRental && (
        <div>
          <h2>Book Rental Details:</h2>
          {/* Render the details of the book rental here */}
          <p>{JSON.stringify(bookRental, null, 2)}</p>
        </div>
      )}

      {error && <div style={{ color: 'red' }}>{error}</div>}
    </div>
  );
}

export default ReturnPage;
