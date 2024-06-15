import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { logoutSuccess } from '../features/auth/authSlice';

const Navbar = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logoutSuccess());
    localStorage.removeItem('token');
  };

  const drawer = (
    <div>
      <List>
        <ListItem button component={Link} to="/" onClick={handleDrawerToggle}>
          <ListItemText primary="Home" />
        </ListItem>
        {isAuthenticated ? (
          <>
            <ListItem button component={Link} to="/report-incident" onClick={handleDrawerToggle}>
              <ListItemText primary="Report Incident" />
            </ListItem>
            <ListItem button component={Link} to="/statistics" onClick={handleDrawerToggle}>
              <ListItemText primary="Statistics" />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                handleLogout();
                handleDrawerToggle();
              }}
            >
              <ListItemText primary="Logout" />
            </ListItem>
          </>
        ) : (
          <>
            <ListItem button component={Link} to="/login" onClick={handleDrawerToggle}>
              <ListItemText primary="Login" />
            </ListItem>
            <ListItem button component={Link} to="/register" onClick={handleDrawerToggle}>
              <ListItemText primary="Register" />
            </ListItem>
          </>
        )}
      </List>
    </div>
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Incident Reporting
          </Typography>
          <div className="hidden md:flex">
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            {isAuthenticated ? (
              <>
                <Button color="inherit" component={Link} to="/report-incident">
                  Report Incident
                </Button>
                <Button color="inherit" component={Link} to="/statistics">
                  Statistics
                </Button>
                <Button color="inherit" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>
                <Button color="inherit" component={Link} to="/register">
                  Register
                </Button>
              </>
            )}
          </div>
          <div className="md:hidden">
            <IconButton color="inherit" edge="start" onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </div>
  );
};

export default Navbar;
