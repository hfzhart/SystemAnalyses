import React from 'react';
import './foter.css'

function Footer() {
  const footerStyles = {
    fontFamily: 'IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',
    backgroundColor: 'white',
    color: '#1976d2',
    padding: '1px',
    textAlign: 'center',
    boxShadow: '0px -5px 10px rgba(0, 0, 0, 0.2)',
    border: '1px solid #555', 
  };

  return (
    <footer style={footerStyles}>
      <div className="footer-content">
        <p>&copy; 2023 SystemAnalyses. Усі права захищені.</p>
        <ul>
          <li><a href="#">Політика конфіденційності</a></li>
          <li><a href="#">Умови використання сайту</a></li>
          <li><a href="#">Допомога користувачеві</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
