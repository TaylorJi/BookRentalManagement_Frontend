// import React, { useState, useEffect } from "react";

// interface Genre {
//   _id: string;
//   genre: string;
// }

// interface Book {
//   _id: string;
//   title: string;
//   genre: Genre;
//   rental_duration: number;
//   is_available: boolean;
//   rent_fee: number;
// }

// const BookList: React.FC = () => {
//   const [books, setBooks] = useState<Book[]>([]);
//   const [error, setError] = useState<string | null>(null);
//   const [editBookId, setEditBookId] = useState<string | null>(null);
//   const [editFormData, setEditFormData] = useState<Book | null>(null);

//   useEffect(() => {
//     fetch("/api/books")
//       .then((response) => response.json())
//       .then((data) => setBooks(data))
//       .catch((error) => setError(error.message));
//   }, []);

//   const handleEditClick = (book: Book) => {
//     setEditBookId(book._id);
//     setEditFormData(book);
//   };

//   const handleUpdate = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (editFormData && editBookId) {
//       fetch(`/api/books/update/${editBookId}`, {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(editFormData),
//       })
//         .then((response) => response.json())
//         .then((updatedBook) => {
//           const updatedBooks = books.map((book) =>
//             book._id === editBookId ? updatedBook : book
//           );
//           setBooks(updatedBooks);
//           setEditBookId(null);
//           setEditFormData(null);
//         })
//         .catch((error) => setError(error.message));
//     }
//   };

//   const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const fieldName = e.target.name;
//     const fieldValue =
//       e.target.type === "checkbox" ? e.target.checked : e.target.value;

//     setEditFormData(
//       (prevFormData) =>
//         ({
//           ...prevFormData,
//           [fieldName]: fieldValue,
//         } as Book)
//     );
//   };

//   const handleDelete = (id: string) => {
//     fetch(`/api/books/${id}`, { method: "DELETE" })
//       .then((response) => response.json())
//       .then(() => setBooks(books.filter((book) => book._id !== id)))
//       .catch((error) => setError(error.message));
//   };

//   if (error) {
//     return <div>Error: {error}</div>;
//   }

//   return (
//     <div>
//       <h2>Book List</h2>
//       <form onSubmit={handleUpdate}>
//         <table>
//           <thead>
//             <tr>
//               <th>Title</th>
//               <th>Genre</th>
//               <th>Rental Duration</th>
//               <th>Available</th>
//               <th>Rent Fee</th>
//               <th>Actions</th>
//             </tr>
//           </thead>
//           <tbody>
//             {books.map((book) => (
//               <tr key={book._id}>
//                 {editBookId === book._id ? (
//                   <React.Fragment>
//                     <td>
//                       <input
//                         type="textfield"
//                         name="title"
//                         defaultValue={book.title}
//                         onChange={handleEditFormChange}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="textield"
//                         name="genre"
//                         defaultValue={book.genre.genre}
//                         onChange={handleEditFormChange}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="number"
//                         name="rental_duration"
//                         defaultValue={book.rental_duration.toString()}
//                         onChange={handleEditFormChange}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="checkbox"
//                         name="is_available"
//                         defaultChecked={book.is_available}
//                         onChange={handleEditFormChange}
//                       />
//                     </td>
//                     <td>
//                       <input
//                         type="number"
//                         name="rent_fee"
//                         defaultValue={book.rent_fee.toString()}
//                         onChange={handleEditFormChange}
//                       />
//                     </td>
//                     <td>
//                       <button type="submit">Save</button>
//                       <button type="button" onClick={() => setEditBookId(null)}>
//                         Cancel
//                       </button>
//                     </td>
//                   </React.Fragment>
//                 ) : (
//                   <React.Fragment>
//                     <td>{book.title}</td>
//                     <td>{book.genre.genre}</td>
//                     <td>{book.rental_duration}</td>
//                     <td>{book.is_available ? "Yes" : "No"}</td>
//                     <td>{book.rent_fee}</td>
//                     <td>
//                       <button
//                         type="button"
//                         onClick={() => handleEditClick(book)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         type="button"
//                         onClick={() => handleDelete(book._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </React.Fragment>
//                 )}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </form>
//     </div>
//   );
// };
// export default BookList;


import React, { useState, useEffect } from "react";

interface Genre {
  _id: string;
  genre: string;
}

interface Book {
  _id: string;
  title: string;
  genre: Genre;
  rental_duration: number;
  is_available: boolean;
  rent_fee: number;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [editBookId, setEditBookId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Book | null>(null);

  useEffect(() => {
    fetch("/api/books")
      .then(response => response.json())
      .then(data => setBooks(data))
      .catch(error => setError(error.message));

    fetch("/api/genres")
      .then(response => response.json())
      .then(data => setGenres(data))
      .catch(error => setError(error.message));
  }, []);

  const handleEditClick = (book: Book) => {
    setEditBookId(book._id);
    setEditFormData(book);
  };

  const handleUpdate = (id:string) => {
    console.log('Updating book with id:', id);
    if (editFormData) {
      fetch(`/api/books/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      })
      .then(response => response.json())
      .then(updatedBook => {
        const updatedBooks = books.map(book =>
          book._id === id ? updatedBook : book
        );
        setBooks(updatedBooks);
        setEditBookId(null);
        setEditFormData(null);
      })
      .catch(error => setError(error.message));
    }
  };
  

  const handleEditFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const fieldName = e.target.name;
    let fieldValue: string | number | boolean = e.target.value;
  
    if (e.target instanceof HTMLInputElement && e.target.type === 'checkbox') {
      fieldValue = e.target.checked;
    }
  
    // Ensure genre is always initialized in editFormData
    const updatedFormData = {
      ...editFormData,
      [fieldName]: fieldName === 'genre'
        ? { _id: fieldValue as string, genre: fieldValue as string } // Assuming fieldValue is always a string here
        : fieldValue,
    };
  
    setEditFormData(updatedFormData as Book);
  };
  

  const handleDelete = (id: string) => {
    fetch(`/api/books/${id}`, { method: "DELETE" })
      .then(response => response.json())
      .then(() => setBooks(books.filter(book => book._id !== id)))
      .catch(error => setError(error.message));
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
              <th>Rental Duration</th>
              <th>Available</th>
              <th>Rent Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                {editBookId === book._id ? (
                  <>
                    <td>
                      <input
                        type="text"
                        name="title"
                        defaultValue={editFormData?.title}
                        onChange={handleEditFormChange}
                      />
                    </td>
                    <td>
                      <select
                        name="genre"
                        value={editFormData?.genre._id}
                        onChange={(e) => {
                          const selectedGenre = genres.find(g => g._id === e.target.value);
                          setEditFormData({
                            ...editFormData,
                            genre: selectedGenre || editFormData?.genre
                          } as Book);
                        }}
                      >
                        {genres.map(genre => (
                          <option key={genre._id} value={genre._id}>
                            {genre.genre}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>
                      <input
                        type="number"
                        name="rental_duration"
                        defaultValue={editFormData?.rental_duration}
                        onChange={handleEditFormChange}
                      />
                    </td>
                    <td>
                      <input
                        type="checkbox"
                        name="is_available"
                        checked={editFormData?.is_available? true : false}
                        onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          name="rent_fee"
                          defaultValue={editFormData?.rent_fee}
                          onChange={handleEditFormChange}
                        />
                      </td>
                      <td>
                        <button type="button" onClick={() => handleUpdate(book._id)}>Save</button>
                        <button type="button" onClick={() => setEditBookId(null)}>
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{book.title}</td>
                      <td>{book.genre.genre}</td>
                      <td>{book.rental_duration}</td>
                      <td>{book.is_available ? "Yes" : "No"}</td>
                      <td>{book.rent_fee}</td>
                      <td>
                        <button
                          type="button"
                          onClick={() => handleEditClick(book)}
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(book._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

      </div>
    );
  };
  
  export default BookList;
  
