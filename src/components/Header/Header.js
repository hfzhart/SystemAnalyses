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
          <Typography className='titleCarret' color="primary" variant="h6" style={{ flexGrow: 1, fontFamily: 'IBM Plex Sans,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji', fontSize: '20px', fontWeight: 700 }}>
  System Analyses
</Typography>

          <Box>
            <Button className='loginButton' color="primary" variant="outlined" style={{ fontFamily: 'IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji' }} onClick={() => handleClickOpen(true)}>Вхід</Button>
          </Box>
          <Box ml={2}>
          <Button className='regButton' color="primary" variant="contained" style={{ fontFamily: 'IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji' }} onClick={() => handleClickOpen(false)}>Реєстрація</Button>
          </Box>
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
