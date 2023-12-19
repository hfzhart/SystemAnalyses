import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {AppBar,Toolbar,Typography,Button, Box, TextField, Grid, IconButton, Alert} from '@mui/material';
import { Link } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import './usersettings.css';
const UserSettings = () => {
  const [user, setUser] = useState({
    id: null,
    username: 'Гість',
    email: '',
    avatarUrl: '',
    password: '',
  });

  const [newData, setNewData] = useState({
    newUsername: '',
    newEmail: '',
    newPassword: '',
    newAvatarUrl: '',
    oldPassword: '',
  });

  const [loading, setLoading] = useState(true);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const fetchUserData = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

      if (storedUser && isLoggedIn) {
        const user = JSON.parse(storedUser);
        const response = await axios.get(`http://localhost:3001/users/${user.id}`);
        const updatedUser = response.data;
        setUser(updatedUser);
        setLoading(false);
      } else {
        setUser({
          id: null,
          username: 'Гість',
          email: '',
          avatarUrl: '',
          password: '',
        });
        setLoading(false);
      }
    } catch (error) {
      console.error('Помилка при отриманні даних користувача:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setPasswordError('');
    setEmailError('');
    setSuccessMessage('');
  };

  const validateEmail = (email) => {
    // eslint-disable-next-line
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    // eslint-disable-next-line
    const passwordRegex = /^[a-zA-Z0-9!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]+$/;
    return passwordRegex.test(password) && password.length >= 6;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      if (newData.oldPassword !== user.password) {
        setPasswordError('Старий пароль введений невірно');
        return;
      }

   
      if (newData.newEmail && !validateEmail(newData.newEmail)) {
        setEmailError('Невірний формат адреси електронної пошти. Використовуйте тільки англійські літери.');
        return;
      }

      if (newData.newPassword && !validatePassword(newData.newPassword)) {
        setPasswordError('Неприпустимий пароль. Використовуйте тільки англійські літери та цифри, пароль повинен бути не менше 6 символів.');
        return;
      }

      const emailExists = await checkEmailExists(newData.newEmail);
      if (emailExists) {
        setEmailError('Ця адреса електронної пошти вже зареєстрована');
        return;
      }

      const updatedUser = await axios.put(`http://localhost:3001/users/${user.id}`, {
        username: newData.newUsername || user.username,
        email: newData.newEmail || user.email,
        password: newData.newPassword || user.password,
        avatarUrl: newData.newAvatarUrl || user.avatarUrl,
      });

      setUser(updatedUser.data);
      setSuccessMessage('Дані успішно оновлені');
    } catch (error) {
      console.error('Помилка при оновленні даних користувача:', error);
    }
  };

  const checkEmailExists = async (email) => {
    try {
      const response = await axios.get(`http://localhost:3001/users?email=${email}`);
      return response.data.length > 0;
    } catch (error) {
      console.error('Помилка перевірки існування електронної пошти:', error);
      return false;
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
<Box sx={{ width: '100%' }}>
  <AppBar position="static">
    <Toolbar>
      <IconButton
        edge="start"
        color="inherit"
        component={Link}
        to="/profile"
        sx={{ marginRight: 2 }}
      >
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        Налаштування користувача
      </Typography>
    </Toolbar>
  </AppBar>

  <Grid container justifyContent="center" mt={3}>
    {loading ? (
      <p>Завантаження даних...</p>
    ) : (
      <Grid item xs={12} md={6}>
        <form onSubmit={handleSubmit}>
          <Box  sx={{ marginBottom: 2, marginTop: 20 }}>
            <TextField 
              label="Нове ім'я користувача"
              type="text"
              name="newUsername"
              value={newData.newUsername}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              className='Text'
            />
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Нова Електронна пошта"
              type="text"
              name="newEmail"
              value={newData.newEmail}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              className='Text'
            />
          </Box>

          {emailError && <Alert severity="error">{emailError}</Alert>}

          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Новий пароль"
              type="password"
              name="newPassword"
              value={newData.newPassword}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              className='Text'
            />
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <TextField
              label="Старий пароль"
              type="password"
              name="oldPassword"
              value={newData.oldPassword}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              className='Text'
            />
          </Box>

          {passwordError && <Alert severity="error">{passwordError}</Alert>}
          {successMessage && <Alert severity="success">{successMessage}</Alert>}

          <Button type="submit" variant="contained" color="primary" mt={2} sx={{ marginLeft: 50 }} >
            <SaveIcon sx={{ marginLeft: 1 }} />
            Оновити дані
          </Button>
        </form>
      </Grid>
    )}
  </Grid>
</Box>
  );
};

export default UserSettings;