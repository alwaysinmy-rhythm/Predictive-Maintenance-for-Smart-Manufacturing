import React, { useState } from 'react';
import './CSS/LoginModal.css'; // Make sure to create this CSS file
import { useNavigate } from "react-router-dom";

const BACKEND_URL = 'https://predictive-maintenance-for-smart.onrender.com'

const LoginModal = ({ onClose }) => {
  
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Login submitted with:', { username, password });
    // Here you would typically handle the login logic
    // For example, call an API to authenticate the user
    
    // After handling the login, close the modal
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h2>Login</h2>
          <button 
            onClick={onClose}
            className="close-button"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="form-submit">
  <button
    type="submit"
    className="submit-button"
    onClick={async (e) => {
      e.preventDefault();
      try {
        const response = await fetch(`${BACKEND_URL}/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
        
        const data = await response.json();
        // console.log(data);
        if (response.ok) {
          // Store JWT token in localStorage
          localStorage.setItem('token', data.token);
          
          // Alternatively, if using React Router:
          navigate('/dashboard');
        } else {
          // Handle error case
          alert(data.message || 'Login failed. Please try again.');
        }
      } catch (error) {
        // console.error('Login error:', error);
        alert('An error occurred during login. Please try again.');
      }
    }}
  >
    Sign In
  </button>
</div>
          
          <div className="forgot-password">
            <a href="#">
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginModal;