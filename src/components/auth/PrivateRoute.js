// src/components/auth/PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const PrivateRoute = ({ children, allowedRoles }) => {
  const { user } = useAuth();
  // Check if user is not logged in
  if (!user || !user.token) {
    return <Navigate to="/login" />;
  }
  // Check if user has required role
  if (allowedRoles && user.roles && !allowedRoles.some(role => user.roles.includes(role))) {
    return <Navigate to="/dashboard" />;
  }
  return children;
};