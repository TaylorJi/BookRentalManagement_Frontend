import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import CustomerPage from './pages/customer/customerPage';
import BookPage from './pages/book/bookPage';

import './App.css';


function App() {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/customers">Customers</Link>
          <Link to="/books">Books</Link>
          {/* Add more links for other navigation items */}
        </nav>

        <h1>
          Welcom to Book Rental System
        </h1>


        
        {/* Define routes for your application */}
        <Routes>
          <Route path="/customers" element={<CustomerPage />} />
          <Route path="/books" element={<BookPage />} />
          {/* Define other routes as needed */}
        </Routes>
      </div>
    </Router>
  );
}



export default App;
