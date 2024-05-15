import React, { useState } from 'react';

interface Book {
  _id: string;
  title: string;
  genre: string; 
  rental_duration: number;
  is_available: boolean;
}

interface UpdateBookProps {
  book: Book;
  onBookUpdated: (updatedBook: Book) => void; // Callback to update the parent component's state
}

const UpdateBook: React.FC<UpdateBookProps> = ({ book, onBookUpdated }) => {
  const [title, setTitle] = useState(book.title);
  const [genre, setGenre] = useState(book.genre);
  const [rentalDuration, setRentalDuration] = useState(book.rental_duration);
  const [isAvailable, setIsAvailable] = useState(book.is_available);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Updating book with id:', book._id);

    fetch(`/api/books/update/${book._id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          genre,
          rental_duration: rentalDuration,
          is_available: isAvailable
        }),
    })
    .then(response => {
      if (!response.ok) throw new Error('Network response was not ok');
      return response.json();
    })
    .then(updatedBook => {
      console.log("Book updated successfully:", updatedBook);
      onBookUpdated(updatedBook); // Update the parent component's state
    })
    .catch(error => console.error('Error updating book:', error));
  };

  return (
    <form onSubmit={handleUpdate}>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={genre}
        onChange={(e) => setGenre(e.target.value)}
        placeholder="Genre"
      />
      <input
        type="number"
        value={rentalDuration}
        onChange={(e) => setRentalDuration(Number(e.target.value))}
        placeholder="Rental Duration"
      />
      <label>
        Available:
        <input
          type="checkbox"
          checked={isAvailable}
          onChange={(e) => setIsAvailable(e.target.checked)}
        />
      </label>
      <button type="submit">Update Book</button>
    </form>
  );
};

export default UpdateBook;
