// src/context/AuthContext.js
import React, { createContext, useContext, useState } from 'react';
import { login as apiLogin, register as apiRegister } from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const normalizeRoles = (roleField) => {
    if (!roleField) return [];
    return Array.isArray(roleField) ? roleField : [roleField];
  };

  const login = async (username, password) => {
    const response = await apiLogin({ username, password });
    console.log('Raw backend login response:', response); // <-- Add this for debugging
    const roles = normalizeRoles(response.roles); // <-- Use .roles here
    const userData = { username: response.username, token: response.token, roles };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', response.token);
    return { ...response, roles };
  };

  const register = async (username, password) => {
    const response = await apiRegister({ username, password });
    console.log('Raw backend register response:', response); // <-- Add this for debugging
    const roles = normalizeRoles(response.roles); // <-- Use .roles here
    const userData = { username: response.username, token: response.token, roles };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    localStorage.setItem('token', response.token);
    return { ...response, roles };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);