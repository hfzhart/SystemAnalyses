import React from 'react';
import './foter.css';

function Footer() {
  const footerStyles = {

    
    fontFamily: "Nunito Sans, sans-serif"

  };

  return (
    <footer style={footerStyles}>
      <div className="footer-content">
        <div className='TextColor'>
        <p>&copy; 2023 SystemAnalyses. Усі права захищені.</p>
        <ul>
          <li><a href="/privacy-policy">Політика конфіденційності</a></li>
          <li><a href="/terms-of-use">Умови використання сайту</a></li>
          <li className='fix'><a href="/help">Допомога користувачеві</a></li>
        </ul>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

