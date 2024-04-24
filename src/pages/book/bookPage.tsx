import React, {useState} from "react";
import BookList from "../../components/book/bookList";
import AddBook from "../../components/book/addBook";

function CustomerPage() {
    const [showBookList, setShowBookList] = useState(false);
    const [showAddBook, setShowAddBook] = useState(false);
    const toggleBookList = () => {
        setShowBookList(!showBookList);
    };
    const toggleAddBook = () => {
        setShowAddBook(!showAddBook);
    }

    const handledBookAdded = () => {
        window.alert('Book added successfully');
        if (showBookList) {
            fetchBooks();
            setShowBookList(false);
        } else {
            setShowBookList(true);
        }
        setShowAddBook(false);
    }

    const fetchBooks = () => {
        fetch('/api/books')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setShowBookList(data);
                setShowBookList(true);
            })
            .catch(error => console.error('Error fetching books:', error));
    }
    return (
        <div>
            <h1>Book Management</h1>
            <button onClick={toggleBookList}>
                {showBookList ? 'Hide Book List' : 'Show Book List'}
            </button>
            {showBookList && <BookList />}
            <button onClick={toggleAddBook}>
                {showAddBook ? 'Hide book addition' : 'Add a book'}
            </button>
            {showAddBook && <AddBook onBookAdded={handledBookAdded} />}
        </div>
    );
}

export default CustomerPage;