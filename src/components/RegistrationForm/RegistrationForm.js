import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './RegistrationForm.css';

const theme = createTheme({
  palette: {
    primary: {
      main: '#9087FA',
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

  const handleRegistration = () => {
  
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="sm">
        <Box my={4} textAlign="center">
          <Typography className="RegText" variant="h4" color="primary">
            Реєстрація!
          </Typography>
        </Box>
        <Box mx={2}>
          <TextField
            type="text"
            label="ІМ'Я"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
          />
        </Box>
        <Box mx={2} my={2}>
          <TextField
            type="email"
            label="EMAIL"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
          />
        </Box>
        <Box mx={2} my={2}>
          <TextField
            type="password"
            label="ПАРОЛЬ"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            autoComplete="new-password"
            fullWidth
          />
        </Box>
        <Box mx={2} my={2}>
          <TextField
            type="password"
            label="ПІДТВЕРДИТИ ПАРОЛЬ"
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
            fullWidth
          />
        </Box>
        <Box mx={2} my={3}>
          <Button
            onClick={handleRegistration}
            variant="contained"
            color="primary"
            fullWidth
          >
            ЗАРЕЄСТРУВАТИСЬ
          </Button>
        </Box>
      </Container>
    </ThemeProvider>
  );
}

export default RegistrationForm;
