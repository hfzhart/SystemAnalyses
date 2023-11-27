import React from "react";
import MyLineChart from "../Lines/MyLineChart";
import Header from "../Header";
import Footer from "../Footer/foter";
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import './StartPage.css';

function StartPage() {
  return (
    <div className="start-page-container">
      <Header />
      <div className="spacer2"></div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          backgroundColor: '#F1F4F9',
          color: 'black',
          padding: '10px', 
          minHeight: '150px', 
        }}
      >
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>Unlock the power of your products</h1>
        <Box sx={{ width: '100%', marginTop: '5px' }}>
          <Button variant="contained" color="primary" component={Link} to="/register" sx={{ margin: 'auto' }}>
            Реєстрація
          </Button>
          <h1 style={{ maxWidth: '600px', margin: '10px auto', fontSize: '1rem' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </h1>
        </Box>
      </Box>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          opacity: 0,
          transform: 'translateY(100px)',
          transition: 'opacity 0.5s, transform 0.5s',
        }}
        sx1={{
          marginTop: '20px',
        }}
      >
        <MyLineChart />
      </Box>

      <div className="spacer"></div>

      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>
  );
}

export default StartPage;
