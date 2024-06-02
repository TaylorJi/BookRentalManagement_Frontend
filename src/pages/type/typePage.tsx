import React, { useState, useEffect } from "react";
import axios from "axios";
import TypeList from "../../components/type/typeList";
import AddType from "../../components/type/addType";
import { Container, Button, Typography, Box } from "@mui/material";

const TypePage: React.FC = () => {
  const [types, setTypes] = useState([]); // State to hold types data
  const [showTypeList, setShowTypeList] = useState(false);
  const [showAddType, setShowAddType] = useState(false);

  const apiUrl = process.env.REACT_APP_HOSTED_BACKEND;


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
    axios
      .get(`${apiUrl}/types`)
      .then((response) => {
        setTypes(response.data);
        setShowTypeList(true);
      })
      .catch((error) => console.error("Error:", error));
  };

  // Optionally, fetch types when component mounts
  useEffect(() => {
    fetchTypes();
  }, []);

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Type Management
      </Typography>
      <Box display="flex" mb={2} gap={2}>
        <Button variant="contained" color="primary" onClick={toggleTypeList}>
          {showTypeList ? "Hide Type List" : "Show Type List"}
        </Button>
        <Button
          sx={{ backgroundColor: "green", "&:hover": { backgroundColor: "darkgreen" } }}
          variant="contained"
          onClick={toggleAddType}
        >
          {showAddType ? "Hide Type Addition" : "Add a Type"}
        </Button>
      </Box>
      {showTypeList && <TypeList />}
      {showAddType && <AddType onTypeAdded={handleTypeAdded} />}
    </Container>
  );
};

export default TypePage;



