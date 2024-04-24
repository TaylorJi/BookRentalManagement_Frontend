import React, { useState, useEffect } from "react";

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
  genre: Genre;

  is_available: boolean;
  rent_fee: number;
}

const BookList: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [type, setType] = useState<Type[]>([]);
  const [typeList, setTypeList] = useState<Type[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [editBookId, setEditBookId] = useState<string | null>(null);
  const [editFormData, setEditFormData] = useState<Book | null>(null);

  const fetchBooks = () => {
    fetch("/api/books")
      .then((response) => response.json())
      .then((data) => setBooks(data))
      .catch((error) => setError(error.message));
  };

  useEffect(() => {
    fetchBooks();

    fetch("/api/types")
      .then((response) => response.json())
      .then((data) => setTypeList(data))
      .catch((error) => setError(error.message));
  }, []);

  const handleEditClick = (book: Book) => {
    setEditBookId(book._id);
    setEditFormData(book);
  };

  const handleUpdate = (id: string) => {
    console.log("Updating book with id:", id);
    if (editFormData) {
      console.log("Updating book with id:", id);
      console.log("editFormData:", editFormData);
      fetch(`/api/books/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editFormData),
      })
        .then((response) => response.json())
        .then((updatedBook) => {
          const updatedBooks = books.map((book) =>
            book._id === id ? updatedBook : book
          );
          setBooks(updatedBooks);
          setEditBookId(null);
          setEditFormData(null);
        })
        .catch((error) => setError(error.message));
      window.alert("Book updated successfully");
      fetchBooks();
    }
  };

  const handleEditFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const fieldName = e.target.name;
    let fieldValue: string | number | boolean = e.target.value;

    if (e.target instanceof HTMLInputElement && e.target.type === "checkbox") {
      fieldValue = e.target.checked;
    }

    // Ensure genre is always initialized in editFormData
    const updatedFormData = {
      ...editFormData,
      [fieldName]:
        fieldName === "book_type"
          ? { _id: fieldValue as string, book_type: fieldValue as string } // Assuming fieldValue is always a string here
          : fieldValue,
    };

    setEditFormData(updatedFormData as Book);
  };


  const handleDelete = (id: string) => {
    fetch(`/api/books/${id}`, { method: "DELETE" })
      .then((response) => response.json())
      .then(() => setBooks(books.filter((book) => book._id !== id)))
      .catch((error) => setError(error.message));
    window.alert("Book deleted successfully");
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
            <th>Book Type</th>
            <th>Availability</th>
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
                      name="book_type"
                      value={editFormData?.book_type._id}
                      onChange={(e) => {
                        const selectedType = typeList.find(
                          (g) => g._id === e.target.value
                        );
                        setEditFormData({
                          ...editFormData,
                          book_type: selectedType || editFormData?.book_type,
                        } as Book);
                      }}
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
                      onChange={handleEditFormChange}
                    />
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
                  <td>{book.title}</td>
                  <td>{book.book_type ? book.book_type.name : "N/A"}</td>
                  {/* <td>{book.genre.genre}</td> */}
                  <td>{book.is_available ? "Yes" : "No"}</td>

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
