import React, { useState, useEffect } from 'react';
import { Typography, Avatar, Button, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./UserProfile.css"
import avatar1 from '../../../uploads/Avatar1.png';
import avatar2 from '../../../uploads/Avatar2.png';
import avatar3 from '../../../uploads/Avatar3.png';
import avatar4 from '../../../uploads/Avatar4.png';
import avatar5 from '../../../uploads/Avatar5.png';
import avatar6 from '../../../uploads/Avatar6.png';

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
  const [user, setUser] = useState({
    id: 1,
    username: '', // Убедитесь, что у вас есть значение для username
    email: '',
    avatarUrl: avatar1,
  });
  const [anchorEl, setAnchorEl] = useState(null);

  const fetchUserData = async () => {
    try {
      const timestamp = new Date().getTime();
      const response = await axios.get(`http://localhost:3001/users?timestamp=${timestamp}`);
      setUserData(response.data);
      setUser(response.data[0]); // Предполагая, что у вас есть только один пользователь
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarChange = async (newAvatarUrl) => {
    try {
      // Обновление аватара в локальном состоянии
      setUser((prevUser) => ({ ...prevUser, avatarUrl: newAvatarUrl }));
      handleMenuClose();

      // Отправка запроса на сервер для обновления аватара в базе данных
      await axios.patch(`http://localhost:3001/users/${user.id}`, { avatarUrl: newAvatarUrl });
    } catch (error) {
      console.error('Error updating avatar:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await axios.patch(`http://localhost:3001/users/${user.id}`, { isLoggedIn: false });

      setUserData(null);
      setUser({
        id: 1,
        username: '',
        email: '',
        avatarUrl: avatar1,
      });

      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userId');

      fetchUserData();

      navigate('/');
    } catch (error) {
      console.error('Ошибка выхода:', error);
    }
  };

  return (
    <div className='ProfileCard'>
      <Typography variant="h6">{user.username}</Typography>
      <Typography variant="body2">{user.email}</Typography>
      <Avatar alt="User Avatar" src={user.avatarUrl} sx={{ width: 300, height: 300, margin: '10px' }} />

      <div>
        <Button variant="outlined" onClick={handleMenuOpen}>
          Сменить аватар
        </Button>
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} PaperProps={{ style: { width: '200px' } }}>
          <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {avatars.map((avatar, index) => (
              <MenuItem key={index} onClick={() => handleAvatarChange(avatar)}>
                <Avatar alt={`Аватар ${index + 1}`} src={avatar} sx={{ width: '60px', height: '60px', marginRight: '5px' }} />
              </MenuItem>
            ))}
          </div>
        </Menu>
      </div>

      <Button variant="outlined" onClick={handleLogout}>
        Выйти
      </Button>
    </div>
  );
};

export default UserProfile;
