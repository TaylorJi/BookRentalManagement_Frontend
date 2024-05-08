// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link as RouterLink } from 'react-router-dom';

import { AppBar, Toolbar, Button, Typography, CssBaseline } from '@mui/material';
import CustomerPage from './pages/customer/customerPage';
import BookPage from './pages/book/bookPage';
import TypePage from './pages/type/typePage';
import RentPage from './pages/bookRent/bookRentpage';

import './App.css';


function App() {
  return (
    <Router>
    <CssBaseline />  {/* Normalize the styles */}
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Book Rental System
        </Typography>
        <Button color="inherit" component={RouterLink} to="/customers">Customers</Button>
        <Button color="inherit" component={RouterLink} to="/books">Books</Button>
        <Button color="inherit" component={RouterLink} to="/types">Types</Button>
        <Button color="inherit" component={RouterLink} to="/rentals">Rentals</Button>
        {/* Add more navigation buttons as needed */}
      </Toolbar>
    </AppBar>

    {/* Define routes for your application */}
    <Routes>
      <Route path="/customers" element={<CustomerPage />} />
      <Route path="/books" element={<BookPage />} />
      <Route path="/types" element={<TypePage />} />
      <Route path="/rentals" element={<RentPage />} />
      {/* Define other routes as needed */}
    </Routes>
  </Router>
    // <Router>
    //   <div>
    //     <nav>
    //       <Link to="/customers">Customers</Link>
    //       <Link to="/books">Books</Link>
    //       <Link to="/types">Types</Link>
    //        <Link to="/rentals">Rentals</Link>
    //       {/* Add more links for other navigation items */}
    //     </nav>

    //     <h1>
    //       Welcom to Book Rental System
    //     </h1>


        
    //     {/* Define routes for your application */}
    //     <Routes>
    //       <Route path="/customers" element={<CustomerPage />} />
    //       <Route path="/books" element={<BookPage />} />
    //       <Route path="/types" element={< TypePage/>} />
    //       <Route path="/rentals" element={< RentPage/>} />
          
    //       {/* Define other routes as needed */}
    //     </Routes>
    //   </div>
    // </Router>
  );
}



export default App;
