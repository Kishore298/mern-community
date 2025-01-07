import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if token exists

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/" />;
  }

  return children; // If authenticated, render children (protected route)
};

export default PrivateRoute;
