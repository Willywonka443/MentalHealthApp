import React, { useState } from 'react';
import { gql, useQuery } from '@apollo/client';
import { useNavigate } from 'react-router-dom';
import {
  IconButton,
  Grid,
  TextField,
  Box,
  Typography,
  Card,
  CardContent,
  AppBar,
  Toolbar,
} from '@mui/material';
import { CssBaseline } from '@mui/material';
import {
  AutoStories as AutoStoriesIcon,
  Create as CreateIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
  SelfImprovement as SelfImprovementIcon,
  AssignmentInd as AssignmentIndIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import client from '../apolloClient';

const JOURNALS_QUERY = gql`
  query Journals($limit: Int) {
    journals(first: $limit, where: { access: true }) {
      id
      accomplishment
      gratitude
      learning
      struggle
      lookingForward
      entryDate
      access
      login {
        username
        shareAccount
      }
    }
  }
`;

const GET_USER_NAME = gql`
  query GetUserName($username: String!) {
    logins(where: { username: $username }) {
      username
    }
  }
`;

export default function ProfessionalEntries() {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState('');
  const [filteredJournals, setFilteredJournals] = useState([]);

  const goToHome = () => {
    navigate('/basepage');
  };

  const goToJournal = () => {
    navigate('/entries');
  };

  const goToCalm = () => {
    navigate('/calm');
  };

  const goToPast = () => {
    navigate('/past');
  };

  const goToLogin = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id');
    navigate('/login');
  };

  const { data } = useQuery(JOURNALS_QUERY, {
    client,
    variables: { limit: 25 },
  });
  const { data: searchData } = useQuery(GET_USER_NAME, {
    client,
    variables: { username: searchInput },
    skip: searchInput === '', // Skip the query if searchInput is empty
  });

  const handleSearch = () => {
    if (searchData && searchData.logins && searchData.logins.length > 0) {
      const filteredJournals = data.journals.filter(
        (journal) => journal.login.username === searchData.logins[0].username
      );
      setFilteredJournals(filteredJournals);
    } else {
      setFilteredJournals([]);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };


  return (
    <>
      <CssBaseline />
      <div style={{ background: ' #b0c4de', minHeight: '100vh' }}>
        <AppBar position="sticky" sx={{ background: '#0047ab' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Patients Journals
            </Typography>
            <IconButton size="large" color="inherit" onClick={goToHome}>
              <HomeIcon />
            </IconButton>
            <IconButton size="large" color="inherit" onClick={goToCalm}>
              <SelfImprovementIcon />
            </IconButton>
            <IconButton size="large" color="inherit" onClick={goToJournal}>
              <CreateIcon />
            </IconButton>
            <IconButton size="large" color="inherit" onClick={goToPast}>
              <AutoStoriesIcon />
            </IconButton>
            <IconButton size="large" color="inherit" disabled >
              <AssignmentIndIcon />
            </IconButton>
            <IconButton size="large" color="inherit" onClick={goToLogin}>
              <LogoutIcon />
            </IconButton>
            <TextField
              label="Search by access code"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyPress={handleKeyPress}
              fullWidth
              sx={{
                marginBottom: '1rem',
                maxWidth: '300px', // Adjust the maxWidth value to make the search box smaller
              }}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={handleSearch}>
                    <SearchIcon />
                  </IconButton>
                ),
              }}
            />
          </Toolbar>
        </AppBar>

        <Grid container spacing={2} sx={{ marginTop: '2rem' }}>
          {filteredJournals.map((journal) => (
            <Grid item xs={12} sm={6} md={3} key={journal.id}>
              <Card
                sx={{
                  width: '100%',
                  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                  position: 'relative',
                }}
              >
                <CardContent>
                  <Box sx={{ height: '100%' }}>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                      {journal.entryDate}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 'bold', marginBottom: 1, fontSize: '0.9rem' }}
                    >
                      Accomplished:
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2, fontSize: '0.9rem' }}>
                      {journal.accomplishment}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 'bold', marginBottom: 1, fontSize: '0.9rem' }}
                    >
                      Grateful:
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2, fontSize: '0.9rem' }}>
                      {journal.gratitude}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 'bold', marginBottom: 1, fontSize: '0.9rem' }}
                    >
                      Learned:
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2, fontSize: '0.9rem' }}>
                      {journal.learning}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 'bold', marginBottom: 1, fontSize: '0.9rem' }}
                    >
                      Struggled:
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2, fontSize: '0.9rem' }}>
                      {journal.struggle}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 'bold', marginBottom: 1, fontSize: '0.9rem' }}
                    >
                      Looking forward:
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2, fontSize: '0.9rem' }}>
                      {journal.lookingForward}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 'bold', marginBottom: 1, fontSize: '0.9rem' }}
                    >
                      Access:
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2, fontSize: '0.9rem' }}>
                      {journal.access ? 'Access Granted' : 'Access Denied'}
                    </Typography>

                    <Box
                      sx={{
                        position: 'absolute',
                        top: '8px',
                        right: '8px',
                        width: '10px',
                        height: '10px',
                        borderRadius: '50%',
                        backgroundColor: journal.access ? '#207a5d' : '#ac2626',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
                      }}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}