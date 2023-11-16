import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box,IconButton, InputAdornment,Container} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SnackbarProvider, useSnackbar } from 'notistack';
import axios from 'axios';
import './RegistrationForm.css';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
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
async function checkEmailExistence(email) {
  try {
    const response = await axios.get(`http://localhost:3001/users?email=${email}`);
    return response.data.length > 0;
  } catch (error) {
    console.error('Error checking email existence:', error);
    return false; 
  }
}

function RegistrationForm() {
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [repassword, setRePassword] = React.useState('');
  const [validationError, setValidationError] = React.useState('');
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);
 const [showRePassword, setShowRePassword] = useState(false);
  const formStyles = {

    fontFamily: 'IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
    fontFamily: "'Syncopate', sans-serif",
  };

  const handleRegistration = async () => {
    if (!username || !email || !password || !repassword) {
      setValidationError('Будь ласка, заповніть усі поля.');
      return;
    }
    const emailExists = await checkEmailExistence(email);
    if (emailExists) {
      setValidationError('Цей імейл вже зареєстрований.');
      return;
    }

    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      setValidationError('Невірна адреса електронної пошти. Використовуйте лише англійські літери.');
      return;
    }
  // eslint-disable-next-line
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/;
    if (!passwordRegex.test(password)) {
      setValidationError('Недійсний пароль. Використовуйте лише англійські літери та цифри.');
      return;
    }

    if (password.length < 6) {
      setValidationError('Пароль має бути не менше 6 символів.');
      return;
    }

    if (password !== repassword) {
      setValidationError('Паролі не збігаються.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3001/users', {
        username,
        email,
        password,
      });

      console.log(response.data);
      if (response.data.user) {
        
        localStorage.setItem('isLoggedIn', 'true');
      }
      enqueueSnackbar('Реєстрація успішна!', { variant: 'success' });
      setTimeout(() => {
        navigate('/login');
      }, 1000);

    } catch (error) {
      console.error('Registration failed:', error);

      if (error.response && error.response.status === 400 && error.response.data.error === 'Ця електронна адреса вже зареєстрована') {
        setValidationError('Ця електронна адреса вже зареєстрована.');
      } else {
        setValidationError('Помилка реєстрації. Будь ласка, спробуйте ще раз.');
      }
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <div className='modal'>
        <Container maxWidth="sm" className='Container'>
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
              type={showPassword ? 'text' : 'password'}
              label="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              fullWidth
              style={formStyles}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword((prev) => !prev)}
                      edge="end"
                      color="primary"
                    >
                      {showPassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowRePassword((prev) => !prev)}
                      edge="end"
                      color="primary"
                    >
                      {showRePassword ? (
                        <VisibilityOffIcon />
                      ) : (
                        <VisibilityIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              
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
