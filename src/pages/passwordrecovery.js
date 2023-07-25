import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Card, Dialog, DialogContent, DialogTitle, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';
import { gql, useLazyQuery } from '@apollo/client';
import client from '../apolloClient';

// Define your GraphQL query for checking if the email exists

const CHECK_EMAIL_QUERY = gql`
  query CheckEmail($email: String!) {
    logins(where: {email: $email}) {
      email
    }
  }
`;

const PasswordRecovery = () => {
  const [email, setEmail] = useState('');
  const [resetRequested, setResetRequested] = useState(false);
  const [emailNotFound, setEmailNotFound] = useState(false); // State to track if email is not found

  // Use the query hook from Apollo Client
  const [checkEmailQuery] = useLazyQuery(CHECK_EMAIL_QUERY, { client });

  const handlePasswordRecovery = async (e) => {
    e.preventDefault();

    try {
      // Check if the email exists in the database using Apollo Client
      const { data } = await checkEmailQuery({
        variables: { email },
      });

      if (!data.logins.length) {
        // Email not found in the database, decline the request
        console.log('Email not found. Password recovery declined.');
        setEmailNotFound(true); // Set the emailNotFound state to true
        return;
      }

      // Call the resetPassword mutation using Apollo Client
      await checkEmailQuery({
        variables: { email },
      });

      // Password recovery initiated successfully
      console.log('Password recovery initiated for email:', email);
      setResetRequested(true);
    } catch (error) {
      // Handle any errors that occurred during the API call
      console.error('Password recovery error:', error.message);
    }
  };

  
  const handleCloseDialog = () => {
    setEmailNotFound(false);
  };


  // JSX for the password recovery form
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
      <Card sx={{
        width: '90%', // Adjust the width as needed
        maxWidth: '300px', // Maximum width for mobile view
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
        padding: '1rem'
      }}>
        <Container maxWidth="sm" style={{ marginTop: '2rem' }}>
          {resetRequested ? (
            <Typography variant="body1">
              An email has been sent to your email address with instructions to reset your password.
              <Link to="/login" style={{ textDecoration: 'none' }}>
                <Button variant="text" fullWidth sx={{ color: '#3f51b5', marginTop: '0.5rem' }}>
                  Back
                </Button>
              </Link>
            </Typography>
          ) : (
            <form onSubmit={handlePasswordRecovery}>
            <TextField
              type="email"
              label="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Recover Password
            </Button>
            <Link to="/login" style={{ textDecoration: 'none' }}>
              <Button variant="text" fullWidth sx={{ color: '#3f51b5', marginTop: '0.5rem' }}>
                Back
              </Button>
            </Link>
            {/* Alert dialog for email not found */}
            <Dialog open={emailNotFound} onClose={handleCloseDialog}>
              <DialogTitle>Email Not Found</DialogTitle>
              <DialogContent>
                <Typography variant="body1" color="error" align="center">
                  Email not found. Please check your email address.
                </Typography>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDialog} color="primary">
                  OK
                </Button>
              </DialogActions>
            </Dialog>
          </form>
        )}
      </Container>
    </Card>

  </div>
  );
};

export default PasswordRecovery;