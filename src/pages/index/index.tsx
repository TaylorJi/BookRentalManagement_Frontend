import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

function IndexPage() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh" // This ensures the box takes up at least the full height of the viewport
    >
      <Typography variant="h4" gutterBottom>Welcome to the Book Rental System</Typography>
      <Box>
        <Button variant="contained" color="primary" component={RouterLink} to="/customers" sx={{ m: 1 }}>
          Customers
        </Button>
        <Button variant="contained" color="primary" component={RouterLink} to="/books" sx={{ m: 1 }}>
          Books
        </Button>
        <Button variant="contained" color="primary" component={RouterLink} to="/rentals" sx={{ m: 1 }}>
          Rent
        </Button>
        <Button variant="contained" color="primary" component={RouterLink} to="/returns" sx={{ m: 1 }}>
          Return
        </Button>
        <Button variant="contained" color="primary" component={RouterLink} to="/transactions" sx={{ m: 1 }}>
          Daily Transactions
        </Button>
      </Box>
    </Box>
  );
}

export default IndexPage;
