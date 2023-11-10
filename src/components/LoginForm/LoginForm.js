import React, { useState } from 'react';
import './loginForm.css';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { SnackbarProvider, useSnackbar } from 'notistack';
import { useNavigate, Link } from 'react-router-dom';

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

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const handleLogin = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users', {
        params: {
          email,
          password,
        },
      });

      if (response.data.length > 0) {
        
        console.log(response.data);
        enqueueSnackbar('Успішний Вхід!', { variant: 'success' });
        setTimeout(() => {
          navigate('/home');
        }, 1000);
      } else {
        
        setError('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('An error occurred during login. Please try again later.');
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="loginform">
        <div className="centered-container">
          <Typography
            className="LogTitle"
            variant="h4"
            color="primary"
            style={{
              fontFamily:
                'IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
            }}
          >
            Вхід
          </Typography>
          <div className="data-container">
            <TextField
              type="email"
              label="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inputField"
              style={{
                width: '100%',
                marginBottom: '16px',
                fontFamily:
                  'IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
              }}
            />
          </div>
          <div className="data-container">
            <TextField
              type="password"
              label="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputField"
              autoComplete="new-password"
              style={{
                width: '100%',
                marginBottom: '16px',
                fontFamily:
                  'IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
              }}
            />
          </div>
          <div className="buttonForm">
            <Button
              onClick={handleLogin}
              variant="contained"
              color="primary"
              className="loginButton"
              style={{
                width: '100%',
                fontFamily:
                  'IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
              }}
            >
              Увійти
            </Button>
          </div>
          {error && (
            <Box my={2} style={{ width: '100%' }}>
              <Alert severity="error" onClose={() => setError('')}>
                {error}
              </Alert>
            </Box>
          )}
          <Box my={2} textAlign="center">
            <Typography variant="body2" color="textSecondary">
              Не маєте акаунта?{' '}
              <Link to="/register" className="registration-link">
                Зареєструйтесь
              </Link>
            </Typography>
          </Box>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default function IntegrationNotistack() {
  return (
    <SnackbarProvider maxSnack={3}>
      <LoginForm />
    </SnackbarProvider>
  );
}
