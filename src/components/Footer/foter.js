import React from 'react';
import './foter.css';

function Footer() {
  const footerStyles = {
<<<<<<< Updated upstream
    fontFamily: 'IBM Plex Sans, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica Neue, Arial, Noto Sans, sans-serif, Apple Color Emoji, Segoe UI Emoji, Segoe UI Symbol, Noto Color Emoji',

  };

  return (
    <footer style={footerStyles}>
      <div className="footer-content">
        <div className='TextColor'>
        <p>&copy; 2023 SystemAnalyses. Усі права захищені.</p>
        <ul>
          <li><a href="/privacy-policy">Політика конфіденційності</a></li>
          <li><a href="/terms-of-use">Умови використання сайту</a></li>
          <li className='fix'><a href="/help">Допомога Користувачеві</a></li>
        </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

