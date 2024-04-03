import React, {useState, useEffect} from "react";

interface Genre{
    _id: string;
    genre: string;
  }

const GenreList: React.FC = () => {
    const [genreList, setGenreList] = useState<Genre[]>([]);

    const fetchGenres = () => {
        fetch('/api/genres')
        .then(res => res.json())
        .then(data => {
            console.log('Genres:', data);
            setGenreList(data);
        })
        .catch(error => console.error('Error:', error));
    }


    useEffect(() => {
        fetchGenres();
    }, []);

    return (
        <div>
            <h2>Genres</h2>
            <table>
                <thead>
                    <tr>
                        <th>Genre</th>
                        <th>actions</th>
                    </tr>
                </thead>
                <tbody>
                    {genreList.map(g => (
                        <tr key={g._id}>
                            <td>{g.genre}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>


        </div>
    );
}

export default GenreList;