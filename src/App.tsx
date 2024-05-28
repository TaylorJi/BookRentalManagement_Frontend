// import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link as RouterLink,
} from "react-router-dom";

import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  CssBaseline,
} from "@mui/material";
import CustomerPage from "./pages/customer/customerPage";
import BookPage from "./pages/book/bookPage";
import TypePage from "./pages/type/typePage";
import RentPage from "./pages/bookRent/bookRentpage";
import IndexPage from "./pages/index";

import "./App.css";
import ReturnPage from "./pages/return/returnPage";

function App() {
  return (
    <Router>
      <CssBaseline /> {/* Normalize the styles */}
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{ flexGrow: 1, color: "inherit", textDecoration: "none" }}
          >
            Book Rental System
          </Typography>
          <Button color="inherit" component={RouterLink} to="/customers">
            Customers
          </Button>
          <Button color="inherit" component={RouterLink} to="/books">
            Books
          </Button>
          <Button color="inherit" component={RouterLink} to="/types">
            Types
          </Button>
          <Button color="inherit" component={RouterLink} to="/rentals">
            Rentals
          </Button>
          <Button color="inherit" component={RouterLink} to="/returns">
            Returns
          </Button>
          {/* Add more navigation buttons as needed */}
        </Toolbar>
      </AppBar>
      {/* Define routes for your application */}
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/customers" element={<CustomerPage />} />
        <Route path="/books" element={<BookPage />} />
        <Route path="/types" element={<TypePage />} />
        <Route path="/rentals" element={<RentPage />} />
        <Route path="/returns" element={<ReturnPage />} />
        {/* Define other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
