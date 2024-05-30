// import React, { useState, useEffect } from "react";
// import axios from "axios";

// interface Customer {
//   _id: string;
//   contact: string;
//   name: string;
// }

// interface Book_Type {
//   _id: string;
//   name: string;
//   fee: number;
//   duration: number;
// }

// interface Book {
//   _id: string;
//   book_type: string;
//   title: string;
//   is_available: boolean;
//   borrow_count: number;
// }

// interface AddBookRentProps {
//   onBookRentAdded: () => void; // Callback function to update the book list
// }

// const BookRentalForm: React.FC<AddBookRentProps> = () => {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [books, setBooks] = useState<Book[]>([]);
//   const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
//   const [customerSearch, setCustomerSearch] = useState<string>("");
//   const [bookIdSearch, setBookIdSearch] = useState<string>("");
//   const [bookTitleSearch, setBookTitleSearch] = useState<string>("");
//   const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
//   const [bookTypes, setBookTypes] = useState<{ [key: string]: Book_Type }>({});
//   const [customDurations, setCustomDurations] = useState<{
//     [bookId: string]: { duration: number; fee: number };
//   }>({});
//   const [totalRent, setTotalRent] = useState<number>(0);

//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const newCustomDurations: {
//       [bookId: string]: { duration: number; fee: number };
//     } = {};

//     const newTotalRent = Object.values(customDurations).reduce(
//       (acc, custom) => acc + (custom ? custom.fee : 0),
//       0
//     );
//     setTotalRent(newTotalRent);

//     selectedBooks.forEach((bookId) => {
//       const book = books.find((b) => b._id === bookId);
//       if (book) {
//         const bookType = bookTypes[book.book_type];
//         if (bookType) {
//           newCustomDurations[bookId] = {
//             duration: bookType.duration, // default duration
//             fee: bookType.fee, // default fee
//           };
//         }
//       }
//     });
//   }, [selectedBooks, customDurations, books, bookTypes]);

//   const handleDurationChange = (bookId: string, multiplier: number) => {
//     console.log("bookId:", bookId);
//     console.log("multiplier:", multiplier);
//     const book = books.find((book) => book._id === bookId);
//     if (book && book.book_type) {
//       const bookType = bookTypes[book.book_type];
//       if (bookType) {
//         // const newDuration = bookType.duration * multiplier;
//         console.log(bookType.fee * multiplier);
//         const newFee = bookType.fee * multiplier; // Recalculate fee based on new duration
//         setCustomDurations((prevCustomDurations) => ({
//           ...prevCustomDurations,
//           [bookId]: {
//             duration: bookType.duration * multiplier,
//             fee: newFee,
//           },
//         }));
//       }
//     }
//   };

//   const fetchBookTypeById = async (id: string) => {
//     if (!bookTypes[id]) {
//       // Check if the book type is already fetched to avoid unnecessary API calls
//       try {
//         const response = await axios.get(`/api/types/id?id=${id}`);
//         setBookTypes((prev) => ({ ...prev, [id]: response.data }));
//       } catch (err) {
//         console.error("Failed to fetch book type", err);
//       }
//     }
//   };


//   const handleSearchByBookIdChange = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setBookIdSearch(e.target.value);
//   };

//   const handleBookTitleSearchInputChnage = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setBookTitleSearch(e.target.value);
//   };
//   const handleCustomerSearchInputChnage = (
//     e: React.ChangeEvent<HTMLInputElement>
//   ) => {
//     setCustomerSearch(e.target.value);
//   };

//   const handleSearchByBookTitle = async () => {
//     try {
//       console.log(bookTitleSearch);
//       const response = await axios.get(
//         `/api/books/searchByTitle?title=${bookTitleSearch}`
//       );
//       setBooks((prevBooks) => [...prevBooks, ...response.data.books]);
//       response.data.books.forEach((book: Book) => {
//         fetchBookTypeById(book.book_type);
//       });
//     } catch (err) {
//       setError("The book title does not exist");
//       window.alert("The book title does not exist")
//     }
//   };

//   const handleSearchByBookId = async () => {
//     try {
//       console.log(bookIdSearch);
//       const response = await axios.get(
//         `/api/books/searchById?id=${bookIdSearch}`
//       );
//       setBooks((prevBooks) => [...prevBooks, ...response.data.books]);
//       response.data.books.forEach((book: Book) => {
//         console.log(book);
//         console.log(book.book_type)
//         fetchBookTypeById(book.book_type);
//       });
  

//     } catch (err) {
//       window.alert("Please check the book ID and try again");
//       setError("Please check the book ID and try again");
//     }
//   };

//   const handleByCustomerName = async () => {
//     try {
//       const response = await axios.get(
//         `/api/customers/search?name=${customerSearch}`
//       );
//       setCustomers(response.data);
//     } catch (err) {
//       setError("Failed to search by customer");
//     }
//   };

//   const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     setSelectedCustomerId(e.target.value);
//   };


//   const handleBookSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const bookId = e.target.value;
//     const newSelectedBooks = e.target.checked
//       ? [...selectedBooks, bookId]
//       : selectedBooks.filter((id) => id !== bookId);
  
//     setSelectedBooks(newSelectedBooks);
  
//     // Update custom durations for the newly selected books
//     const newCustomDurations = { ...customDurations };
  
//     // If a book is being selected, add its default fee and duration
//     if (e.target.checked) {
//       const book = books.find((b) => b._id === bookId);
//       if (book) {
//         const bookType = bookTypes[book.book_type];
//         if (bookType) {
//           newCustomDurations[bookId] = {
//             duration: bookType.duration, // default duration
//             fee: bookType.fee, // default fee
//           };
//         }
//       }
//     } else {
//       // If a book is being deselected, remove it from custom durations
//       delete newCustomDurations[bookId];
//     }
  
//     setCustomDurations(newCustomDurations);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedCustomerId || selectedBooks.length === 0) {
//       setError("Please select a customer and at least one book");
//       return;
//     }

//     const booksToRent = selectedBooks.map((bookId) => {
//       const book = books.find((b) => b._id === bookId);
//       if (book){
//         const custom = customDurations[bookId];
//         return {
//           book_id: bookId,
//           duration: custom ? custom.duration : bookTypes[book.book_type]?.duration,
//           fee: custom ? custom.fee : bookTypes[book.book_type]?.fee,
//         };
//       }
//     });

//     try {
//       const response = await axios.post("/api/bookRents", {
//         customer_ID: selectedCustomerId,
//         books: booksToRent,
        
//       });
//       alert("Books rented successfully");
//       console.log(response.data);
//       setSelectedCustomerId("");
//       setSelectedBooks([]);
//       setBooks([]);
//       setCustomers([]);
//       setBookTitleSearch("");
//       setBookIdSearch("");
//       setCustomerSearch("");
//       setCustomDurations({});
//       setTotalRent(0);
//     } catch (err) {
//       setError("Failed to process book rental");
//       console.error(err);
//     }
//   };

//   if (error) return <div>Error: {error}</div>;

//   return (
//     <div>
//       <h1>Rent a Book</h1>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="customer-search">Search Customer:</label>
//           <input
//             type="text"
//             id="customer-search"
//             value={customerSearch}
//             onChange={handleCustomerSearchInputChnage}
//             placeholder="Enter customer name"
//           />
//           <button type="button" onClick={handleByCustomerName}>
//             Search
//           </button>
//         </div>
//         <div>
//           <label>Customer:</label>
//           <select value={selectedCustomerId} onChange={handleCustomerChange}>
//             <option value="">Select a customer</option>
//             {customers.map((customer) => (
//               <option key={customer._id} value={customer._id}>
//                 {customer.name}, {customer.contact}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div>
//           <label htmlFor="book_search_title">Search Book by Title:</label>
//           <input
//             type="text"
//             id="book_search_title"
//             value={bookTitleSearch}
//             onChange={handleBookTitleSearchInputChnage}
//             placeholder="Enter book title"
//           />
//           <button type="button" onClick={handleSearchByBookTitle}>
//             Search
//           </button>
//         </div>
//         <div>
//           <label htmlFor="book-search_by_id">Search Book by ID:</label>
//           <input
//             type="text"
//             id="book-search_by_id"
//             value={bookIdSearch}
//             onChange={handleSearchByBookIdChange}
//             placeholder="Enter book ID"
//           />
//           <button type="button" onClick={handleSearchByBookId}>
//             Search
//           </button>
//         </div>

//         <div>
//           <label>Books Available:</label>
//           {books.map((book) => (
//             <div key={book._id}>
//               <label>
//                 {book.is_available && (
//                   <input
//                     type="checkbox"
//                     value={book._id}
//                     checked={selectedBooks.includes(book._id)}
//                     onChange={handleBookSelection}
//                   />
//                 )}
//                 {book._id.slice(-6)} {book.title} (Available:{" "}
//                 {book.is_available ? "Yes" : "No"}) -{" "}
//                 {bookTypes[book.book_type]?.name} - Fee: $
//                 {bookTypes[book.book_type]?.fee} - Duration:{" "}
//                 {bookTypes[book.book_type]?.duration} days
//               </label>
//             </div>
//           ))}
//         </div>
//         <div>
//           <label>Selected Books:</label>
//           <ul>
//             {selectedBooks.map((bookId) => {
//               const book = books.find((b) => b._id === bookId);
//               const custom = customDurations[bookId];
//               return (
//                 book && (
//                   <li key={bookId}>
//                     {book._id.slice(-6)} {book.title} -{" "}
//                     {bookTypes[book.book_type]?.name}
//                     <select
//                       value={
//                         custom
//                           ? custom.duration
//                           : bookTypes[book.book_type]?.duration
//                       }
//                       onChange={(e) =>
//                         handleDurationChange(
//                           bookId,
//                           parseInt(e.target.value) /
//                             bookTypes[book.book_type]?.duration
//                         )
//                       }
//                     >
//                       {[1, 2, 3].map((multiplier) => (
//                         <option
//                           key={multiplier}
//                           value={
//                             bookTypes[book.book_type]?.duration * multiplier
//                           }
//                         >
//                           {bookTypes[book.book_type]?.duration * multiplier}{" "}
//                           days
//                         </option>
//                       ))}
//                     </select>
//                     - Fee: $
//                     {custom
//                       ? custom.fee.toFixed(2)
//                       : bookTypes[book.book_type]?.fee.toFixed(2)}
//                   </li>
//                 )
//               );
//             })}
//           </ul>
//         </div>

//         <div>
//           <label>Total Rent: </label>
//           <span>${totalRent.toFixed(2)}</span>
//         </div>

//         <div>
//           <button type="submit">Rent Selected Books</button>
//         </div>
//       </form>

//       {error && <p style={{ color: "red" }}>{error}</p>}
//     </div>
//   );
// };


// export default BookRentalForm;







// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import {
//   Container,
//   Typography,
//   TextField,
//   Button,
//   Select,
//   MenuItem,
//   FormControl,
//   InputLabel,
//   Checkbox,
//   List,
//   ListItem,
//   ListItemText,
//   FormControlLabel,
//   Box,
//   SelectChangeEvent,
// } from "@mui/material";

// interface Customer {
//   _id: string;
//   contact: string;
//   name: string;
// }

// interface Book_Type {
//   _id: string;
//   name: string;
//   fee: number;
//   duration: number;
// }

// interface Book {
//   _id: string;
//   book_type: string;
//   title: string;
//   is_available: boolean;
//   borrow_count: number;
// }

// interface AddBookRentProps {
//   onBookRentAdded: () => void; // Callback function to update the book list
// }

// const BookRentalForm: React.FC<AddBookRentProps> = () => {
//   const [customers, setCustomers] = useState<Customer[]>([]);
//   const [books, setBooks] = useState<Book[]>([]);
//   const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
//   const [customerSearch, setCustomerSearch] = useState<string>("");
//   const [bookIdSearch, setBookIdSearch] = useState<string>("");
//   const [bookTitleSearch, setBookTitleSearch] = useState<string>("");
//   const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
//   const [bookTypes, setBookTypes] = useState<{ [key: string]: Book_Type }>({});
//   const [customDurations, setCustomDurations] = useState<{
//     [bookId: string]: { duration: number; fee: number };
//   }>({});
//   const [totalRent, setTotalRent] = useState<number>(0);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     const newCustomDurations: { [bookId: string]: { duration: number; fee: number } } = {};

//     selectedBooks.forEach((bookId) => {
//       const book = books.find((b) => b._id === bookId);
//       if (book) {
//         const bookType = bookTypes[book.book_type];
//         if (bookType) {
//           newCustomDurations[bookId] = {
//             duration: bookType.duration, // default duration
//             fee: bookType.fee, // default fee
//           };
//         }
//       }
//     });

//     setCustomDurations(newCustomDurations);
//   }, [selectedBooks, books, bookTypes]);

//   useEffect(() => {
//     const newTotalRent = Object.values(customDurations).reduce(
//       (acc, custom) => acc + (custom ? custom.fee : 0),
//       0
//     );
//     setTotalRent(newTotalRent);
//   }, [customDurations]);

//   const handleDurationChange = (bookId: string, newDuration: number) => {
//     const book = books.find((book) => book._id === bookId);
//     if (book && book.book_type) {
//       const bookType = bookTypes[book.book_type];
//       if (bookType) {
//         const newFee = (bookType.fee / bookType.duration) * newDuration; // Recalculate fee based on new duration
//         setCustomDurations((prevCustomDurations) => ({
//           ...prevCustomDurations,
//           [bookId]: {
//             duration: newDuration,
//             fee: newFee,
//           },
//         }));
//       }
//     }
//   };

//   const fetchBookTypeById = async (id: string) => {
//     if (!bookTypes[id]) {
//       // Check if the book type is already fetched to avoid unnecessary API calls
//       try {
//         const response = await axios.get(`/api/types/id?id=${id}`);
//         setBookTypes((prev) => ({ ...prev, [id]: response.data }));
//       } catch (err) {
//         console.error("Failed to fetch book type", err);
//       }
//     }
//   };

//   const handleSearchByBookIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBookIdSearch(e.target.value);
//   };

//   const handleBookTitleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setBookTitleSearch(e.target.value);
//   };

//   const handleCustomerSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setCustomerSearch(e.target.value);
//   };

//   const handleSearchByBookTitle = async () => {
//     try {
//       console.log(bookTitleSearch);
//       const response = await axios.get(`/api/books/searchByTitle?title=${bookTitleSearch}`);
//       setBooks((prevBooks) => [...prevBooks, ...response.data.books]);
//       response.data.books.forEach((book: Book) => {
//         fetchBookTypeById(book.book_type);
//       });
//     } catch (err) {
//       setError("The book title does not exist");
//       window.alert("The book title does not exist");
//     }
//   };

//   const handleSearchByBookId = async () => {
//     try {
//       console.log(bookIdSearch);
//       const response = await axios.get(`/api/books/searchById?id=${bookIdSearch}`);
//       setBooks((prevBooks) => [...prevBooks, ...response.data.books]);
//       response.data.books.forEach((book: Book) => {
//         console.log(book);
//         console.log(book.book_type);
//         fetchBookTypeById(book.book_type);
//       });
//     } catch (err) {
//       window.alert("Please check the book ID and try again");
//       setError("Please check the book ID and try again");
//     }
//   };

//   const handleByCustomerName = async () => {
//     try {
//       const response = await axios.get(`/api/customers/search?name=${customerSearch}`);
//       setCustomers(response.data);
//     } catch (err) {
//       setError("Failed to search by customer");
//     }
//   };

//   const handleCustomerChange = (e: SelectChangeEvent<string>) => {
//     setSelectedCustomerId(e.target.value);
//   };

//   const handleBookSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const bookId = e.target.value;
//     const newSelectedBooks = e.target.checked
//       ? [...selectedBooks, bookId]
//       : selectedBooks.filter((id) => id !== bookId);

//     setSelectedBooks(newSelectedBooks);
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!selectedCustomerId || selectedBooks.length === 0) {
//       setError("Please select a customer and at least one book");
//       return;
//     }

//     const booksToRent = selectedBooks
//       .map((bookId) => {
//         const book = books.find((b) => b._id === bookId);
//         if (book) {
//           const custom = customDurations[bookId];
//           return {
//             book_id: bookId,
//             duration: custom ? custom.duration : bookTypes[book.book_type]?.duration,
//             fee: custom ? custom.fee : bookTypes[book.book_type]?.fee,
//           };
//         }
//         return null;
//       })
//       .filter(Boolean); // filter out null values

//     try {
//       const response = await axios.post("/api/bookRents", {
//         customer_ID: selectedCustomerId,
//         books: booksToRent,
//       });
//       alert("Books rented successfully");
//       console.log(response.data);
//       setSelectedCustomerId("");
//       setSelectedBooks([]);
//       setBooks([]);
//       setCustomers([]);
//       setBookTitleSearch("");
//       setBookIdSearch("");
//       setCustomerSearch("");
//       setCustomDurations({});
//       setTotalRent(0);
//     } catch (err) {
//       setError("Failed to process book rental");
//       console.error(err);
//     }
//   };

//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" gutterBottom>
//         Rent a Book
//       </Typography>
//       <form onSubmit={handleSubmit}>
//         <Box mb={2}>
//           <TextField
//             fullWidth
//             label="Search Customer"
//             value={customerSearch}
//             onChange={handleCustomerSearchInputChange}
//             placeholder="Enter customer name"
//             variant="outlined"
//           />
//           <Button
//             variant="contained"
//             color="primary"
//             onClick={handleByCustomerName}
//             sx={{ mt: 1 }}
//           >
//             Search
//           </Button>
//         </Box>
//         <Box mb={2}>
//           <FormControl fullWidth variant="outlined">
//             <InputLabel>Customer</InputLabel>
//             <Select value={selectedCustomerId} onChange={handleCustomerChange} label="Customer">
//               <MenuItem value="">
//                 <em>Select a customer</em>
//               </MenuItem>
//               {customers.map((customer) => (
//                 <MenuItem key={customer._id} value={customer._id}>
//                   {customer.name}, {customer.contact}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </Box>
//         <Box mb={2}>
//           <TextField
//             fullWidth
//             label="Search Book by Title"
//             value={bookTitleSearch}
//             onChange={handleBookTitleSearchInputChange}
//             placeholder="Enter book title"
//             variant="outlined"
//           />
//           <Button variant="contained" color="primary" onClick={handleSearchByBookTitle} sx={{ mt: 1 }}>
//             Search
//           </Button>
//         </Box>
//         <Box mb={2}>
//           <TextField
//             fullWidth
//             label="Search Book by ID"
//             value={bookIdSearch}
//             onChange={handleSearchByBookIdChange}
//             placeholder="Enter book ID"
//             variant="outlined"
//           />
//           <Button variant="contained" color="primary" onClick={handleSearchByBookId} sx={{ mt: 1 }}>
//             Search
//           </Button>
//         </Box>
//         <Box mb={2}>
//           <Typography variant="h6">Books Available:</Typography>
//           <List>
//             {books.map((book) => (
//               <ListItem key={book._id}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={selectedBooks.includes(book._id)}
//                       onChange={handleBookSelection}
//                       value={book._id}
//                       disabled={!book.is_available}
//                     />
//                   }
//                   label={
//                     <>
//                       {book._id.slice(-6)} {book.title} (Available: {book.is_available ? "Yes" : "No"}) -{" "}
//                       {bookTypes[book.book_type]?.name} - Fee: ${bookTypes[book.book_type]?.fee} - Duration:{" "}
//                       {bookTypes[book.book_type]?.duration} days
//                     </>
//                   }
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//         <Box mb={2}>
//           <Typography variant="h6">Selected Books:</Typography>
//           <List>
//             {selectedBooks.map((bookId) => {
//               const book = books.find((b) => b._id === bookId);
//               const custom = customDurations[bookId];
//               return (
//                 book && (
//                   <ListItem key={bookId}>
//                     <ListItemText
//                       primary={`${book._id.slice(-6)} ${book.title} - ${bookTypes[book.book_type]?.name}`}
//                       secondary={
//                         <>
//                           <FormControl variant="outlined">
//                             <Select
//                               value={custom ? custom.duration.toString() : bookTypes[book.book_type]?.duration.toString()}
//                               onChange={(e) =>
//                                 handleDurationChange(bookId, parseInt(e.target.value))
//                               }
//                             >
//                               {[1, 2, 3].map((multiplier) => (
//                                 <MenuItem
//                                   key={multiplier}
//                                   value={bookTypes[book.book_type]?.duration * multiplier}
//                                 >
//                                   {bookTypes[book.book_type]?.duration * multiplier} days
//                                 </MenuItem>
//                               ))}
//                             </Select>
//                           </FormControl>
//                           - Fee: ${custom ? custom.fee.toFixed(2) : bookTypes[book.book_type]?.fee.toFixed(2)}
//                         </>
//                       }
//                     />
//                   </ListItem>
//                 )
//               );
//             })}
//           </List>
//         </Box>
//         <Box mb={2}>
//           <Typography variant="h6">
//             Total Rent: <span>${totalRent.toFixed(2)}</span>
//           </Typography>
//         </Box>
//         <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
//           Rent Selected Books
//         </Button>
//       </form>
//       {error && <Typography color="error">{error}</Typography>}
//     </Container>
//   );
// };

// export default BookRentalForm;



import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Container,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  List,
  ListItem,
  ListItemText,
  FormControlLabel,
  Box,
  SelectChangeEvent,
} from "@mui/material";

interface Customer {
  _id: string;
  contact: string;
  name: string;
}

interface Book_Type {
  _id: string;
  name: string;
  fee: number;
  duration: number;
}

interface Book {
  _id: string;
  book_type: string;
  title: string;
  is_available: boolean;
  borrow_count: number;
}

interface AddBookRentProps {
  onBookRentAdded: () => void; // Callback function to update the book list
}

const BookRentalForm: React.FC<AddBookRentProps> = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [selectedCustomerId, setSelectedCustomerId] = useState<string>("");
  const [customerSearch, setCustomerSearch] = useState<string>("");
  const [bookIdSearch, setBookIdSearch] = useState<string>("");
  const [bookTitleSearch, setBookTitleSearch] = useState<string>("");
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);
  const [bookTypes, setBookTypes] = useState<{ [key: string]: Book_Type }>({});
  const [customDurations, setCustomDurations] = useState<{
    [bookId: string]: { duration: number; fee: number };
  }>({});
  const [totalRent, setTotalRent] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const newCustomDurations: { [bookId: string]: { duration: number; fee: number } } = {};

    selectedBooks.forEach((bookId) => {
      const book = books.find((b) => b._id === bookId);
      if (book) {
        const bookType = bookTypes[book.book_type];
        if (bookType) {
          newCustomDurations[bookId] = {
            duration: bookType.duration, // default duration
            fee: bookType.fee, // default fee
          };
        }
      }
    });

    setCustomDurations(newCustomDurations);
  }, [selectedBooks, books, bookTypes]);

  useEffect(() => {
    const newTotalRent = Object.values(customDurations).reduce(
      (acc, custom) => acc + (custom ? custom.fee : 0),
      0
    );
    setTotalRent(newTotalRent);
  }, [customDurations]);

  const handleDurationChange = (bookId: string, newDuration: number) => {
    const book = books.find((book) => book._id === bookId);
    if (book && book.book_type) {
      const bookType = bookTypes[book.book_type];
      if (bookType) {
        const newFee = (bookType.fee / bookType.duration) * newDuration; // Recalculate fee based on new duration
        setCustomDurations((prevCustomDurations) => ({
          ...prevCustomDurations,
          [bookId]: {
            duration: newDuration,
            fee: newFee,
          },
        }));
      }
    }
  };

  const fetchBookTypeById = async (id: string) => {
    if (!bookTypes[id]) {
      // Check if the book type is already fetched to avoid unnecessary API calls
      try {
        const response = await axios.get(`/api/types/id?id=${id}`);
        setBookTypes((prev) => ({ ...prev, [id]: response.data }));
      } catch (err) {
        console.error("Failed to fetch book type", err);
      }
    }
  };

  const handleSearchByBookIdChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookIdSearch(e.target.value);
  };

  const handleBookTitleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBookTitleSearch(e.target.value);
  };

  const handleCustomerSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerSearch(e.target.value);
  };

  const handleSearchByBookTitle = async () => {
    try {
      console.log(bookTitleSearch);
      const response = await axios.get(`/api/books/searchByTitle?title=${bookTitleSearch}`);
      setBooks((prevBooks) => [...prevBooks, ...response.data.books]);
      response.data.books.forEach((book: Book) => {
        fetchBookTypeById(book.book_type);
      });
    } catch (err) {
      setError("The book title does not exist");
      window.alert("The book title does not exist");
    }
  };

  const handleSearchByBookId = async () => {
    try {
      console.log(bookIdSearch);
      const response = await axios.get(`/api/books/searchById?id=${bookIdSearch}`);
      setBooks((prevBooks) => [...prevBooks, ...response.data.books]);
      response.data.books.forEach((book: Book) => {
        console.log(book);
        console.log(book.book_type);
        fetchBookTypeById(book.book_type);
      });
    } catch (err) {
      window.alert("Please check the book ID and try again");
      setError("Please check the book ID and try again");
    }
  };

  const handleByCustomerName = async () => {
    try {
      const response = await axios.get(`/api/customers/search?name=${customerSearch}`);
      setCustomers(response.data);
    } catch (err) {
      setError("Failed to search by customer");
    }
  };

  const handleCustomerChange = (e: SelectChangeEvent<string>) => {
    setSelectedCustomerId(e.target.value);
  };

  const handleBookSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    const bookId = e.target.value;
    const newSelectedBooks = e.target.checked
      ? [...selectedBooks, bookId]
      : selectedBooks.filter((id) => id !== bookId);

    setSelectedBooks(newSelectedBooks);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCustomerId || selectedBooks.length === 0) {
      setError("Please select a customer and at least one book");
      return;
    }

    const booksToRent = selectedBooks
      .map((bookId) => {
        const book = books.find((b) => b._id === bookId);
        if (book) {
          const custom = customDurations[bookId];
          return {
            book_id: bookId,
            duration: custom ? custom.duration : bookTypes[book.book_type]?.duration,
            fee: custom ? custom.fee : bookTypes[book.book_type]?.fee,
          };
        }
        return null;
      })
      .filter(Boolean); // filter out null values

    try {
      const response = await axios.post("/api/bookRents", {
        customer_ID: selectedCustomerId,
        books: booksToRent,
      });
      alert("Books rented successfully");
      console.log(response.data);
      setSelectedCustomerId("");
      setSelectedBooks([]);
      setBooks([]);
      setCustomers([]);
      setBookTitleSearch("");
      setBookIdSearch("");
      setCustomerSearch("");
      setCustomDurations({});
      setTotalRent(0);
    } catch (err) {
      setError("Failed to process book rental");
      console.error(err);
    }
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Rent a Book
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Search Customer"
            value={customerSearch}
            onChange={handleCustomerSearchInputChange}
            placeholder="Enter customer name"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleByCustomerName}
            sx={{ mt: 1 }}
          >
            Search
          </Button>
        </Box>
        <Box mb={2}>
          <FormControl fullWidth variant="outlined">
            <InputLabel>Customer</InputLabel>
            <Select value={selectedCustomerId} onChange={handleCustomerChange} label="Customer">
              <MenuItem value="">
                <em>Select a customer</em>
              </MenuItem>
              {customers.map((customer) => (
                <MenuItem key={`customer-${customer._id}`} value={customer._id}>
                  {customer.name}, {customer.contact}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Search Book by Title"
            value={bookTitleSearch}
            onChange={handleBookTitleSearchInputChange}
            placeholder="Enter book title"
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={handleSearchByBookTitle} sx={{ mt: 1 }}>
            Search
          </Button>
        </Box>
        <Box mb={2}>
          <TextField
            fullWidth
            label="Search Book by ID"
            value={bookIdSearch}
            onChange={handleSearchByBookIdChange}
            placeholder="Enter book ID"
            variant="outlined"
          />
          <Button variant="contained" color="primary" onClick={handleSearchByBookId} sx={{ mt: 1 }}>
            Search
          </Button>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Books Available:</Typography>
          <List>
            {books.map((book) => (
              <ListItem key={`book-${book._id}`}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedBooks.includes(book._id)}
                      onChange={handleBookSelection}
                      value={book._id}
                      disabled={!book.is_available}
                    />
                  }
                  label={
                    <>
                      {book._id.slice(-6)} {book.title} (Available: {book.is_available ? "Yes" : "No"}) -{" "}
                      {bookTypes[book.book_type]?.name} - Fee: ${bookTypes[book.book_type]?.fee} - Duration:{" "}
                      {bookTypes[book.book_type]?.duration} days
                    </>
                  }
                />
              </ListItem>
            ))}
          </List>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">Selected Books:</Typography>
          <List>
            {selectedBooks.map((bookId) => {
              const book = books.find((b) => b._id === bookId);
              const custom = customDurations[bookId];
              return (
                book && (
                  <ListItem key={`selected-book-${bookId}`}>
                    <ListItemText
                      primary={`${book._id.slice(-6)} ${book.title} - ${bookTypes[book.book_type]?.name}`}
                      secondary={
                        <>
                          <FormControl variant="outlined">
                            <Select
                              value={custom ? custom.duration.toString() : bookTypes[book.book_type]?.duration.toString()}
                              onChange={(e) =>
                                handleDurationChange(bookId, parseInt(e.target.value))
                              }
                            >
                              {[1, 2, 3].map((multiplier) => (
                                <MenuItem
                                  key={`multiplier-${bookId}-${multiplier}`}
                                  value={bookTypes[book.book_type]?.duration * multiplier}
                                >
                                  {bookTypes[book.book_type]?.duration * multiplier} days
                                </MenuItem>
                              ))}
                            </Select>
                          </FormControl>
                          <span style= {{ color: "red"}}>
                          - Fee: ${custom ? custom.fee.toFixed(2) : bookTypes[book.book_type]?.fee.toFixed(2)}
                          </span>
                        </>
                      }
                    />
                  </ListItem>
                )
              );
            })}
          </List>
        </Box>
        <Box mb={2}>
          <Typography variant="h6">
            Total Rent: <span>${totalRent.toFixed(2)}</span>
          </Typography>
        </Box>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Rent Selected Books
        </Button>
      </form>
      {error && <Typography color="error">{error}</Typography>}
    </Container>
  );
};

export default BookRentalForm;
