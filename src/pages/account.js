import React, { useState } from 'react';
import { gql, useMutation, useLazyQuery } from '@apollo/client';
import { Card, CardContent, TextField, Button, Typography, IconButton, InputAdornment, FormLabel, Switch, Grid } from '@mui/material';
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
    $shareAccount: Boolean!
  ) {
    createLogin(
      data: {
        username: $username,
        firstName: $firstName,
        lastName: $lastName,
        email: $email,
        password: $password,
        shareAccount: $shareAccount
      }
    ) {
      username
      firstName
      lastName
      email
      password
      shareAccount
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

const CHECK_USERNAME_AVAILABILITY = gql`
  query CheckLogins($username: String!) {
    logins(where: { username: $username }) {
      username
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
  const [professional, setprofessional] = useState(false);
  const [shareAccount, setshareAccount] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [createLogin] = useMutation(CREATE_LOGIN, { client });
  const [publishLogin] = useMutation(PUBLISH_LOGIN, { client });
  const navigate = useNavigate();
  const [isFormValid, setIsFormValid] = useState(false);

  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

  const [checkUsernameAvailability] = useLazyQuery(CHECK_USERNAME_AVAILABILITY, {
    client,
    variables: {
      username: "desiredUsername"
    }
  });

  const handleUsernameChange = async (e) => {
    const enteredUsername = e.target.value;
    setUsername(enteredUsername);
    try {
      const { data } = await checkUsernameAvailability({
        variables: {
          username: enteredUsername,
        },
      });
      const isTaken = data.logins.length > 0;
      setIsUsernameTaken(isTaken);
      setIsFormValid(
        enteredUsername &&
        password &&
        password === confirmPassword &&
        !isTaken
      );
    } catch (error) {
      console.error(error);
      setIsUsernameTaken(false);
      setIsFormValid(false);
    }
  };

  const handleCreateAccount = async (e) => {
    e.preventDefault();

    if (isUsernameTaken) {
      alert(`The username "${username}" is already taken. Please try another one.`);
      return;
    }

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
            shareAccount,
            professional
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
        <CardContent>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Create Account
          </Typography>
          <form onSubmit={handleCreateAccount} style={{ display: 'grid', gap: '1rem' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="firstName"
                  label="First Name"
                  variant="standard"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="lastName"
                  label="Last Name"
                  variant="standard"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="email"
                  label="Email"
                  variant="standard"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  fullWidth
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="username"
                  label="Username"
                  variant="standard"
                  value={username}
                  onChange={handleUsernameChange}
                  fullWidth
                  margin="normal"
                  error={isUsernameTaken} // Add the error prop based on isUsernameTaken state
                  helperText={isUsernameTaken && "This username is already taken"} // Display helper text if the username is taken
                />
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <FormLabel>Share Account</FormLabel>
                  </Grid>
                  <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
                    <Switch
                      checked={shareAccount}
                      onChange={(e) => setshareAccount(e.target.checked)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Grid container alignItems="center">
                  <Grid item xs={12} sm={6}>
                    <FormLabel>Are you a professional?</FormLabel>
                  </Grid>
                  <Grid item xs={12} sm={6} style={{ textAlign: 'center' }}>
                    <Switch
                      checked={professional}
                      onChange={(e) => setprofessional(e.target.checked)}
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={12} sm={6}>
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
              </Grid>
              <Grid item xs={6}>
                <Link to="/login" style={{ textDecoration: 'none' }}>
                  <Button variant="text" fullWidth sx={{ color: '#3f51b5' }}>
                    Back
                  </Button>
                </Link>
              </Grid>
              <Grid item xs={6}>
                <Button
                  type="submit"
                  variant="contained"
                  sx={{ color: '#ffffff', background: '#3f51b5' }}
                  disabled={!isFormValid}
                >
                  Create Account
                </Button>
              </Grid>
            </Grid>
          </form>
        </CardContent>
      </Card>
    </div>

  );
};


export default CreateAccount;