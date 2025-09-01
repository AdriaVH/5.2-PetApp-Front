import React, { createContext, useContext, useState } from 'react';
import { login as apiLogin, register as apiRegister } from '../api/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const login = async (username, password) => {
    const response = await apiLogin({ username, password });
    // Save role from backend
    setUser({ username: response.username, token: response.token, role: response.role });
    localStorage.setItem('user', JSON.stringify({ username: response.username, token: response.token, role: response.role }));
    localStorage.setItem('token', response.token);
    return response;
  };

  const register = async (username, password) => {
    const response = await apiRegister({ username, password });
    setUser({ username: response.username, token: response.token, role: response.role });
    localStorage.setItem('user', JSON.stringify({ username: response.username, token: response.token, role: response.role }));
    localStorage.setItem('token', response.token);
    return response;
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
