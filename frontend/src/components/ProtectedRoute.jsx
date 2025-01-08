import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }) => {
  const token = localStorage.getItem('token'); // Check if token exists

  // If no token, redirect to login page
  if (!token) {
    return <Navigate to="/" />;
  }

  return element; // If authenticated, render the protected component
};

export default PrivateRoute;
