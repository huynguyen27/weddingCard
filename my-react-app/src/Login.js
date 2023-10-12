import React, { useState } from 'react';
import { usePasswordValidator } from './firebase/FirebaseActions'; // Import the validatePassword function
import './css/Login.css'; // Import your CSS file

const Login = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Get the password validation function from the hook
  const validatePassword = usePasswordValidator();

  const handleLogin = async (e) => {
    e.preventDefault();

    // Validate the entered password using the validatePassword function
    const isPasswordValid = validatePassword(password);

    if (isPasswordValid) {
      // Call the onLogin function with the success attribute
      onLogin(true);
    } else {
      setError('Incorrect password. Please try again.');
      setTimeout(() => {
        setError('');
      }, 1000);
    }

  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Login</h1>
        <form className="login-form" onSubmit={handleLogin}>
          <label htmlFor="password">Password</label>
          <input
            className="login-input"
            type="password"
            id="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">
            Login
          </button>
        </form>
        {error && <p className="error-message">{error}</p>}
      </div>
    </div>
  );
  
};

export default Login;
