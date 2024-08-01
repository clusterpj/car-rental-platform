import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container, Alert } from '@mui/material';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Attempting login with:', { email, password });
    try {
      const apiUrl = process.env.REACT_APP_API_URL;
      console.log('API URL:', apiUrl); // Add this line for debugging
      if (!apiUrl) {
        throw new Error('API URL is not defined');
      }
      console.log('Sending request to:', `${apiUrl}/api/auth/login`);
      const response = await axios.post(`${apiUrl}/api/auth/login`, { email, password });
      console.log('Login response:', response.data);
      localStorage.setItem('token', response.data.token);
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error.response?.data || error.message);
      setError(error.response?.data?.error || error.message || 'Login failed. Please try again.');
    }
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4">Admin Login</Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <form onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" fullWidth variant="contained" color="primary">
          Sign In
        </Button>
      </form>
    </Container>
  );
}

export default Login;