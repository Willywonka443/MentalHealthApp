import client from "../apolloClient";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import { IconButton, Grid, Card, CardContent, Typography, Box, AppBar, Toolbar } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LogoutIcon from '@mui/icons-material/Logout';
import React from "react";
import { CssBaseline } from '@mui/material';

const JOURNALS_QUERY = gql`
  query Journals($limit: Int) {
    journals(first: $limit) {
      id
      accomplishment
      gratitude
      learning
      struggle
      lookingForward
      entryDate
      login {
        username
      }
    }
  }
`;  

export default function Past({ restId, setRestId }) {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/basepage");
  };

  const goToCalm = () => {
    navigate("/calm");
  };

  const goToJournal = () => {
    navigate("/entries");
  };

  const goToLogin = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id');
    navigate("/login");
  };

  const storedUsername = sessionStorage.getItem('username');

  const { loading, error, data } = useQuery(JOURNALS_QUERY, {
    client,
    variables: { limit: 25 },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  // Filter journal entries based on stored username
  const filteredJournals = data.journals.filter(
    (journal) => journal.login && journal.login.username === storedUsername
  );

  return (
    <>
     <CssBaseline />
      <div style={{ background: ' #b0c4de', minHeight: '100vh' }}>
      <AppBar position="sticky" sx={{ background: '#0047ab' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Past Journals{restId}
          </Typography>
          <IconButton size="large"   color="inherit"  onClick={() => goToHome()}>
            <HomeIcon />
          </IconButton>
          <IconButton size="large"   color="inherit"  onClick={() => goToCalm()}>
            <SelfImprovementIcon />
          </IconButton>
          <IconButton size="large"   color="inherit"  onClick={() => goToJournal()}>
            <CreateIcon />
          </IconButton>
          <IconButton size="large" disabled>
            <AutoStoriesIcon />
          </IconButton>
          <IconButton size="large"   color="inherit"  onClick={() => goToLogin()}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
        {filteredJournals.map((journal) => (
          <Grid item xs={12} sm={6} md={4} key={journal.id}>
            <Card>
              <CardContent>
                <Box>
                  <Typography variant="h6">{journal.entryDate}</Typography>
                  <Typography variant="body1">1: {journal.accomplishment}</Typography>
                  <Typography variant="body1">2: {journal.gratitude}</Typography>
                  <Typography variant="body1">3: {journal.learning}</Typography>
                  <Typography variant="body1">4: {journal.struggle}</Typography>
                  <Typography variant="body1">5: {journal.lookingForward}</Typography>
                  <Typography variant="caption">Username: {journal.login.username}</Typography> 
                  
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