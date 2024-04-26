import React, { useState, useEffect } from "react";
import axios from "axios";
import { set } from "mongoose";

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

interface AddBookRentProps {
  onBookRentAdded: () => void; // Callback function to update the book list
}

const BookRentalForm: React.FC<AddBookRentProps> = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [customerSearch, setCustomerSearch] = useState<string>("");
  const [bookIdSearch, setBookIdSearch] = useState<string>("");
  const [bookTitleSearch, setBookTitleSearch] = useState<string>("");
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

    const handleBookSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
      const bookId = e.target.value;
      setSelectedBooks((prev) =>
        e.target.checked
          ? [...prev, bookId]
          : prev.filter((id) => id !== bookId)
      );
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

  const handleSearchByBookIdChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBookIdSearch(e.target.value);
  };

  const handleBookTitleSearchInputChnage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setBookTitleSearch(e.target.value);
  };
  const handleCustomerSearchInputChnage = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setCustomerSearch(e.target.value);
  };

  const handleSearchByBookTitle = async () => {
    try {
      console.log(searchInput);
      const response = await axios.get(
        `/api/books/searchTitle?title=${bookTitleSearch}`
      );
      console.log(response.data);
      console.log(response.data.books);
      setBooks((prevBooks) => [...prevBooks, ...response.data.books]);
    } catch (err) {
      setError("Failed to search by book");
    }
  };

  const handleSearchByBookId = async () => {
    try {
      const response = await axios.get(
        `/api/books/searchId?id=${bookIdSearch}`
      );
      setBooks((prevBooks) => [...prevBooks, ...response.data.books]);

      // setBooks(response.data.books);
    } catch (err) {
      setError("Failed to search by book");
    }
  };

  const handleByCustomerName = async () => {
    try {
      const response = await axios.get(
        `/api/customers/search?name=${customerSearch}`
      );
      setCustomers(response.data);
    } catch (err) {
      setError("Failed to search by customer");
    }
  };

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
            value={customerSearch}
            onChange={handleCustomerSearchInputChnage}
            placeholder="Enter customer name"
          />
          <button type="button" onClick={handleByCustomerName}>
            Search
          </button>
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
          <label htmlFor="book_search_title">Search Book by Title:</label>
          <input
            type="text"
            id="book_search_title"
            value={bookTitleSearch}
            onChange={handleBookTitleSearchInputChnage}
            placeholder="Enter book title"
          />
          <button type="button" onClick={handleSearchByBookTitle}>
            Search
          </button>
        </div>
        <div>
          <label htmlFor="book-search_by_id">Search Book by ID:</label>
          <input
            type="text"
            id="book-search_by_id"
            value={bookIdSearch}
            onChange={handleSearchByBookIdChange}
            placeholder="Enter book ID"
          />
          <button type="button" onClick={handleSearchByBookId}>
            Search
          </button>
        </div>

        <div>
          <label>Books Available:</label>
          {books.map((book) => (
            <div key={book._id}>
              <label>
                {/* <input
                  type="checkbox"
                  value={book._id}
                  checked={selectedBooks.includes(book._id)}
                  onChange={handleBookSelection}
                /> */}
                {book.is_available && (
                  <input
                    type="checkbox"
                    value={book._id}
                    checked={selectedBooks.includes(book._id)}
                    onChange={handleBookSelection}
                  />
                )}
                {book._id.slice(-6)} {book.title} (Available: {book.is_available ? 'Yes' : 'No'})
              </label>
            </div>
          ))}
        </div>

        <div>
          <label>Selected Books:</label>

          <ul>
            {selectedBooks.map((bookId) => {
              const book = books.find((b) => b._id === bookId);
              return (
                <li key={bookId}>
                  {book?._id.slice(-6)} {book?.title}
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <button type="submit">Rent Selected Books</button>
        </div>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default BookRentalForm;
