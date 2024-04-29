import React, {useState, useEffect} from "react";
import axios from "axios";
import { response } from "express";


interface Type {
    _id: string;
    name: string;
    fee: number;
    duration: number
    late_fee: number
};


const TypeList: React.FC = () => {
    const [TypeList, setTypeList] = useState<Type[]>([]);

    const fetchTypes = () => {
        axios.get("/api/types")
        .then(response => {
            console.log("response.data:", response.data);
            setTypeList(response.data);
        
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
                        <th>Name</th>
                        <th>Fee</th>
                        <th>Duration</th>
                        <th>Late fee</th>
                    </tr>
                </thead>
                <tbody>
                    {TypeList.map(g => (
                        <tr key={g._id}>
                            <td>{g.name}</td>
                            <td>{g.fee}</td>
                            <td>{g.duration}</td>
                            <td>{g.late_fee}</td>
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