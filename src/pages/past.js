import client from "../apolloClient"
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import { IconButton, Grid, Card, CardContent, Typography, Box, AppBar, Toolbar, Button } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LogoutIcon from '@mui/icons-material/Logout';
import React from "react";

const JOURNALS_QUERY = gql`
  query Journals($limit: Int) {
    journals(first: $limit) {
      id
      username
      accomplishment
      gratitude
      learning
      struggle
      lookingForward
      entryDate
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
    navigate("/login");
  }

  const { loading, error, data, refetch  } = useQuery(JOURNALS_QUERY, { client, variables: { limit: 25 } });
  
  
  const handleRefresh = () => {
    window.location.reload();
    refetch();
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  console.log(data.journals);

  return (

   <>

      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Past Journals{restId}
          </Typography>
          
          <IconButton size="large" color="inherit" onClick={() => goToHome()}><HomeIcon /></IconButton>
          <IconButton size="large" color="inherit" onClick={() => goToCalm()}>
            <SelfImprovementIcon />
          </IconButton>
          <IconButton size="large" color="inherit" onClick={() => goToJournal()}>
            <CreateIcon />
          </IconButton>
          <IconButton size="large" color="inherit" disabled>
            <AutoStoriesIcon />
          </IconButton>
          <IconButton size="large" color="inherit" onClick={() => goToLogin()}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
      <Button variant="contained" onClick={handleRefresh}>
        Refresh
      </Button>
    </Box>
      <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
  {data.journals.map((journal) => (
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
            <Typography variant="caption">Username: {journal.username}</Typography>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  ))}
</Grid>

    </>
  );
}