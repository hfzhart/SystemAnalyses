import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {AppBar,Container,Toolbar,IconButton,Typography,Box,Button,Dialog,DialogTitle,DialogContent,DialogContentText,DialogActions,Menu,MenuItem,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const [openDialog, setOpenDialog] = useState(false);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);

  const handleClickOpen = (isLoginForm) => {
    if (isLoginForm) {
      navigate('/login');
    } else {
      navigate('/register');
    }
  };

  const handleOpenMenu = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setMenuAnchorEl(null);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleLogout = () => {
    handleOpenDialog();
  };

  const handleProfile = () => {
    navigate('/home');
  };

  const handleMenuItemClick = () => {
    handleCloseMenu();
  };

  const handleConfirmLogout = () => {
    localStorage.removeItem('isLoggedIn');
    navigate('/');
    handleCloseDialog();
  };

  useEffect(() => {
    const handleOutsideMenuClick = (event) => {
      if (menuAnchorEl && !menuAnchorEl.contains(event.target)) {
        handleCloseMenu();
      }
    };

    document.addEventListener('mousedown', handleOutsideMenuClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideMenuClick);
    };
  }, [menuAnchorEl]);

  return (
    <AppBar position="fixed" style={{ backgroundColor: 'white' }}>
      <Container fixed>
        <Toolbar>
          <IconButton
            edge="start"
            color="primary"
            style={{ marginCenter: 'auto' }}
            aria-label="menu"
            onClick={handleOpenMenu}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={menuAnchorEl}
            open={Boolean(menuAnchorEl)}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={handleMenuItemClick}>Пункт меню</MenuItem>
            <MenuItem onClick={handleMenuItemClick}>Пункт меню</MenuItem>
            <MenuItem onClick={handleMenuItemClick}>Пункт меню</MenuItem>
            <MenuItem onClick={handleMenuItemClick}>Пункт меню</MenuItem>
            <MenuItem onClick={handleMenuItemClick}>Пункт меню</MenuItem>
          </Menu>
          <Typography
            className="titleCarret"
            color="primary"
            variant="h6"
            style={{
              flexGrow: 1,
              fontFamily:
                'IBM Plex Sans,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
              fontSize: '20px',
              fontWeight: 700,
              cursor: 'pointer',
            }}
            component={Link}
            to="/"
          >
            System Analyses
          </Typography>
          <Box ml={2}>
            {isLoggedIn && (
              <Button
                className="profileButton"
                color="primary"
                variant="outlined"
                style={{
                  fontFamily:
                    'IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
                }}
                onClick={handleProfile}
              >
                Профіль
              </Button>
            )}
          </Box>
          <Box ml={2}>
            {isLoggedIn ? (
              <Button
                className="loginButton"
                color="primary"
                variant="outlined"
                style={{
                  fontFamily:
                    'IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
                }}
                onClick={handleLogout}
              >
                Вийти
              </Button>
            ) : (
              <Button
                className="loginButton"
                color="primary"
                variant="outlined"
                style={{
                  fontFamily:
                    'IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
                }}
                onClick={() => handleClickOpen(true)}
              >
                Вхід
              </Button>
            )}
          </Box>
          {!isLoggedIn && (
            <Box ml={2}>
              <Button
                className="regButton"
                color="primary"
                variant="contained"
                style={{
                  fontFamily:
                    'IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
                }}
                onClick={() => handleClickOpen(false)}
              >
                Реєстрація
              </Button>
            </Box>
          )}
          <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">
              Підтвердження виходу
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Ви дійсно хочете вийти?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog} color="primary">
                Відміна
              </Button>
              <Button
                onClick={handleConfirmLogout}
                color="primary"
                autoFocus
              >
                Вийти
              </Button>
            </DialogActions>
          </Dialog>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;
