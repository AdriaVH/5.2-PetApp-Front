import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { LoginForm as Login } from './components/auth/LoginForm';
import { RegisterForm as Register } from './components/auth/RegisterForm';
import { Dashboard } from './pages/Dashboard';
import { AdminDashboard as Admin } from './pages/AdminDashboard';
import { PrivateRoute } from "./components/auth/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={
          <PrivateRoute roles={['ROLE_USER']}>
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/admin" element={
          <PrivateRoute roles={['ROLE_ADMIN']}>
            <Admin />
          </PrivateRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;
