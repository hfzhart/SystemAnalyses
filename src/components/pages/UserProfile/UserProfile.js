import React, { useState, useEffect } from 'react';
import {Typography,Avatar,Menu,MenuItem,Grid,CardContent,CardActions,Box, Drawer, List, ListItem, ListItemText, CssBaseline, IconButton,} from '@mui/material';
import { useNavigate, Link, Outlet } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import MenuIcon from '@mui/icons-material/Menu';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Divider from '@mui/material/Divider';
import SaveIcon from '@mui/icons-material/Save';
import avatar1 from '../../../uploads/Avatar1.png';
import avatar2 from '../../../uploads/Avatar2.png';
import avatar3 from '../../../uploads/Avatar3.png';
import avatar4 from '../../../uploads/Avatar4.png';
import avatar5 from '../../../uploads/Avatar5.png';
import avatar6 from '../../../uploads/Avatar6.png';
import './UserProfile.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5, avatar6];
  const [user, setUser] = useState({
    id: null,
    username: 'Guest',
    email: '',
    avatarUrl: '',
  });
  const [anchorEl, setAnchorEl] = useState(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [previewAvatar, setPreviewAvatar] = useState(user.avatarUrl || null);

  const fetchUserData = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  
      if (storedUser && isLoggedIn) {
        const user = JSON.parse(storedUser);
        const response = await axios.get(`http://localhost:3001/users/${user.id}`);
        const updatedUser = response.data;
        setUser(updatedUser);
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
  }, []);
  
  useEffect(() => {
    console.log('user.avatarUrl changed:', user.avatarUrl);
    setPreviewAvatar(user.avatarUrl || null);
  }, [user.avatarUrl]);
  
  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAvatarChange = (newAvatarUrl) => {
    setSelectedAvatar(newAvatarUrl);
    setPreviewAvatar(newAvatarUrl);
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
      setPreviewAvatar(null);
      localStorage.removeItem('user');
      localStorage.setItem('isLoggedIn', 'false');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleSaveAvatar = async () => {
    try {
      await axios.patch(`http://localhost:3001/users/${user.id}`, { avatarUrl: selectedAvatar });
      setUser((prevUser) => ({ ...prevUser, avatarUrl: selectedAvatar }));
      setPreviewAvatar(selectedAvatar);
      toast.success('Аватарка успішно збережена!');
    } catch (error) {
      console.error('Error saving avatar:', error);
      toast.error('Помилка при зберіганні аватарки.');
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };



  return (
    <div className={`ProfileCard ${isSidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <CssBaseline />

      <Box display="flex">

       
        <Drawer
          variant="persistent"
          anchor="left"
          open={isSidebarOpen}
          sx={{ 
            zIndex: 1200,
            '& .MuiPaper-root': {
              backgroundColor: '#F1F4F9', 
            },
          }}
        >
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6">{user.username}</Typography>
                <Typography variant="body2">{user.email}</Typography>
              </Grid>
              <Grid item xs={12}>
                <Avatar alt="User Avatar" src={previewAvatar} sx={{ width: 150, height: 150, margin: '15px' }} />
              </Grid>
            </Grid>
          </CardContent>
          <IconButton
            color="inherit"
            aria-label="close sidebar"
            onClick={toggleSidebar}
            sx={{
              position: 'absolute',
              top: 10,
              right: 10,
              fontSize: 30,
            }}
          >
            <MenuIcon />
          </IconButton>
          <CardActions>
            <IconButton onClick={handleMenuOpen}>
              <SettingsIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose} PaperProps={{ style: { width: '450px' } }}>
              <div style={{ display: 'flex', flexWrap: 'wrap',padding: '16px' }}>
                {avatars.map((avatar, index) => (
                  <MenuItem key={index} onClick={() => handleAvatarChange(avatar)}>
                    <Avatar alt={`Аватар ${index + 1}`} src={avatar} sx={{ width: '100px', height: '100px', marginRight: '5px' }} />
                  </MenuItem>
                ))}
              </div>
            </Menu>
            <IconButton onClick={handleLogout}>
              <ExitToAppIcon/>
            </IconButton>
            <IconButton onClick={handleSaveAvatar}>
              <SaveIcon />
            </IconButton>
          </CardActions>
          <List>
            {['Dashboard 1', 'Dashboard 2', 'Dashboard 3'].map((text, index) => (
              <div key={text}>
                <ListItem button component={Link} to={`/dashboard/${index + 1}`} onClick={toggleSidebar}>
                    <DashboardIcon />
                  <ListItemText primary={text} />
                </ListItem>
                {index !== 2 && <Divider />} 
              </div>
            ))}
          </List>
          <Divider />
        </Drawer>

        
        <IconButton
          color="inherit"
          aria-label="open sidebar"
          onClick={toggleSidebar}
          sx={{
            fontSize: 40,
          }}
        >
          <MenuIcon />
        </IconButton>

       
        <Box ml={isSidebarOpen ? 300 : 0} p={2}>
          <Outlet />
        </Box>

      </Box>

      
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

    </div>
  );
};

export default UserProfile;
