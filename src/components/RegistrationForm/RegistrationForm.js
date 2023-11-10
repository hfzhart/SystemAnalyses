// RegistrationForm.js

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Box } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider, useSnackbar } from 'notistack';
import axios from 'axios';
import './RegistrationForm.css';
import { Link } from 'react-router-dom';

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

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function RegistrationForm() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repassword, setRePassword] = React.useState('');
  const [validationError, setValidationError] = React.useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const formStyles = {
    fontFamily: 'IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
  };

  const handleRegistration = async () => {
    if (!username || !email || !password || !repassword) {
      setValidationError('Please fill in all fields.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setValidationError('Invalid email address. Use only English letters.');
      return;
    }
  // eslint-disable-next-line
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/;
    if (!passwordRegex.test(password)) {
      setValidationError('Invalid password. Use only English letters and numbers.');
      return;
    }

    if (password.length < 6) {
      setValidationError('Password must be at least 6 characters long.');
      return;
    }

    if (password !== repassword) {
      setValidationError('Passwords do not match.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/users', {
        username,
        email,
        password,
      });

      console.log(response.data);
      enqueueSnackbar('Реєстрація успішна!', { variant: 'success' });
      setTimeout(() => {
        navigate('/login');
      }, 1000);

    } catch (error) {
      console.error('Registration failed:', error);

      if (error.response && error.response.status === 400 && error.response.data.error === 'Email is already registered') {
        setValidationError('Этот адрес электронной почты уже зарегистрирован.');
      } else {
        setValidationError('Ошибка регистрации. Пожалуйста, попробуйте еще раз.');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='modal'>
        <Container maxWidth="sm" className='Container'>
          <Box my={2} textAlign="center">
            <Typography className="RegText" variant="h4" color="primary">
              Реєстрація!
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
          {validationError && (
            <Alert severity="error" onClose={() => setValidationError('')}>
              {validationError}
            </Alert>
          )}
        </Container>
        <Box my={2} textAlign="center">
            <Typography variant="body2" color="textSecondary">
              Вже є акаунт ?{' '}
              <Link to="/login" className="registration-link">
                Вхід
              </Link>
            </Typography>
          </Box>
      </div>
    </ThemeProvider>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <RegistrationForm />
    </SnackbarProvider>
  );
}
