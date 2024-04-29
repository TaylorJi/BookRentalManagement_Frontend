import React, {useState, useEffect} from "react";
import axios from "axios";

interface AddTypeProps {
    onTypeAdded: () => void;
}

const AddGenre: React.FC<AddTypeProps> = ({ onTypeAdded }) => {
    const [genre, setGenre] = useState('');
    const [type, setType] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        name: "",
        fee: 0,
        duration: 0,
        late_fee: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            if (!formData.name) {
                throw new Error('Name is required');
            }
            const response = axios.post('/api/types', formData);
            alert("Type added successfully");
            console.log(response);
            onTypeAdded();
            setFormData({
                name: "",
                fee: 0,
                duration: 0,
                late_fee: 0,
            });
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('An unknown error occurred');
            }
        }
    }

    return (      <div>
            <h2>Add Type</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </label>
                <label>
                    Fee:
                    <input type="number" name="fee" value={formData.fee} onChange={handleInputChange} />
                </label>
                <label>
                    Duration:
                    <input type="number" name="duration" value={formData.duration} onChange={handleInputChange} />
                </label>
                <label>
                    Late Fee:
                    <input type="number" name="late_fee" value={formData.late_fee} onChange={handleInputChange} />
                </label>
                <button type="submit">Add Type</button>
            </form>
            {/* <input type="text" value={type} onChange={e => setType(e.target.value)} placeholder="Type" />
            <button onClick={addType}>Add Type</button> */}
        </div>
    );
};

export default AddGenre;
