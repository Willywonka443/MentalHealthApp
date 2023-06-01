import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import { TextField, Card, CardContent, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import client from '../apolloClient';

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

  return (
    <center>
      <h1>Create Account</h1>
      <Card sx={{ width: 275 }}>
        <CardContent>
          <form onSubmit={handleCreateAccount}>
            <TextField
              id="username"
              label="Username:"
              variant="standard"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <br />
            <TextField
              id="password"
              label="Password:"
              type="password"
              variant="standard"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <TextField
              id="confirm-password"
              label="Confirm Password:"
              type="password"
              variant="standard"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <br />
            <TextField
              id="firstName"
              label="First Name:"
              variant="standard"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <br />
            <TextField
              id="lastName"
              label="Last Name:"
              variant="standard"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <br />
            <TextField
              id="email"
              label="Email:"
              variant="standard"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <Button type="submit" size="small">
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </center>
  );
};

export default CreateAccount;