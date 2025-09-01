import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export const PrivateRoute = ({ children, roles }) => {
  const { user } = useAuth();

  if (!user || !user.token) return <Navigate to="/login" />;

  if (roles && user.role && !roles.includes(user.role)) return <Navigate to="/dashboard" />;

  return children;
};
