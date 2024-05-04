import React, { useState, useEffect } from "react";
import axios from "axios";

interface Genre {
  _id: string;
  genre: string;
}

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
  const [type, setType] = useState<Type[]>([]);
  const [bookAvailability, setBookAvailability] = useState<boolean>(false);
  const [bookType, setBookType] = useState<string>("");
  const [typeList, setTypeList] = useState<Type[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [editBookId, setEditBookId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Book | null>(null);

  const fetchBooks = () => {
    axios.get("/api/books")
      .then(response => {
        console.log("response.data:", response.data);
        setBooks(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
   
  };

  const fetchTypes = () => {
    axios.get("/api/types")
      .then(response => {
        setTypeList(response.data);
      })
      .catch(error => {
        setError(error.message);
      });
  }
  

  useEffect(() => {
    fetchBooks();
    fetchTypes();

    // fetch("/api/types")
    //   .then((response) => response.json())
    //   .then((data) => setTypeList(data))
    //   .catch((error) => setError(error.message));
  }, []);

  const handleEditClick = (book: Book) => {
    setEditBookId(book._id);
    setEditFormData(book);
  };

  const handleBookTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedType = typeList.find(
      (type) => type._id === e.target.value
    );
    setEditFormData({
      ...editFormData,
      book_type: selectedType || editFormData?.book_type,
    } as Book);
  }

  const handleBookAvailabilityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isAvailable = e.target.checked;
    console.log("isAvailable:", isAvailable);
    if (editFormData){
      setEditFormData({
        ...editFormData,
        is_available: isAvailable,
      });
    }

  }

  const handleUpdate = (id: string) => {
    if (editFormData) {
      console.log("Updating book with id:", id);
      console.log("editFormData.book_type:", editFormData.book_type);
      console.log("editFormData.is_available:", editFormData.is_available);
      axios.put(`/api/books/update/${id}`, editFormData)
        .then(response => {
          const updatedBook = response.data;
          console.log("updatedBook:", updatedBook.book._id);
          console.log(updatedBook.book._id === id);
          const updatedBooks = books.map(book =>
            book._id === id ? updatedBook : book
          );
          setBooks(updatedBooks);
          fetchBooks();
          setEditBookId(null);
          setEditFormData(null);

        })
        .catch(error => {
          console.error("Failed to update the book:", error);
          setError(error.message);
        });
    }
};



  const handleDelete = (id: string) => {
    // change this code using axios
    axios.delete(`/api/books/${id}`)
      .then(response => {
        console.log("response.data:", response.data);
        window.alert("Book deleted successfully");
        setBooks(books.filter(book => book._id !== id));
      })
      .catch(error => {
        setError(error.message);
      });
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
            <th>ID</th>
            <th>Title</th>
            <th>Book Type</th>
            <th>Availability</th>
            <th>Borrow Count</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={book._id || index}>
              {editBookId === book._id ? (
                <>
                <td>
                  <div>
                    {book._id.slice(-6)}
                  </div>
                </td>
                  <td>
                    <div>
                      {book.title}
                    </div>
                  </td>
                  <td>
                    <select
                      name="book_type"
                      value={editFormData?.book_type._id}
                      onChange = {handleBookTypeChange}
                    >
                      {typeList.map((book_type) => (
                        <option key={book_type._id} value={book_type._id}>
                          {book_type.name}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      name="is_available"
                      checked={editFormData?.is_available ? true : false}
                      onChange={handleBookAvailabilityChange}
                    />
                  </td>
                  <td>
                    <div>
                      {book.borrow_count}
                    </div>
                  </td>
                  

                  <td>
                    <button
                      type="button"
                      onClick={() => handleUpdate(book._id)}
                    >
                      Save
                    </button>
                    <button type="button" onClick={() => setEditBookId(null)}>
                      Cancel
                    </button>
                  </td>
                </>
              ) : (
                <>
                  <td>
                    <div>
                    {book._id && book._id.length >= 6 ? book._id.slice(-6) : 'Invalid ID'}

                    </div>
                    
                    </td>
                  <td>{book.title}</td>
                  <td>{book.book_type ? book.book_type.name : "N/A"}</td>
                  <td>{book.is_available ? "Yes" : "No"}</td>
                  <td>{book.borrow_count}</td>
                  <td>{book.price}</td>

                  <td>
                    <button type="button" onClick={() => handleEditClick(book)}>
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
