import React from 'react';

function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <p>Contact Us: info@TeeTime.com | +123 456 7890</p>
        <ul className="social-links">
          <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-twitter"></i> Twitter</a></li>
          <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-facebook"></i> Facebook</a></li>
          <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="bi bi-instagram"></i> Instagram</a></li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;