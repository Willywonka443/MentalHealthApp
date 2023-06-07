import React, { useState, useEffect } from 'react';
import { useMutation, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '../apolloClient';
import { useNavigate } from 'react-router-dom';
import {
  AppBar,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
  Toolbar,
  Typography,
  TextField,
  FormLabel,
  Switch
} from '@mui/material';
import {
  AutoStories as AutoStoriesIcon,
  Create as CreateIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
  SelfImprovement as SelfImprovementIcon,
  AssignmentInd as AssignmentIndIcon
} from '@mui/icons-material';


const CREATE_JOURNAL_ENTRY = gql`
mutation createJournal(
  $accomplishment: String!
  $gratitude: String!
  $learning: String!
  $lookingForward: String!
  $struggle: String!
  $entryDate: Date!
  $username: String!  # Make sure this field exists in the mutation
  $id: ID!
  $access: Boolean!

) {
  createJournal(
    data: {
      accomplishment: $accomplishment
      gratitude: $gratitude
      learning: $learning
      lookingForward: $lookingForward
      struggle: $struggle
      entryDate: $entryDate
      username: $username  # Make sure the field is included in the mutation
      login: {connect: {id:$id}}
      access: $access
    }
  ) {
    id
    login{
      id
    }
    accomplishment
    gratitude
    learning
    lookingForward
    struggle
    entryDate
    stage
    username
    access
  }
}

`;
const PUBLISH_JOURNAL_ENTRY = gql`
  mutation publishJournal($id: ID!) {
    publishJournal(where: { id: $id }, to: PUBLISHED) {
      id
    }
  }
`;



function JournalEntryForm({ restId }) {
  const navigate = useNavigate();
  const [accomplishment, setAccomplishment] = useState('');
  const [gratitude, setGratitude] = useState('');
  const [learning, setLearning] = useState('');
  const [lookingForward, setLookingForward] = useState('');
  const [struggle, setStruggle] = useState('');
  const [entryDate, setEntryDate] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [accessGranted, setAccessGranted] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const [createJournalEntry, { loading: createLoading, error: createError }] = useMutation(CREATE_JOURNAL_ENTRY, { client });
  const [publishJournalEntry, { loading: publishLoading, error: publishError }] = useMutation(PUBLISH_JOURNAL_ENTRY, { client });

  const [storedUsername, setStoredUsername] = useState('');
  const [storedId, setStoredId] = useState('');

  useEffect(() => {
    const username = sessionStorage.getItem('username');
    const id = sessionStorage.getItem('id');

    setStoredUsername(username || 'username');
    setStoredId(id || 'id');
  }, []);

  useEffect(() => {
    // Check for stored information (boolean value)
    const professional = sessionStorage.getItem('professional'); // Assuming you are using localStorage for storing the value
    console.log('Stored Value:', professional);
    // Perform the check
    setIsButtonDisabled(professional !== 'true');
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isoDate = new Date(entryDate).toISOString();
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(entryDate)) {
      console.error('Invalid date format');
      return;
    }
    try {
      const { data } = await createJournalEntry({
        variables: {
          username: storedUsername,
          accomplishment,
          gratitude,
          learning,
          lookingForward,
          struggle,
          entryDate: isoDate,
          id: storedId,
          access: accessGranted,
        },
      });

      const entryId = data.createJournal.id;
      const published = data.createJournal.stage;

      await publishJournalEntry({ variables: { id: entryId }, data: { stage: published } });

      setIsSubmitted(true);

      setAccomplishment('');
      setGratitude('');
      setLearning('');
      setLookingForward('');
      setStruggle('');
      setEntryDate('');

      console.log('Journal entry published successfully');
      console.log(storedId)
    } catch (error) {
      console.error('Error occurred while publishing journal entry:', error);
    }
  };

  if (createLoading || publishLoading) {
    return <p>Loading...</p>;
  }

  if (createError) {
    return <p>Error: {createError?.message}</p>;
  }

  if (publishError) {
    return <p>Error: {publishError?.message}</p>;
  }

  // if (connectError){
  //   return <p>Error: {connectError?.message}</p>;
  // }

  const goToHome = () => {
    navigate('/basepage');
  };

  const goToCalm = () => {
    navigate('/calm');
  };

  const goToPast = () => {
    navigate('/past');
  };
  

  

  const goToPatientPast = () => {
    navigate('/professionalentries');
  };

  const goToLogin = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('professional');
    navigate('/login');
  };



  return (
    <>
      <AppBar position="sticky" sx={{ background: '#0047ab' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Journal {restId}
          </Typography>
          <IconButton size="large" color="inherit" onClick={() => goToHome()}>
            <HomeIcon />
          </IconButton>
          <IconButton size="large" color="inherit" onClick={() => goToCalm()}>
            <SelfImprovementIcon />
          </IconButton>
          <IconButton size="large" disabled>
            <CreateIcon />
          </IconButton>
          <IconButton size="large" color="inherit" onClick={() => goToPast()}>
            <AutoStoriesIcon />
          </IconButton>
          <IconButton size="large" color="inherit" onClick={goToPatientPast} disabled={isButtonDisabled} >
            <AssignmentIndIcon />
          </IconButton>
          <IconButton size="large" color="inherit" onClick={() => goToLogin()}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Card sx={{ width: '100%', bgcolor: '#b0c4de', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
        <CardContent>
          <Grid container spacing={0} justifyContent="center" sx={{ height: '100%', overflowY: 'auto' }}>
            <Grid item xs={12} md={6} sx={{ height: 'auto', mb: 2 }}>
              <Typography variant="h5" component="h2" align="center" gutterBottom>
                Daily Journal Entry
              </Typography>
            </Grid>

            <Grid item xs={10} sx={{ overflowY: 'auto' }}>
              <FormLabel>What is one thing you accomplished today?</FormLabel>
              <TextField
                name="accomplishment"
                placeholder="Type Here"
                multiline
                fullWidth
                value={accomplishment}
                onChange={(e) => setAccomplishment(e.target.value)}
              />
            </Grid>
            <Grid item xs={10} sx={{ mt: 2 }}>
              <FormLabel>What is one thing you are grateful for today?</FormLabel>
              <TextField
                name="gratitude"
                placeholder="Type Here"
                multiline
                fullWidth
                value={gratitude}
                onChange={(e) => setGratitude(e.target.value)}
              />
            </Grid>
            <Grid item xs={10} sx={{ mt: 2 }}>
              <FormLabel>What is one thing you learned today?</FormLabel>
              <TextField
                name="learning"
                placeholder="Type Here"
                multiline
                fullWidth
                value={learning}
                onChange={(e) => setLearning(e.target.value)}
              />
            </Grid>
            <Grid item xs={10} sx={{ mt: 2 }}>
              <FormLabel>What is one thing you struggled with today?</FormLabel>
              <TextField
                name="struggle"
                placeholder="Type Here"
                multiline
                fullWidth
                value={struggle}
                onChange={(e) => setStruggle(e.target.value)}
              />
            </Grid>
            <Grid item xs={10} sx={{ mt: 2 }}>
              <FormLabel>What is one thing you are looking forward to tomorrow?</FormLabel>
              <TextField
                name="lookingForward"
                placeholder="Type Here"
                multiline
                fullWidth
                value={lookingForward}
                onChange={(e) => setLookingForward(e.target.value)}
              />
            </Grid>

            <Grid item xs={10} sx={{ mt: 2 }}>
              <FormLabel>What is Today's Date?</FormLabel>
              <TextField
                name="entryDate"
                type="date"
                fullWidth
                value={entryDate}
                onChange={(e) => setEntryDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={10} sx={{ mt: 2, textAlign: 'center' }}>
              <FormLabel>Grant Access</FormLabel>
              <Switch checked={accessGranted} onChange={(e) => setAccessGranted(e.target.checked)} />
            </Grid>
            <Grid item xs={10} sx={{ mt: 2, textAlign: 'center' }}>
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
              {isSubmitted && <p style={{ color: 'green' }}>  Success! Your form has been submitted. Access {accessGranted ? 'granted' : 'not granted'}.</p>}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
}

function JournalEntries({ restId }) {
  return (
    <ApolloProvider client={client}>
      <div>
        <JournalEntryForm restId={restId} />
      </div>
    </ApolloProvider>
  );
}

export default JournalEntries;