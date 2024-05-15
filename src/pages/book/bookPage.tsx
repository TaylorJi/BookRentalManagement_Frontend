import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  IconButton,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import BookList from "../../components/book/bookList";
import AddBook from "../../components/book/addBook";
import SearchByTitle from "../../components/book/searchByTitle";

function BookPage() {
  const [showBookList, setShowBookList] = useState(false);
  const [showBookListDialog, setShowBookListDialog] = useState(false);
  const [showAddBookDialog, setShowAddBookDialog] = useState(false);
  const [showSearchByTitle, setShowSearchByTitle] = useState(false);

  const handleBookAdded = () => {
    window.alert("Book added successfully");
    if (showBookList) {
      fetchBooks(); // Fetch updated book list after adding a book
      setShowBookListDialog(false); // Hide the book list dialog
      setShowAddBookDialog(false); // Hide the add book dialog
      setShowBookList(false); // Hide the book list
    } else {
      setShowBookList(true); // Show the book list after adding a book
    }
  };

  const handleOpenBookList = () => {
    setShowBookListDialog(true);
  };

  const handleCloseBookList = () => {
    setShowBookListDialog(false);
  };

  const handleOpenAddBook = () => {
    setShowAddBookDialog(true);
  };

  const handleCloseAddBook = () => {
    setShowAddBookDialog(false);
  };

  const handleOpenSearchByTitle = () => {
    setShowSearchByTitle(true);
  }

  const handleCloseSearchByTitle = () => {
    setShowSearchByTitle(false);
  }

  const fetchBooks = () => {
    axios
      .get("/api/books")
      .then((response) => {
        setShowBookList(response.data);
        setShowBookList(true);
      })
      .catch((error) => console.error("Error fetching books:", error));
  };

  return (
    <div>
      <h1>Book Management</h1>
      <Button variant="contained" onClick={handleOpenBookList}>
        Show Book List
      </Button>
      <Dialog
        open={showBookListDialog}
        onClose={handleCloseBookList}
        fullWidth
        maxWidth="lg"
      >
        <IconButton
          onClick={handleCloseBookList}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers={true} style={{ overflow: "auto" }}>
          {/* Your dialog content here */}
          <BookList />
        </DialogContent>
      </Dialog>
      <Button
        sx={{
          backgroundColor: "green",
          "&:hover": { backgroundColor: "darkgreen" },
        }}
        variant="contained"
        onClick={handleOpenAddBook}
      >
        Add a Book
      </Button>
      <Dialog
        open={showAddBookDialog}
        onClose={handleCloseAddBook}
        fullWidth
        maxWidth="lg"
      >
        <IconButton
          onClick={handleCloseAddBook}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <AddBook onBookAdded={handleBookAdded} />
      </Dialog>

      <Button 
        sx={{
            backgroundColor: "gray",
            "&:hover": { backgroundColor: "gray" },
          }}
      variant="contained" onClick={handleOpenSearchByTitle}>
        Search by book title
      </Button>
      <Dialog
        open={showSearchByTitle}
        onClose={handleCloseSearchByTitle}
        fullWidth
        maxWidth="lg"
      >
        <IconButton
          onClick={handleCloseSearchByTitle}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers={true} style={{ overflow: "auto" }}>
          <SearchByTitle />
        </DialogContent>
      </Dialog>
    </div>

    
  );
}

export default BookPage;
