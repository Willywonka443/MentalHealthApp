import React, {useState}from 'react';
import { useMutation, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '../apolloClient'
import { useNavigate } from "react-router-dom";
import { AppBar, Button, Card, CardContent, Grid, IconButton, Toolbar, Typography, TextField, FormLabel } from '@mui/material';
import { AutoStories as AutoStoriesIcon, Create as CreateIcon, Home as HomeIcon, Logout as LogoutIcon, SelfImprovement as SelfImprovementIcon, } from '@mui/icons-material';




const CREATE_JOURNAL_ENTRY = gql`
  mutation createJournal(
    $username: String!,
    $accomplishment: String!,
    $gratitude: String!,
    $learning: String!,
    $lookingForward: String!,
    $struggle: String!,
    $entryDate: Date!
    
  ) {
    createJournal(
      data: {
        username: $username,
        accomplishment: $accomplishment,
        gratitude: $gratitude,
        learning: $learning,
        lookingForward: $lookingForward,
        struggle: $struggle,
        entryDate: $entryDate
        
        
      }
    ) {
      
      username
      accomplishment
      gratitude
      learning
      lookingForward
      struggle
      entryDate
      id
      stage
     
    }
  }
`;

const PUBLISH_JOURNAL_ENTRY = gql`
  mutation publishJournal($id: ID!) {
    publishJournal(
      where: { id: $id }
      to: PUBLISHED

    ) {
      id
      
    }
  }
`;




function JournalEntryForm({ restId, setRestId }) {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [accomplishment, setAccomplishment] = React.useState('');
  const [gratitude, setGratitude] = React.useState('');
  const [learning, setLearning] = React.useState('');
  const [lookingForward, setLookingForward] = React.useState('');
  const [struggle, setStruggle] = React.useState('');
  const [entryDate, setEntryDate] = React.useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);


  const [createJournalEntry, { loading: createLoading, error: createError }] = useMutation(CREATE_JOURNAL_ENTRY, { client });
  const [publishJournalEntry, { loading: publishLoading, error: publishError }] = useMutation(PUBLISH_JOURNAL_ENTRY, { client });

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
          username,
          accomplishment,
          gratitude,
          learning,
          lookingForward,
          struggle,
          entryDate: isoDate,
        },
      });
      console.log('createJournalEntry data:', data);
      const entryId = data.createJournal.id;
      const published = data.createJournal.stage;
      
      console.log(entryId);
      console.log(published);
  
      await publishJournalEntry({ variables: { id: entryId }, data: { stage: published } });
  
      console.log(published);
      setIsSubmitted(true);
      
      setUsername('');
      setAccomplishment('');
      setGratitude('');
      setLearning('');
      setLookingForward('');
      setStruggle('');
      setEntryDate('');
  
      console.log('Journal entry published successfully');
    } catch (error) {
      console.error('Error occurred while publishing journal entry:', error);
    }
  };
  React.useEffect(() => {
    if (createError) {
      console.error('Error occurred while creating journal entry:', createError);
    }
    if (publishError) {
      console.error('Error occurred while publishing journal entry:', publishError);
    }
  }, [createError, publishError]);

  if (createLoading || publishLoading) {
    return <p>Loading...</p>;
  }

  if (createError) {
    return <p>Error : createError {createError?.message}</p>;
  }
  if (publishError) {
    return <p>Error : publishError   {publishError?.message}</p>;
  }




  const goToHome = () => {
    navigate("/basepage");
  };

  const goToCalm = () => {
    navigate("/calm");
  };

  const goToPast = () => {
    navigate("/past");
  };

  const goToLogin = (id) => {

    navigate("/login");
  };

  return (
    <>
      <AppBar position="sticky">
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
          <IconButton size="large" color="inherit" disabled>
            <CreateIcon />
          </IconButton>
          <IconButton size="large" color="inherit" onClick={() => goToPast()}>
            <AutoStoriesIcon />
          </IconButton>
          <IconButton size="large" color="inherit" onClick={() => goToLogin()}>
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Card sx={{ width: '100%', bgcolor: '#83C5BE', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}> 
        <CardContent >
          <Grid container spacing={0} justifyContent="center" sx={{ height: "100%", overflowY: 'auto' }}>
            <Grid item xs={12} md={6} sx={{ height: 'auto', mb: 2 }}>
              <Typography variant="h5" component="h2" align="center" gutterBottom>
                Daily Journal Entry
              </Typography>
            </Grid>
            
            <Grid item xs={10} sx={{ overflowY: 'auto' }} >
             
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
              <FormLabel>What is your username?</FormLabel>
              <TextField
                name="username"
                placeholder="Type Here"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
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
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
              {isSubmitted && (
                <p style={{ color: 'green' }}>Success! Your form has been submitted.</p>
              )}
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