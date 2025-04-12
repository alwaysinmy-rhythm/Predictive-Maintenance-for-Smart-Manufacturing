import React, { useEffect, useState } from 'react';

function Dashboard() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Get username from localStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('username');
    window.location.href = '/';
  };

  return (
    <div className="dashboard">
      <nav className="dashboard-nav">
        <div className="container">
          <div className="logo">MechInsight</div>
          <div className="user-info">
            <span>Welcome, {username}</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </div>
      </nav>
      
      <div className="dashboard-content">
        <div className="container">
          <h1>Dashboard</h1>
          <p>Welcome to your MechInsight dashboard. This is where your machine monitoring data will appear.</p>
          
          {/* Placeholder for actual dashboard content */}
          <div className="dashboard-placeholder">
            <p>Machine monitoring data loading...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;