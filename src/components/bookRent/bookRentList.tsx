import axios from 'axios';
import { response } from 'express';
import React, { useState, useEffect } from 'react';

interface Customer {
  _id: string;
  name: string;
  contact: string;
  address: string;
  note: string;
  late_fee: number;
}

interface BorrowedBook {
  id: string;
  title: string;
  fee: number;
  duration: number;
  return_date: string;
}

interface Rental {
  _id: string;
  customer_ID: Customer;
  borrowed_books: BorrowedBook[];
  borrow_date: string;
  total_rent_fee: number;
  status: string;
}

const RentalList: React.FC = () => {
  const [rentals, setRentals] = useState<Rental[]>([]);
  const [error, setError] = useState<string | null>(null);
  const apiUrl = process.env.REACT_APP_HOSTED_BACKEND;


  

  const fetchRentals = () => {
    fetch(`${apiUrl}/bookRents`)
      .then((response) => response.json())
      .then((data) => setRentals(data))
      .catch((error) => setError(`Failed to fetch rentals: ${error.message}`));
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h2>Rental Transactions</h2>
      {rentals.map((rental) => (
        <div key={rental._id} style={{ margin: '20px', padding: '20px', border: '1px solid #ccc' }}>
          <h3>Customer: {rental.customer_ID.name}</h3>
          <p>Contact: {rental.customer_ID.contact}</p>
          <p>Borrow Date: {new Date(rental.borrow_date).toLocaleDateString()}</p>
          <p>Total Rent Fee: ${rental.total_rent_fee}</p>
          <p>Status: {rental.status}</p>
          <h4>Borrowed Books</h4>
          {rental.borrowed_books.map((book) => (
            <div key={book.id}>
              <p>Title: {book.title}</p>
              <p>Fee: ${book.fee}</p>
              <p>Return Date: {new Date(book.return_date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default RentalList;
