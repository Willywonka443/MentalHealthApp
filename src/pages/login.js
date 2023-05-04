import { TextField, Card, CardContent } from '@mui/material';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Check if the entered username and password match the hardcoded values
    if (username === '' && password === '') {
      navigate('/basepage');
    } else {
      alert('Invalid username or password');
    }
  };

  return (
    <center>
      <center>
        <h1>Mental Health Journals</h1>
      </center>

      <Card sx={{ width: 275 }}>
        <CardContent>
          <form onSubmit={handleLogin}>
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
            <Button type="submit" size="small">
              Login
            </Button>
            <br />
            <Button variant="text" aria-label="Create Account">
              Create Account
            </Button>
          </form>
        </CardContent>
      </Card>
    </center>
  );
};

export default Login;