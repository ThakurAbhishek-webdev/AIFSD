// src/components/ProtectedRoute.jsx — Redirects to login if user is not authenticated

import React from 'react';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  // Check if a token exists in localStorage
  const token = localStorage.getItem('token');

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the protected child component
  return children;
}

export default ProtectedRoute;
