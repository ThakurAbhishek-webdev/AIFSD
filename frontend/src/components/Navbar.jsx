// src/components/Navbar.jsx — Top navigation bar

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();

  // Get user info from localStorage
  const user = JSON.parse(localStorage.getItem('user') || 'null');

  // Handle logout: clear storage and redirect to login
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <header className="navbar">
      <Link to="/employees" className="brand">
        🏢 Employee Analytics
      </Link>

      <nav>
        {user ? (
          // Show navigation links when user is logged in
          <>
            <Link to="/employees">Employees</Link>
            <Link to="/employees/add">Add Employee</Link>
            <Link to="/ai-recommend">AI Recommend</Link>
            <span style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>
              👤 {user.name}
            </span>
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </>
        ) : (
          // Show login/signup when not logged in
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Navbar;
