import { Card, CardContent, TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import client from '../apolloClient';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { ReactComponent as CustomIcon } from '../peacefulpulse.svg';


// GraphQL query for login
const LOGIN_QUERY = gql`
  query Login($username: String!, $password: String!) {
    logins(where: { username: $username , password: $password }) {
      username
      password
      professional 
      id
    }
  }
`;

const Login = () => {
  // State variables for username and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // Hook to navigate to different routes
  const navigate = useNavigate();

  // Callback function for successful login
  const handleLoginCompleted = (data) => {
    const login = data?.logins[0];
  
    if (login) {
      console.log('Login Successful!');
      sessionStorage.setItem('username', login.username);
      sessionStorage.setItem('id', login.id); // Store the user's ID
      sessionStorage.setItem('professional', login.professional);
      console.log(login.professional)
      navigate(`/basepage?username=${login.username}`);
    } else {
      setError(true);
      setErrorMessage('Invalid username or password');
      
    }
  };



  

  const handleLoginError = (error) => {
    console.error('Login Error:', error);
    setError(true);
    setErrorMessage('An error occurred during login');
  };

  // Apollo Client hook for executing the login query
  const [login, { loading }] = useLazyQuery(LOGIN_QUERY, {
    client,
    onCompleted: handleLoginCompleted,
    onError: handleLoginError,
  });

  // Event handler for login form submission
  const handleLogin = (e) => {
    e.preventDefault();
    setError(false);
    setErrorMessage('');
    login({ variables: { username, password } }); // Execute the login query
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      background: 'linear-gradient(135deg, #0079BF, #3AAFA9, #D4DCE1)',
      backgroundSize: '200% 200%',
      animation: 'gradientAnimation 15s ease-in-out infinite'
    }}>
      <Typography variant="h4" component="div" sx={{ marginBottom: '3rem', color: '#0047ab', textAlign: 'center', marginTop: '-10vh' }}>
        <CustomIcon style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
        PeacefulPulse
      </Typography>
      <Card sx={{
        width: '90%', // Adjust the width as needed
        maxWidth: '300px', // Maximum width for mobile view
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)'
      }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ marginBottom: '1rem', color: '#333333' }}>
            Login
          </Typography>
          <form onSubmit={handleLogin}>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              fullWidth
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              sx={{
                marginBottom: '1rem',
                borderColor: error ? 'red' : undefined,
              }}
            />
            <TextField
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'} // Toggle password visibility based on showPassword state
              variant="outlined"
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                marginBottom: '1rem',
                borderColor: error ? 'red' : undefined,
              }}
            />
            {error && (
              <Typography variant="body2" color="error" sx={{ marginBottom: '1rem' }}>
                {errorMessage}
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={loading}
              sx={{ backgroundColor: '#3f51b5', color: '#ffffff', marginTop: '1rem' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>
            <Link to="/account" style={{ textDecoration: 'none' }}>
              <Button variant="text" fullWidth sx={{ color: '#3f51b5', marginTop: '0.5rem' }}>
                Create Account
              </Button>
            </Link>
            <Link to="/passwordrecovery" style={{ textDecoration: 'none' }}>
              <Button variant="text" fullWidth sx={{ color: '#3f51b5', marginTop: '0.5rem' }}>
                Forgot Password
              </Button>
            </Link>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};


export default Login;