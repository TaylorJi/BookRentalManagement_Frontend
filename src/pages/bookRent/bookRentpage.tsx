import React, {useState} from "react";
import BookRentList from "../../components/bookRent/bookRentList";
// import AddBook from "../../components/book/addBook";
import BookRentalForm from "./addBookRent";

function RentPage() {
    const [showRentList, setShowBookList] = useState(false);
    const [showAddBookRent, setShowAddBookRent] = useState(false);
    const toggleBookList = () => {
        setShowBookList(!showRentList);
    };
    const toggleAddRent = () => {
        setShowAddBookRent(!showAddBookRent);
    }

    const handledBookAdded = () => {
        window.alert('Book added successfully');
        if (showRentList) {
            fetchRents();
            setShowBookList(false);
        } else {
            setShowBookList(true);
        }
        setShowAddBookRent(false);
    }

    const fetchRents = () => {
        fetch('/api/bookRents')
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
            <h1>Rent Management</h1>
            <button onClick={toggleBookList}>
                {showRentList ? 'Hide Book List' : 'Show Rent List'}
            </button>
            {showRentList && <BookRentList />}
            <button onClick={toggleAddRent}>
                {showAddBookRent ? 'Hide book addition' : 'Add a new rent'}
            </button>
            {showAddBookRent && <BookRentalForm onBookRentAdded={handledBookAdded} />}
        </div>
    );
}

export default RentPage;