import client from "../apolloClient";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { IconButton, Grid, Card, CardContent, Typography, Box, AppBar, Toolbar } from "@mui/material";
import React , {useState, useEffect} from "react";
import { CssBaseline } from '@mui/material';
import {
  AutoStories as AutoStoriesIcon,
  Create as CreateIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
  SelfImprovement as SelfImprovementIcon,
  AssignmentInd as AssignmentIndIcon
} from '@mui/icons-material';
import EditIcon from "@mui/icons-material/Edit";

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
      access
      login {
        username
      }
    }
  }
`;

export default function Past({ restId, setRestId }) {
  const navigate = useNavigate();
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    // Check for stored information (boolean value)
    const professional = sessionStorage.getItem('professional'); // Assuming you are using localStorage for storing the value
    console.log('Stored Value:', professional);
    // Perform the check
    setIsButtonDisabled(professional !== 'true');
  }, []);


  const goToHome = () => {
    navigate("/basepage");
  };

  const goToCalm = () => {
    navigate("/calm");
  };

  const goToJournal = () => {
    navigate("/entries");
  };
  const goToProfessional = () => {
    navigate('/professionalentries');
}

  const goToLogin = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('professional');
    navigate("/login");
  };
  const handleEditClick = (journalId) => {
    navigate(`../editentries/${journalId}`); // Navigate to the edit page with the journalId as a parameter
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
            <IconButton size="large" color="inherit" onClick={() => goToHome()}>
              <HomeIcon />
            </IconButton>
            <IconButton size="large" color="inherit" onClick={() => goToCalm()}>
              <SelfImprovementIcon />
            </IconButton>
            <IconButton size="large" color="inherit" onClick={() => goToJournal()}>
              <CreateIcon />
            </IconButton>
            <IconButton size="large" disabled>
              <AutoStoriesIcon />
            </IconButton>
            <IconButton size="large" color="inherit" onClick={goToProfessional} disabled={isButtonDisabled} >
            <AssignmentIndIcon />
          </IconButton>
            <IconButton size="large" color="inherit" onClick={() => goToLogin()}>
              <LogoutIcon />
            </IconButton>
          </Toolbar>
        </AppBar>


        <Grid container spacing={2} sx={{ marginTop: "2rem" }}>
          {filteredJournals.map((journal) => (
            <Grid item xs={12} sm={6} md={3} key={journal.id}>
              <Card
                sx={{
                  width: "100%",
                  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                  position: "relative",
                }}
              >
                <CardContent>
                  <Box sx={{ height: "100%" }}>
                    <Typography variant="h6" sx={{ marginBottom: 2 }}>
                      {journal.entryDate}
                    </Typography>

                    <Typography variant="body2" sx={{ fontWeight: "bold", marginBottom: 1, fontSize: "0.9rem" }}>
                      Accomplished:
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2, fontSize: "0.9rem" }}>
                      {journal.accomplishment}
                    </Typography>

                    <Typography variant="body2" sx={{ fontWeight: "bold", marginBottom: 1, fontSize: "0.9rem" }}>
                      Grateful:
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2, fontSize: "0.9rem" }}>
                      {journal.gratitude}
                    </Typography>

                    <Typography variant="body2" sx={{ fontWeight: "bold", marginBottom: 1, fontSize: "0.9rem" }}>
                      Learned:
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2, fontSize: "0.9rem" }}>
                      {journal.learning}
                    </Typography>

                    <Typography variant="body2" sx={{ fontWeight: "bold", marginBottom: 1, fontSize: "0.9rem" }}>
                      Struggled:
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2, fontSize: "0.9rem" }}>
                      {journal.struggle}
                    </Typography>

                    <Typography variant="body2" sx={{ fontWeight: "bold", marginBottom: 1, fontSize: "0.9rem" }}>
                      Looking forward:
                    </Typography>
                    <Typography variant="body2" sx={{ marginBottom: 2, fontSize: "0.9rem" }}>
                      {journal.lookingForward}
                    </Typography>

                   

                    <Box
                      sx={{
                        position: "absolute",
                        top: "8px",
                        right: "8px",
                        width: "10px",
                        height: "10px",
                        borderRadius: "50%",
                        backgroundColor: journal.access ? "#207a5d" : "#ac2626",
                        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                      }}
                    />
                  </Box>
                  <IconButton
                    size="small"
                    onClick={() => handleEditClick(journal.id)} // Add a click handler
                    sx={{ position: "absolute", bottom: "8px", right: "8px" }}
                  >
                    <EditIcon />
                  </IconButton>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}