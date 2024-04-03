import React, {useState} from "react";
import GenreList from "../../components/genre/genreList";
import AddGenre from "../../components/genre/addGenre";

function GenrePage() {

    const [showGenreList, setShowGenreList] = useState(false);
    const [showAddGenre, setShowAddGenre] = useState(false);

    const toggleGenreList = () => {
        setShowGenreList(!showGenreList);
    }
    const toggleAddGenre = () => {
        setShowAddGenre(!showAddGenre);
    }

    const handleGenreAdded = () => {
        window.alert('Genre added successfully');
        if (showGenreList) {
            fetchGenres();
            setShowGenreList(false);
        } else {
            setShowGenreList(true);
        }
        setShowAddGenre(false);
    }

    const fetchGenres = () => {
        fetch('/api/genres')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setShowGenreList(data);
                setShowGenreList(true);
            })
            .catch(error => console.error('Error fetching genres:', error));
    }


    return (
        <div>
            <h1>Genre Management</h1>
            <button onClick={toggleGenreList}>
                {showGenreList ? 'Hide Genre List' : 'Show Genre List'}
            </button>
            {showGenreList && <GenreList />}
            <button onClick={toggleAddGenre}>
                {showAddGenre ? 'Hide Genre Addition' : 'Add a Genre'}
            </button>
            {showAddGenre && <AddGenre onGenreAdded={handleGenreAdded} />}
        </div>
    );
}

export default GenrePage;