import React from 'react';
import { useNavigate } from 'react-router-dom';
import { AppBar, Container, Toolbar, IconButton, Typography, Box, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const handleClickOpen = (isLoginForm) => {
    if (isLoginForm) {
      navigate('/login');
    } else {
      navigate('/register');
    }
  };

  return (
    <AppBar position="fixed" style={{ backgroundColor: 'white' }}>
      <Container fixed>
        <Toolbar>
          <IconButton edge="start" color="primary" style={{ marginCenter: 'auto' }} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography
    className='titleCarret'
    color="primary"
    variant="h6"
    style={{
      flexGrow: 1,
      fontFamily: 'IBM Plex Sans,ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica Neue,Arial,Noto Sans,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol,Noto Color Emoji',
      fontSize: '20px',
      fontWeight: 700,
      cursor: 'pointer', 
    }}
    component={Link} 
    to="/" >
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
    </AppBar>
  );
}

export default Header;
