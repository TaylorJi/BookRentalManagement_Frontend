import React, {useEffect, useState} from "react";


interface Type {
    _id: string;
    name: string;
    fee: number;
    duration: number;
}


interface AddBookProps {
    onBookAdded: () => void; // Callback function to update the book list

}


const AddBook: React.FC<AddBookProps> = ({onBookAdded}) => {
    const [title, setTitle] = useState('');
    const [type, setType] = useState('');
    const [typeList, setTypeList] = useState<Type[]>([]);
    const [price, setPrice] = useState(0);

    useEffect(() => {
        fetch('/api/types')
        .then(res => res.json())
        .then(data => {
            console.log('Types:', data);
            setTypeList(data);
        })
        .catch(error => console.error('Error:', error));
    }, []);

    const addBook = () => {
        fetch('/api/books/addBook', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, book_type: type, price: price}),
        })
        .then(res => res.json())
        .then(data => {
            console.log('Book added:', data);
            onBookAdded();
            setTitle('');
            setType('');
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div>
        <h2>Add Book</h2>
        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <select value={type} onChange={e => setType(e.target.value.trim())}>
            <option value="">Select Type</option>
            {typeList.map(g => (
                <option key={g._id} value={g._id}>{g.name}</option>
            ))}
        </select>
        <input type="number" value={price} onChange={e => setPrice(parseFloat(e.target.value))} placeholder="Price" />
        <button onClick={addBook}>Add Book</button>
    </div>
    );
};

export default AddBook;

