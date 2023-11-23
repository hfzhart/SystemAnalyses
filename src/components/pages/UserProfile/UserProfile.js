import React, { useState, useEffect } from 'react';
import { Typography, Avatar, Button, Menu, MenuItem,Grid,CardContent,CardActions,Card,Box} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import avatar1 from '../../../uploads/Avatar1.png';
import avatar2 from '../../../uploads/Avatar2.png';
import avatar3 from '../../../uploads/Avatar3.png';
import avatar4 from '../../../uploads/Avatar4.png';
import avatar5 from '../../../uploads/Avatar5.png';
import avatar6 from '../../../uploads/Avatar6.png';
import './UserProfile.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('token') !== null;
  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
  const [user, setUser] = useState({
    id: null,
    username: 'Guest',
    email: '',
    avatarUrl: '',
  });
  const [anchorEl, setAnchorEl] = useState(null);

 const fetchUserData = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

      if (storedUser && isLoggedIn) {
        const user = JSON.parse(storedUser);
        setUser(user);
      } else {
        setUser({
          id: null,
          username: 'Guest',
          email: '',
          avatarUrl: '',
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [isLoggedIn]);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarChange = (newAvatarUrl) => {
    setUser((prevUser) => ({ ...prevUser, avatarUrl: newAvatarUrl }));
    handleMenuClose();
  };

  const handleLogout = async () => {
    try {
      await axios.patch(`http://localhost:3001/users/${user.id}`, { isLoggedIn: false });
      setUser({
        id: null,
        username: 'Guest',
        email: '',
        avatarUrl: '',
      });

      localStorage.removeItem('user');
      localStorage.setItem('isLoggedIn', 'false');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <div className='ProfileCard'>
    <Box display="flex" className="Box">
      <Card style={{ width: '300px', margin: '20px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">{user.username}</Typography>
              <Typography variant="body2">{user.email}</Typography>
            </Grid>
            <Grid item xs={12}>
              <Avatar alt="User Avatar" src={user.avatarUrl} sx={{ width: 100, height: 100, margin: '10px' }} />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions>
          <Button variant="outlined" onClick={handleMenuOpen}>
            Змінити аватарку
          </Button>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} PaperProps={{ style: { width: '200px' } }}>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              {avatars.map((avatar, index) => (
                <MenuItem key={index} onClick={() => handleAvatarChange(avatar)}>
                  <Avatar alt={`Аватар ${index + 1}`} src={avatar} sx={{ width: '30px', height: '30px', marginRight: '5px' }} />
                </MenuItem>
              ))}
            </div>
          </Menu>
          <Button variant="outlined" onClick={handleLogout}>
            Вийти
          </Button>
        </CardActions>
      </Card>
    </Box>
    </div>
  );
};

export default UserProfile;