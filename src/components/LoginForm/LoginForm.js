import React, { useState } from 'react';
import './loginForm.css';
import { TextField, Button, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

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

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
   
  };

  return (
    <ThemeProvider theme={theme}>
      <div className="loginform">
        <div className="centered-container">
          <Typography className='LogTitle' variant="h4" color="primary">
            Вхід
          </Typography>
          <div className="data-container">
            <TextField
              type="email"
              label="EMAIL"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="inputField"
            />
          </div>
          <div className="data-container">
            <TextField
              type="password"
              label="ПАРОЛЬ"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="inputField"
              autoComplete="new-password"
            />
          </div>
          <div className="buttonForm">
            <Button onClick={handleLogin} variant="contained" color="primary" className="loginButton">
              Ввійти
            </Button>
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default LoginForm;
