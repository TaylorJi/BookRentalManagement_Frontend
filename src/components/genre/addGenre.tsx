import React, {useState, useEffect} from "react";

interface AddGenreProps {
    onGenreAdded: () => void;
}

const AddGenre: React.FC<AddGenreProps> = ({ onGenreAdded }) => {
    const [genre, setGenre] = useState('');

    const addGenre = () => {
        fetch('/api/genres/addGenre', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ genre }),
        })
        .then(res => res.json())
        .then(data => {
            console.log('Genre added:', data);
            onGenreAdded();
            setGenre('');
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <h2>Add Genre</h2>
            <input type="text" value={genre} onChange={e => setGenre(e.target.value)} placeholder="Genre" />
            <button onClick={addGenre}>Add Genre</button>
        </div>
    );
};

export default AddGenre;
