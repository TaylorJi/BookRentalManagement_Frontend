import React, { useState, useEffect } from "react";
import axios from "axios";
import TypeList from "../../components/type/typeList"; // Assuming TypeList is the correct component
import AddType from "../../components/type/addType"; // Changed from AddGenre to AddType for consistency

function TypePage() {
    const [types, setTypes] = useState([]); // State to hold types data
    const [showTypeList, setShowTypeList] = useState(false);
    const [showAddType, setShowAddType] = useState(false);

    // Toggle visibility of the type list
    const toggleTypeList = () => {
        setShowTypeList(!showTypeList);
    };

    // Toggle visibility of the add type form
    const toggleAddType = () => {
        setShowAddType(!showAddType);
    };

    // Handle type addition
    const handleTypeAdded = () => {
        fetchTypes();
        setShowAddType(false);
    };

    // Fetch types from the backend
    const fetchTypes = () => {
        axios.get("/api/types")
            .then(response => {
                setTypes(response.data);
                setShowTypeList(true);
            })
            .catch(error => console.error('Error:', error));
    };

    // Optionally, fetch types when component mounts
    useEffect(() => {
        fetchTypes();
    }, []);

    return (
        <div>
            <h1>Type Management</h1>
            <button onClick={toggleTypeList}>
                {showTypeList ? 'Hide Type List' : 'Show Type List'}
            </button>
            {showTypeList && <TypeList/>}
            <button onClick={toggleAddType}>
                {showAddType ? 'Hide Type Addition' : 'Add a Type'}
            </button>
            {showAddType && <AddType onTypeAdded={handleTypeAdded} />}
        </div>
    );
}

export default TypePage;
