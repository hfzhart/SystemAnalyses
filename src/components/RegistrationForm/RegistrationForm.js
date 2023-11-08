import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './RegistrationForm.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f0f0f0',
    },
  },
});

function RegistrationForm() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repassword, setRePassword] = useState('');
  useEffect(() => {
    setPassword(''); 
  }, []);

  const formStyles = {
    fontFamily: 'IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
    
  };

  const handleRegistration = () => {
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box my={2} textAlign="center">
          <Typography className="RegText" variant="h4" color="primary">
            Реєстрація
          </Typography>
        </Box>
        <Box mx={2}>
          <TextField
            type="text"
            label="Ім'я"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            style={formStyles}
          />
        </Box>
        <Box mx={2} my={2}>
          <TextField
            type="email"
            label="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            style={formStyles} 
          />
        </Box>
        <Box mx={2} my={2}>
          <TextField
            type="password"
            label="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            fullWidth
            style={formStyles} 
          />
        </Box>
        <Box mx={2} my={2}>
          <TextField
            type="password"
            label="Підтвердити пароль"
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
            fullWidth
            style={formStyles} 
          />
        </Box>
        <Box mx={10} my={2}>
          <Button
            onClick={handleRegistration}
            variant="contained"
            color="primary"
            fullWidth
          >
            Зареєструватись
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegistrationForm;