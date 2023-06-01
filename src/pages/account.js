import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { Card, CardContent, TextField, Button, Typography, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import client from '../apolloClient';
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const CREATE_LOGIN = gql`
  mutation createLogin(
    $username: String!,
    $firstName: String!,
    $lastName: String!,
    $email: String!,
    $password: String!,  
  ) {
    createLogin(
      data: {
        username: $username,
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        password: $password,   
      }
    ) {
      username
      firstName
      lastName
      email
      password
      id
      stage 
    }
  }
`;

const PUBLISH_LOGIN = gql`
  mutation publishLogin($id: ID!) {
    publishLogin(
      where: { id: $id }
      to: PUBLISHED
    ) {
      id
    }
  }
`;

const CreateAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [createLogin] = useMutation(CREATE_LOGIN, { client });
  const [publishLogin] = useMutation(PUBLISH_LOGIN, { client });
  const navigate = useNavigate();

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    // Check if the entered username and password meet your requirements
    if (username && password && password === confirmPassword) {
      try {
        // Create a new login in the database
        const { data } = await createLogin({
          variables: {
            username,
            password,
            firstName,
            lastName,
            email,
          },
        });

        // Publish the new login to make it visible to other users
        await publishLogin({
          variables: {
            id: data.createLogin.id,
          },
        });

        // Navigate to the login page
        navigate('/login');
      } catch (error) {
        console.error(error);
        alert('An error occurred while creating your account');
      }
    } else {
      alert('Please enter a valid username and password');
    }
  };
  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleToggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div style={{ background: 'linear-gradient(135deg, #0079BF, #3AAFA9, #D4DCE1)', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Card sx={{ width: 400, maxHeight: '80vh', overflow: 'auto' }}>
        <CardContent style={{ display: 'grid', gap: '1rem' }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Create Account
          </Typography>
          <form onSubmit={handleCreateAccount} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <TextField
              id="firstName"
              label="First Name"
              variant="standard"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              id="lastName"
              label="Last Name"
              variant="standard"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              id="email"
              label="Email"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              id="username"
              label="Username"
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              fullWidth
              margin="normal"
            />
            <TextField
              id="password"
              label="Password"
              type={showPassword ? 'text' : 'password'}
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              fullWidth
              margin="normal"
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
            />
            <TextField
              id="confirm-password"
              label="Confirm Password"
              type={showConfirmPassword ? 'text' : 'password'}
              variant="standard"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              fullWidth
              margin="normal"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      edge="end"
                      aria-label="toggle password visibility"
                      onClick={handleToggleConfirmPasswordVisibility}
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
             <Link to="/login" style={{ textDecoration: 'none' }}>
            <Button variant="text" fullWidth sx={{ color: '#3f51b5', gridColumn: '1' }}>
              Back
            </Button>
            </Link>
            <Button type="submit" variant="contained" sx={{ color: '#ffffff', background: '#3f51b5', gridColumn: '2' }}>
              Create Account
            </Button>
           
          </form>
        </CardContent>
      </Card>
    </div>

  );
};


export default CreateAccount;