import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { useAuth } from '../context/AuthContext';
import '../styles/Login.css';
import SocialLogin from '../components/SocialLogin'


const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        // Redirect to the page they were trying to access, or home if none
        const from = location.state?.from || '/';
        navigate(from);
      }
    } catch (err) {
      setError('Invalid email or password');
    }
  };

  const handleGoogleLogin = async () => {
  // Call your social login API or Firebase Google sign-in
  alert('Google login clicked (implement your logic)');
};

const handleFacebookLogin = async () => {
  // Call your social login API or Firebase Facebook sign-in
  alert('Facebook login clicked (implement your logic)');
};


  return (
    <div className="login-section">
      
        <div className="login-card">
          <h1 className="login-title">
            Login
          </h1>

          {error && (
            <Alert variant="danger" className="mb-4" onClose={() => setError('')} dismissible>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </Form.Group>

            <Button
              type="submit"
              variant="danger"
              size="lg"
              className="w-100 mb-3 login-button"
            >
              Login
            </Button>
          </Form>
        <SocialLogin
      onGoogleLogin={handleGoogleLogin} 
      onFacebookLogin={handleFacebookLogin} 
    />



          <p className="text-center mt-3">
            Don't have an account?{' '}
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                navigate('/register', { state: location.state });
              }}
              className="register-link"
            >
              Register here
            </a>
          </p>
        </div>
      
    </div>
  );
};

export default Login; 