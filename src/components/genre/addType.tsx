import React, {useState, useEffect} from "react";

interface AddGenreProps {
    onGenreAdded: () => void;
}

const AddGenre: React.FC<AddGenreProps> = ({ onGenreAdded }) => {
    const [genre, setGenre] = useState('');

    const addGenre = () => {
        fetch('/api/types/addGenre', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ genre }),
        })
        .then(res => res.json())
        .then(data => {
            console.log('Type added:', data);
            onGenreAdded();
            setGenre('');
        })
        .catch(error => console.error('Error:', error));
    };

    return (      <div>
            <h2>Add Type</h2>
            <input type="text" value={genre} onChange={e => setGenre(e.target.value)} placeholder="Type" />
            <button onClick={addGenre}>Add Type</button>
        </div>
    );
};

export default AddGenre;
