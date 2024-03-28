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
            {showAddBook && <AddBook />}
        </div>
    );
}

export default CustomerPage;