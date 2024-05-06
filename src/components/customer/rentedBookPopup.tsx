import React from "react";

interface BorrowedBook {
    id: string;
    title: string;
}

interface RentedBooksPopupProps {
    customer: {
        _id: string;
        name: string;
        rented_books: BorrowedBook[];
    };
    onClose: () => void;
}


const RentedBooksPopup: React.FC<RentedBooksPopupProps> = ({ customer, onClose }) => {
    return (
        <div className="popup">
            <div className="popup-content">
                <h3>Rented Books of {customer.name}</h3>
                <ul>
                    {customer.rented_books.map(book => (
                        <li key={book.id}>{book.title}</li>
                    ))}
                </ul>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default RentedBooksPopup;
