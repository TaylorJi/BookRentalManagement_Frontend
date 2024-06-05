import React from 'react';
import { AppBar, Toolbar, Button, Typography, IconButton, Menu, MenuItem } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';

const Navigation: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={RouterLink}
          to="/"
          sx={{ flexGrow: 1, color: 'inherit', textDecoration: 'none', fontSize: isMobile ? '1.2rem' : '1.5rem' }}
        >
          Book Rental System
        </Typography>
        {isMobile ? (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={RouterLink} to="/customers" onClick={handleClose}>Customers</MenuItem>
              <MenuItem component={RouterLink} to="/books" onClick={handleClose}>Books</MenuItem>
              <MenuItem component={RouterLink} to="/types" onClick={handleClose}>Types</MenuItem>
              <MenuItem component={RouterLink} to="/rentals" onClick={handleClose}>Rentals</MenuItem>
              <MenuItem component={RouterLink} to="/returns" onClick={handleClose}>Returns</MenuItem>
            </Menu>
          </>
        ) : (
          <>
            <Button color="inherit" component={RouterLink} to="/customers" sx={{ fontSize: '1rem' }}>
              Customers
            </Button>
            <Button color="inherit" component={RouterLink} to="/books" sx={{ fontSize: '1rem' }}>
              Books
            </Button>
            <Button color="inherit" component={RouterLink} to="/types" sx={{ fontSize: '1rem' }}>
              Types
            </Button>
            <Button color="inherit" component={RouterLink} to="/rentals" sx={{ fontSize: '1rem' }}>
              Rentals
            </Button>
            <Button color="inherit" component={RouterLink} to="/returns" sx={{ fontSize: '1rem' }}>
              Returns
            </Button>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navigation;
