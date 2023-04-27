import {client} from "../apolloClient";
import { gql, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import SelfImprovementIcon from "@mui/icons-material/SelfImprovement";
import {IconButton, Stack, Card, CardContent, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

const JOURNALS_QUERY = gql`
  query {
    journals {
      id
      entry
      entryDate
    }
  }
`;

export default function Past({ restId }) {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate("/basepage");
  };

  const goToCalm = () => {
    navigate("/calm");
  };

  const gotToJournal = () => {
    navigate("/journals");
  };

  const { loading, error, data } = useQuery(JOURNALS_QUERY, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :</p>;

  console.log(data.journals);

  return (
    <div>
      <title>Create Next App</title>
      <h1>
        <center>Journal Entries {restId}</center>{" "}
      </h1>

      <Stack direction="row" justifyContent="center" spacing={0.5}>
        <IconButton
          size="small"
          variant="contained"
          color="primary"
          onClick={(e) => goToHome()}
        >
          <HomeIcon />Home
        </IconButton>
        <IconButton
          size="small"
          variant="contained"
          color="primary"
          onClick={(e) => goToCalm()}
        >
          <SelfImprovementIcon />Calm
        </IconButton>
        <IconButton
          size="small"
          variant="contained"
          color="primary"
          onClick={(e) => gotToJournal()}
        >
          <CreateIcon />New Journal
        </IconButton>
        <IconButton
          size="small"
          variant="contained"
          color="primary"
          disabled
        >
          <AutoStoriesIcon /> Past Journals
        </IconButton>
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
              <Typography variant="h6">{journal.entryDate}</Typography>
              <Typography variant="body1">{journal.entry}</Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
      
    </div>
  );
}