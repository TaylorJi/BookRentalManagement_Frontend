import React, {useEffect, useState} from "react";

interface Genre{
    _id: string;
    genre: string;
  }



const AddBook: React.FC = () => {
    const [title, setTitle] = useState('');
    const [genre, setGenre] = useState('');
    const [genreList, setGenreList] = useState<Genre[]>([]);

    useEffect(() => {
        fetch('/api/genres')
        .then(res => res.json())
        .then(data => {
            console.log('Genres:', data);
            setGenreList(data);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    const addBook = () => {
        fetch('/api/books/addBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, genre }),
        })
        .then(res => res.json())
        .then(data => {
            console.log('Book added:', data);
            setTitle('');
            setGenre('');
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div>
        <h2>Add Book</h2>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <select value={genre} onChange={e => setGenre(e.target.value.trim())}>
            <option value="">Select Genre</option>
            {genreList.map(g => (
                <option key={g._id} value={g._id}>{g.genre}</option>
            ))}
        </select>
        <button onClick={addBook}>Add Book</button>
    </div>
    );
};

export default AddBook;

