import React, { useState } from "react";
import BookRentList from "../../components/bookRent/bookRentList";
import BookRentalForm from "./addBookRent";
import { Button, Box, Typography, Container, Paper } from "@mui/material";

const RentPage: React.FC = () => {
  const [showRentList, setShowBookList] = useState(false);
  const [showAddBookRent, setShowAddBookRent] = useState(false);

  const toggleBookList = () => {
    setShowBookList(!showRentList);
  };

  const toggleAddRent = () => {
    setShowAddBookRent(!showAddBookRent);
  };

  const handleBookAdded = () => {
    window.alert("Book added successfully");
    if (showRentList) {
      fetchRents();
      setShowBookList(false);
    } else {
      setShowBookList(true);
    }
    setShowAddBookRent(false);
  };

  const fetchRents = () => {
    fetch("/api/bookRents")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setShowBookList(data);
        setShowBookList(true);
      })
      .catch((error) => console.error("Error fetching books:", error));
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Rent Management
      </Typography>
      <Box display="flex" mb={2} gap={2}>
        <Button variant="contained" color="primary" onClick={toggleBookList}>
          {showRentList ? "Hide Rent List" : "Show Rent List"}
        </Button>
        <Button
          sx={{ backgroundColor: "green", "&:hover": { backgroundColor: "darkgreen" } }}
          variant="contained"
          onClick={toggleAddRent}
        >
          {showAddBookRent ? "Hide Rent Addition" : "Add a New Rent"}
        </Button>
      </Box>
      {showRentList && (
        <Paper elevation={3} style={{ padding: "16px", marginBottom: "16px" }}>
          <BookRentList />
        </Paper>
      )}
      {showAddBookRent && (
        <Paper elevation={3} style={{ padding: "16px" }}>
          <BookRentalForm onBookRentAdded={handleBookAdded} />
        </Paper>
      )}
    </Container>
  );
};

export default RentPage;
