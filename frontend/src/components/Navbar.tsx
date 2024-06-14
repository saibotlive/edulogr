import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuIcon from '@mui/icons-material/Menu';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { logoutSuccess } from '../features/auth/authSlice';

export default function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    dispatch(logoutSuccess());
    navigate('/login');
  };

  const menuItems = [
    { text: 'Home', link: '/' },
    { text: 'Register', link: '/register', showWhenLoggedOut: true },
    { text: 'Login', link: '/login', showWhenLoggedOut: true },
    { text: 'Report Incident', link: '/report-incident', protected: true },
  ];

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Edulogr
        </Typography>
        {isMobile ? (
          <>
            <IconButton edge="start" color="inherit" aria-label="menu" onClick={handleMenu}>
              <MenuIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
              {menuItems.map(
                (menuItem) =>
                  (!menuItem.protected || isAuthenticated) &&
                  (menuItem.showWhenLoggedOut === undefined || !isAuthenticated) && (
                    <MenuItem key={menuItem.text} component={Link} to={menuItem.link} onClick={handleClose}>
                      {menuItem.text}
                    </MenuItem>
                  )
              )}
              {isAuthenticated && <MenuItem onClick={handleLogout}>Logout</MenuItem>}
            </Menu>
          </>
        ) : (
          <>
            {menuItems.map(
              (menuItem) =>
                (!menuItem.protected || isAuthenticated) &&
                (menuItem.showWhenLoggedOut === undefined || !isAuthenticated) && (
                  <Button key={menuItem.text} color="inherit" component={Link} to={menuItem.link}>
                    {menuItem.text}
                  </Button>
                )
            )}
            {isAuthenticated && (
              <Button color="inherit" onClick={handleLogout}>
                Logout
              </Button>
            )}
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
