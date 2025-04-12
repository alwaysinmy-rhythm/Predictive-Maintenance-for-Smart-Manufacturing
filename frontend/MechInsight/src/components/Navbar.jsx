// components/Navbar.js
import React from 'react';

function Navbar({ onLoginClick }) {
  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">MechInsight</div>
        <ul className="nav-links">
          <li><a href="#">Home</a></li>
          <li><a href="#features">Features</a></li>
          <li><a href="#about">About Us</a></li>
        </ul>
        <button className="login-button" onClick={onLoginClick}>
          Login
        </button>
      </div>
    </nav>
  );
}

export default Navbar;