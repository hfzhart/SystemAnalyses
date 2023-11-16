import { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import MenuIcon from '@mui/icons-material/Menu';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import RegistrationForm from '../RegistrationForm/RegistrationForm';
import LoginForm from '../LoginForm/LoginForm';
import './Header.css';

function Header() {
  const [open, setOpen] = useState(false);
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleClickOpen = (isLoginForm) => {
    setOpen(true);
    setIsLoginForm(isLoginForm); 
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: 'white' }}>
      <Container fixed>
        <Toolbar>
        <IconButton edge="start" color="primary" style={{ marginCenter: 'auto' }} aria-label="menu">
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
                  fontFamily: "'Comfortaa', sans-serif",
                }}
                onClick={handleProfile}
              >
                Профіль
              </Button>
            )}
          </Box>
          <Box ml={2}>
          <Button className='regButton' color="primary" variant="contained" style={{ fontFamily: 'IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji' }} onClick={() => handleClickOpen(false)}>Реєстрація</Button>
          </Box>
          {!isLoggedIn && (
            <Box ml={2}>
              <Button
                className="regButton"
                color="primary"
                variant="contained"
                style={{
                  fontFamily: "'Comfortaa', sans-serif",
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
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle className='Welcome-Title'>{isLoginForm ? '':'' }</DialogTitle>
        <DialogContent>
          {isLoginForm ? <LoginForm /> : <RegistrationForm />}
        </DialogContent>
      </Dialog>
    </AppBar>
  );
}

export default Header;
