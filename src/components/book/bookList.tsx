// import React, { useState, useEffect } from "react";
// import axios from "axios";

// interface Genre {
//   _id: string;
//   genre: string;
// }

// interface Type {
//   _id: string;
//   name: string;
//   fee: number;
//   duration: number;
// }

// interface Book {
//   _id: string;
//   title: string;
//   book_type: Type;
//   borrow_count: number;
//   is_available: boolean;
//   price: number;
// }

// const BookList: React.FC = () => {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [type, setType] = useState<Type[]>([]);
//   const [bookAvailability, setBookAvailability] = useState<boolean>(false);
//   const [bookType, setBookType] = useState<string>("");
//   const [typeList, setTypeList] = useState<Type[]>([]);

//   const [error, setError] = useState<string | null>(null);
//   const [editBookId, setEditBookId] = useState<string | null>(null);
//   const [editFormData, setEditFormData] = useState<Book | null>(null);

//   const fetchBooks = () => {
//     axios.get("/api/books")
//       .then(response => {
//         console.log("response.data:", response.data);
//         setBooks(response.data);
//       })
//       .catch(error => {
//         setError(error.message);
//       });
   
//   };

//   const fetchTypes = () => {
//     axios.get("/api/types")
//       .then(response => {
//         setTypeList(response.data);
//       })
//       .catch(error => {
//         setError(error.message);
//       });
//   }
  

//   useEffect(() => {
//     fetchBooks();
//     fetchTypes();

//     // fetch("/api/types")
//     //   .then((response) => response.json())
//     //   .then((data) => setTypeList(data))
//     //   .catch((error) => setError(error.message));
//   }, []);

//   const handleEditClick = (book: Book) => {
//     setEditBookId(book._id);
//     setEditFormData(book);
//   };

//   const handleBookTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const selectedType = typeList.find(
//       (type) => type._id === e.target.value
//     );
//     setEditFormData({
//       ...editFormData,
//       book_type: selectedType || editFormData?.book_type,
//     } as Book);
//   }

//   const handleBookAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const isAvailable = e.target.checked;
//     console.log("isAvailable:", isAvailable);
//     if (editFormData){
//       setEditFormData({
//         ...editFormData,
//         is_available: isAvailable,
//       });
//     }

//   }

//   const handleUpdate = (id: string) => {
//     if (editFormData) {
//       console.log("Updating book with id:", id);
//       console.log("editFormData.book_type:", editFormData.book_type);
//       console.log("editFormData.is_available:", editFormData.is_available);
//       axios.put(`/api/books/update/${id}`, editFormData)
//         .then(response => {
//           const updatedBook = response.data;
//           console.log("updatedBook:", updatedBook.book._id);
//           console.log(updatedBook.book._id === id);
//           const updatedBooks = books.map(book =>
//             book._id === id ? updatedBook : book
//           );
//           setBooks(updatedBooks);
//           fetchBooks();
//           setEditBookId(null);
//           setEditFormData(null);

//         })
//         .catch(error => {
//           console.error("Failed to update the book:", error);
//           setError(error.message);
//         });
//     }
// };



//   const handleDelete = (id: string) => {
//     // change this code using axios
//     axios.delete(`/api/books/${id}`)
//       .then(response => {
//         console.log("response.data:", response.data);
//         window.alert("Book deleted successfully");
//         setBooks(books.filter(book => book._id !== id));
//       })
//       .catch(error => {
//         setError(error.message);
//       });
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>Book List</h2>

//       <table>
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Title</th>
//             <th>Book Type</th>
//             <th>Availability</th>
//             <th>Borrow Count</th>
//             <th>Price</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {books.map((book, index) => (
//             <tr key={book._id || index}>
//               {editBookId === book._id ? (
//                 <>
//                 <td>
//                   <div>
//                     {book._id.slice(-6)}
//                   </div>
//                 </td>
//                   <td>
//                     <div>
//                       {book.title}
//                     </div>
//                   </td>
//                   <td>
//                     <select
//                       name="book_type"
//                       value={editFormData?.book_type._id}
//                       onChange = {handleBookTypeChange}
//                     >
//                       {typeList.map((book_type) => (
//                         <option key={book_type._id} value={book_type._id}>
//                           {book_type.name}
//                         </option>
//                       ))}
//                     </select>
//                   </td>
//                   <td>
//                     <input
//                       type="checkbox"
//                       name="is_available"
//                       checked={editFormData?.is_available ? true : false}
//                       onChange={handleBookAvailabilityChange}
//                     />
//                   </td>
//                   <td>
//                     <div>
//                       {book.borrow_count}
//                     </div>
//                   </td>
                  

//                   <td>
//                     <button
//                       type="button"
//                       onClick={() => handleUpdate(book._id)}
//                     >
//                       Save
//                     </button>
//                     <button type="button" onClick={() => setEditBookId(null)}>
//                       Cancel
//                     </button>
//                   </td>
//                 </>
//               ) : (
//                 <>
//                   <td>
//                     <div>
//                     {book._id && book._id.length >= 6 ? book._id.slice(-6) : 'Invalid ID'}

//                     </div>
                    
//                     </td>
//                   <td>{book.title}</td>
//                   <td>{book.book_type ? book.book_type.name : "N/A"}</td>
//                   <td>{book.is_available ? "Yes" : "No"}</td>
//                   <td>{book.borrow_count}</td>
//                   <td>{book.price}</td>

//                   <td>
//                     <button type="button" onClick={() => handleEditClick(book)}>
//                       Edit
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => handleDelete(book._id)}
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </>
//               )}
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default BookList;




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

