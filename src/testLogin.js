import { useEffect } from 'react';
import axiosInstance from './api/api';

function TestLogin() {
  useEffect(() => {
    axiosInstance.post('/auth/login', { username: 'admin', password: 'admin123' })
      .then(res => {
        console.log('Login Response:', res.data);
        localStorage.setItem('token', res.data.token);
      })
      .catch(err => console.error(err));
  }, []);

  return <div>Check console for login test</div>;
}

export default TestLogin;
