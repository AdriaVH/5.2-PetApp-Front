import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

// Automatically add token
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auth API
export const login = (data) => axiosInstance.post('/auth/login', data).then(res => res.data);
export const register = (data) => axiosInstance.post('/auth/register', data).then(res => res.data);

// Pet API
export const getPets = () => axiosInstance.get('/pets').then(res => res.data);
export const createPet = (data) => axiosInstance.post('/pets', data).then(res => res.data);
export const updatePet = (id, data) => axiosInstance.put(`/pets/${id}`, data).then(res => res.data);
export const deletePet = (id) => axiosInstance.delete(`/pets/${id}`).then(res => res.data);

export default axiosInstance;
