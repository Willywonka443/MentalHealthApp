import client from "../apolloClient"
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import {IconButton, Stack, Card, CardContent, Typography, Box } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import LogoutIcon from '@mui/icons-material/Logout';

const JOURNALS_QUERY = gql`
  query {
    journals {
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

  const goToLogin = (id) => {
    setRestId(id)
    navigate("/login");
  }

  const { loading, error, data } = useQuery(JOURNALS_QUERY, {client});

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  console.log(data.journals);

  return (

    <div>
      
      <h1>
        <center>Past Entries{restId}</center>{" "}
      </h1>

      <Stack direction="row" justifyContent="center" spacing={0.5}>
        <IconButton size="small" variant="contained" color="primary" onClick={(e) => goToHome()}><HomeIcon />Home</IconButton>
        <IconButton size="small" variant="contained" color="primary" onClick={(e) => goToCalm()}><SelfImprovementIcon />Calm</IconButton>
        <IconButton size="small" variant="contained" color="primary" onClick={(e) => goToJournal()}><CreateIcon />New Journal</IconButton>
        <IconButton size="small" variant="contained" color="primary" disabled ><AutoStoriesIcon/> Past Journals</IconButton>
        <IconButton size="small" variant="contained"  color="primary" onClick={(e) => goToLogin()}><LogoutIcon/></IconButton>
      </Stack>

      <Stack
        
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ marginTop: "2rem" }}
      >
        {data.journals.map((journal) => (
           <Card key={journal.id}>
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
        ))}
      </Stack>
      
    </div>
);
}