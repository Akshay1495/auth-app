// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      setError('Please fill in both fields.');
      return;
    }

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    try {
      const requestBody = JSON.stringify({ username: trimmedUsername, password: trimmedPassword });
      console.log('Request Body:', requestBody);

      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: requestBody,
      });

      const responseText = await response.text();
      console.log('Response Status:', response.status);
      console.log('Response Text:', responseText);

      const data = responseText ? JSON.parse(responseText) : {};
      console.log('Response Data:', data);

      if (response.ok) {
        localStorage.setItem('user', JSON.stringify(data));
        navigate('/profile');
      } else {
        setError(data.message || 'Invalid username or password');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h4>Welcome back! 👋</h4>
        <h3>Sign in to your account</h3>
        <div className="input-group">
          <label>Your email</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button onClick={handleLogin}>CONTINUE</button>
        {error && <p className="error">{error}</p>}
        <p className="forgot-password">Forgot your password?</p>
        <p className="sign-up">
          Don’t have an account? <a href="#">Sign up</a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
