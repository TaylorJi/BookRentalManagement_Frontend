import React, {useState, useEffect} from "react";


interface Type {
    _id: string;
    name: string;
    fee: number;
    duration: number
}
    ;
const TypeList: React.FC = () => {
    const [TypeList, setTypeList] = useState<Type[]>([]);

    const fetchTypes = () => {
        fetch('/api/types')
        .then(res => res.json())
        .then(data => {
            console.log('Types:', data);
            setTypeList(data);
        })
        .catch(error => console.error('Error:', error));
    }


    useEffect(() => {
        fetchTypes();
    }, []);

    return (
        <div>
            <h2>Types</h2>
            <table>
                <thead>
                    <tr>
                        <th>name</th>
                        <th>fee</th>
                        <th>duration</th>
                    </tr>
                </thead>
                <tbody>
                    {TypeList.map(g => (
                        <tr key={g._id}>
                            <td>{g.name}</td>
                            <td>{g.fee}</td>
                            <td>{g.duration}</td>
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

export default TypeList;