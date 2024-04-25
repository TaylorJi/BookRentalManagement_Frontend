import React, { useState, useEffect } from "react";
import axios from "axios";

interface Customer {
  _id: string;
  contact: string;
  name: string;
}

interface Book {
  _id: string;
  title: string;
  is_available: boolean;
}

interface BookRent {
  customer: Customer;
  book: Book;
}

interface AddBookRentProps {
  onBookRentAdded: () => void; // Callback function to update the book list
}

const BookRentalForm: React.FC<AddBookRentProps> = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [searchResult, setSearchResult] = useState<BookRent[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch customers and books on component mount
    const fetchCustomers = async () => {
      try {
        const response = await axios.get("/api/customers");
        setCustomers(response.data);
      } catch (err) {
        setError("Failed to fetch customers");
      }
    };

    const fetchBooks = async () => {
      try {
        const response = await axios.get("/api/books"); // assuming endpoint that only fetches available books
        setBooks(response.data);
      } catch (err) {
        setError("Failed to fetch books");
      }
    };

    // fetchCustomers();
    // fetchBooks();
  }, []);
  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleSearchByBookTitle = async () => {
    try {
        console.log(searchInput);
      const response = await axios.get(`/api/books/searchTitle?title=${searchInput}`);
      console.log(response.data)
      console.log(response.data.books)
      setBooks(response.data.books);
      console.log(books);
    } catch (err) {
      setError("Failed to search by book");
    }
  };

  const handleSearchByBookId = async () => {
    try {
      const response = await axios.get(`/api/books/searchById?id=${searchInput}`);
        setBooks(response.data);
    } catch (err) {
        setError("Failed to search by book");
        }
    }


    const handleByCustomerName = async () => {
        try {
            const response = await axios.get(`/api/customers/search?name=${searchInput}`);
            setCustomers(response.data);
        } catch (err) {
            setError("Failed to search by customer");
        }
    }

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedCustomerId(e.target.value);
  };

  const handleBookSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const bookId = e.target.value;
    setSelectedBooks((prev) =>
      e.target.checked ? [...prev, bookId] : prev.filter((id) => id !== bookId)
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerId || selectedBooks.length === 0) {
      setError("Please select a customer and at least one book");
      return;
    }

    try {
      const response = await axios.post("/api/bookRents", {
        customer_ID: selectedCustomerId,
        books: selectedBooks,
      });
      alert("Books rented successfully");
      console.log(response.data);
    } catch (err) {
      setError("Failed to process book rental");
      console.error(err);
    }
  };

  if (error) return <div>Error: {error}</div>;

  return (
    <div>
    <h1>Rent a Book</h1>
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="customer-search">Search Customer:</label>
        <input
          type="text"
          id="customer-search"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Enter customer name"
        />
        <button type="button" onClick={handleByCustomerName}>Search</button>
      </div>
      <div>
        <label>Customer:</label>
        <select value={selectedCustomerId} onChange={handleCustomerChange}>
          <option value="">Select a customer</option>
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.name}, {customer.contact}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="book-search">Search Book by Title:</label>
        <input
          type="text"
          id="book-search"
          value={searchInput}
          onChange={handleSearchInputChange}
          placeholder="Enter book title"
        />
        <button type="button" onClick={handleSearchByBookTitle}>Search</button>
      </div>

      <div>
        <label>Books Available:</label>
        {books.map((book) => (
          <div key={book._id}>
            <label>
              <input
                type="checkbox"
                value={book._id}
                checked={selectedBooks.includes(book._id)}
                onChange={handleBookSelection}
              />
              {book.title} (Available: {book.is_available ? 'Yes' : 'No'})
            </label>
          </div>
        ))}
      </div>

      <div>
        <button type="submit">Rent Selected Books</button>
      </div>
    </form>
    {error && <p style={{ color: 'red' }}>{error}</p>}
  </div>
    
  );
};

export default BookRentalForm;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// interface Customer {
//     _id: string;
//     name: string;
// }

// interface Book {
//     _id: string;
//     title: string;
//     is_available: boolean;
// }

// interface BookRent {
//     customer: string;
//     book: string;
// }

// interface AddBookRentProps {
//     onBookRentAdded: () => void; // Callback function to update the book list

// }

// const BookRentalForm: React.FC<AddBookRentProps> = () => {
//     const [customers, setCustomers] = useState<Customer[]>([]);
//     const [books, setBooks] = useState<Book[]>([]);
//     const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
//     const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
//     const [searchResult, setSearchResult] = useState<BookRent[]>([]);
//     const [searchInput, setSearchInput] = useState<string>('');
//     const [error, setError] = useState<string | null>(null);

//     useEffect(() => {
//         // Fetch customers and books on component mount
//         const fetchData = async () => {
//             try {
//                 const customersResp = await axios.get('/api/customers');
//                 const booksResp = await axios.get('/api/books');
//                 setCustomers(customersResp.data);
//                 setBooks(booksResp.data);
//             } catch (err) {
//                 setError('Failed to fetch data');
//             }
//         };

//         fetchData();
//     }, []);

//     const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//         setSelectedCustomerId(e.target.value);
//     };

//     const handleBookSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
//         const bookId = e.target.value;
//         setSelectedBooks(prev => e.target.checked ? [...prev, bookId] : prev.filter(id => id !== bookId));
//     };

//     const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//         setSearchInput(e.target.value);
//     };

//     const handleSearchByBookTitle = async () => {
//         try {
//             const response = await axios.get(`/api/books/searchTitle?${searchInput}`);
//             setSearchResult(response.data);
//         } catch (err) {
//             setError('Failed to search by book');
//         }
//     };

//     const handleSearchByCustomer = async () => {
//         try {
//             const response = await axios.get(`/api/books/searchByCustomer/${searchInput}`);
//             setSearchResult(response.data);
//         } catch (err) {
//             setError('Failed to search by customer');
//         }
//     };

//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();
//         if (!selectedCustomerId || selectedBooks.length === 0) {
//             setError('Please select a customer and at least one book');
//             return;
//         }

//         try {
//             const response = await axios.post('/api/bookRents', {
//                 customer_ID: selectedCustomerId,
//                 books: selectedBooks
//             });
//             alert('Books rented successfully');
//             console.log(response.data);
//         } catch (err) {
//             setError('Failed to process book rental');
//             console.error(err);
//         }
//     };

//     if (error) return <div>Error: {error}</div>;

//     return (
//         <div>
//             <h2>Rent Books</h2>
//             <div>
//                 <input type="text" placeholder="Enter book or customer ID" value={searchInput} onChange={handleSearchInputChange} />
//                 <button onClick={handleSearchByBookTitle}>Search by Book ID</button>
//                 <button onClick={handleSearchByCustomer}>Search by Customer ID</button>
//             </div>
//             {searchResult.map((rent, index) => (
//                 <div key={index}>
//                     <p>Customer: {rent.customer}</p>
//                     <p>Book: {rent.book}</p>
//                 </div>
//             ))}
//             <form onSubmit={handleSubmit}>
//                 <div>
//                     <label>Customer:</label>
//                     <select value={selectedCustomerId} onChange={handleCustomerChange}>
//                         <option value="">Select a customer</option>
//                         {customers.map(customer => (
//                             <option key={customer._id} value={customer._id}>{customer.name}</option>
//                         ))}
//                     </select>
//                 </div>
//                 <div>
//                     <label>Books:</label>
//                     {books.map(book => (
//                         <div key={book._id}>
//                             <label>
//                                 <input type="checkbox" value={book._id} onChange={handleBookSelection} />
//                                 {book.title} ({book.is_available ? 'Available' : 'Unavailable'})
//                             </label>
//                         </div>
//                     ))}
//                 </div>
//                 <button type="submit">Rent Books</button>
//             </form>
//         </div>
//     );
// };

// export default BookRentalForm;
