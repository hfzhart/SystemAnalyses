import React, { useEffect } from "react";
import { useSpring, animated } from "react-spring";
import MyLineChart from "../Lines/MyLineChart";
import Header from "../Header";
import Footer from "../Footer/foter";
import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import BarChartComponent from "../Lines/BarChartComponent";
import PieChartComponent from "../Lines/PieChartComponent";
import './StartPage.css';
import Divider from '@mui/material/Divider';
import { main } from "../../images";

function StartPage() {
  
  const chartAnimationProps = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(100px)" },
    config: { tension: 125, friction: 120 }, 
  });

  
  const textAnimationProps = useSpring({
    opacity: 1,
    transform: "translateY(0)",
    from: { opacity: 0, transform: "translateY(50px)" },
    config: { tension: 125, friction: 120 }, 
  });

  useEffect(() => {
  
    const handleScroll = () => {
   
      const title = document.querySelector('.title');
      if (title) {
        const titleRect = title.getBoundingClientRect();
        const titleInViewport = titleRect.top <= window.innerHeight / 2;
        if (titleInViewport) {
          title.classList.add('fade-in');
        }
      }

      const subtitle = document.querySelector('.subtitle');
      if (subtitle) {
        const subtitleRect = subtitle.getBoundingClientRect();
        const subtitleInViewport = subtitleRect.top <= window.innerHeight / 2;
        if (subtitleInViewport) {
          subtitle.classList.add('fade-in');
        }
      }
    };
    


    window.addEventListener('scroll', handleScroll);

    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []); 

  return (
    
    <div className="start-page-container">
      <Header />
      <img
      src={main}
      alt="Powerful Products"
      style={{ width: '100%', maxHeight: '500px', objectFit: 'cover' }}
      />

      <Box
        className="title"
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
        <h1 style={{ margin: 0, fontSize: '3rem' }}>Unlock the power of your products</h1>
        <Box sx={{ width: '100%', marginTop: '5px' }}>
          <Button variant="contained" color="primary" component={Link} to="/register" sx={{ margin: 'auto' }}>
            Реєстрація
          </Button>
          <h1 className="subtitle" style={{ maxWidth: '1040px', margin: '10px auto', fontSize: '1.5rem' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum
          </h1>
        </Box>
      </Box>
      <div className="spacer4"></div>
      <animated.div style={textAnimationProps}>
        <h1 style={{ margin: 0, fontSize: '3rem', textAlign: 'center' }}>Quick Learn</h1>
      </animated.div>
      <Divider variant="middle" sx={{ my: '20px', borderColor: '#EAEAEA' }} />

      <div className="spacer5"></div>
      <animated.div style={chartAnimationProps}>
        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
          <Box sx={{ flex: 1, marginLeft: '20px' }}>
            <BarChartComponent />
          </Box>
          <Box sx={{ flex: 1, marginLeft: '20px' }}>
            <p className="LineText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
          </Box>
        </Box>
      </animated.div>

      <Divider variant="middle" sx={{ my: '20px', borderColor: '#EAEAEA' }} />

     
      <animated.div style={chartAnimationProps}> й
        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
          <Box sx={{ flex: 1, marginLeft: '20px' }}>
            <PieChartComponent />
          </Box>
          <Box sx={{ flex: 1, marginLeft: '20px' }}>
            <p className="LineText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          </Box>
        </Box>
      </animated.div>

      <Divider variant="middle" sx={{ my: '20px', borderColor: '#EAEAEA' }} />

    
      <animated.div style={chartAnimationProps}>
        <Box sx={{ display: 'flex', flexDirection: 'row', marginTop: '20px' }}>
          <Box sx={{ flex: 1, marginLeft: '20px' }}>
            <MyLineChart />
          </Box>
          <Box sx={{ flex: 1, marginLeft: '20px' }}>
            <p className="LineText">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
              Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum</p>
          </Box>
        </Box>
      </animated.div>

      <Divider variant="middle" sx={{ my: '20px', borderColor: '#EAEAEA' }} />

    
      <animated.div style={chartAnimationProps}>
        <Box
          className="parallax"
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
      </animated.div>
      
      <div className="spacer"></div>

      <div className="footer-wrapper">
        <Footer />
      </div>
    </div>
  );
}

export default StartPage;
