import React from 'react';
import { useMutation, gql } from '@apollo/client';
import { ApolloProvider } from '@apollo/react-hooks';
import client from '../apolloClient'
import { CardContent, IconButton, Stack, Card } from '@mui/material';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import CreateIcon from '@mui/icons-material/Create';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LogoutIcon from '@mui/icons-material/Logout';


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




function JournalEntryForm({ restId }) {
  const navigate = useNavigate();
  const [username, setUsername] = React.useState('');
  const [accomplishment, setAccomplishment] = React.useState('');
  const [gratitude, setGratitude] = React.useState('');
  const [learning, setLearning] = React.useState('');
  const [lookingForward, setLookingForward] = React.useState('');
  const [struggle, setStruggle] = React.useState('');
  const [entryDate, setEntryDate] = React.useState('');

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
      
      console.log('Journal entry published successfully');
    } catch (error) {
      console.error('Error occurred while publishing journal entry:', error);
    }
  
      
      // Handle error here
    
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

  const goToLogin = () => {
    navigate("/login");
  };

  return (
    <>
      <center>
        <div>
          <h1>Journal Entry {restId} </h1>
        </div>
        <Stack direction="row" justifyContent="center" spacing={.5}>
          <IconButton size="small" variant="contained" color="primary" onClick={(e) => goToHome()}><HomeIcon />Home</IconButton>
          <IconButton size="small" variant="contained" color="primary" onClick={(e) => goToCalm()}><SelfImprovementIcon />Calm</IconButton>
          <IconButton size="small" variant="contained" color="primary" disabled><CreateIcon />New Journal</IconButton>
          <IconButton size="small" variant="contained" color="primary" onClick={(e) => goToPast()}><AutoStoriesIcon /> Past Journals</IconButton>
          <IconButton size="small" variant="contained" color="primary" onClick={(e) => goToLogin()}><LogoutIcon /></IconButton>
        </Stack>
        <Card sx={{ width: 650 }} style={{ backgroundColor: '#83C5BE' }}><CardContent>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <form onSubmit={handleSubmit}>
              <label>
                What is one thing you accomplished today?<br /><br />
                <textarea name="accomplishment" placeholder="Write your response here" cols="50" rows="3" style={{ resize: "none" }} value={accomplishment} onChange={(e) => setAccomplishment(e.target.value)} />
              </label>
              <br />
              <label>
                What is one thing you are grateful for today?<br /><br />
                <textarea name="gratitude" placeholder="Write your response here" cols="50" rows="3" style={{ resize: "none" }} value={gratitude} onChange={(e) => setGratitude(e.target.value)} />
              </label>
              <br />
              <label>
                What is one thing you learned today?<br /><br />
                <textarea name="learning" placeholder="Write your response here" cols="50" rows="3" style={{ resize: "none" }} value={learning} onChange={(e) => setLearning(e.target.value)} />
              </label>
              <br />
              <label>
                What is one thing you are looking forward to tomorrow?<br /><br />
                <textarea name="lookingForward" placeholder="Write your response here" cols="50" rows="3" style={{ resize: "none" }} value={lookingForward} onChange={(e) => setLookingForward(e.target.value)} />
              </label>
              <br />
              <label>
                What is one thing you struggled with today?<br /><br />
                <textarea name="struggle" placeholder="Write your response here" cols="50" rows="3" style={{ resize: "none" }} value={struggle} onChange={(e) => setStruggle(e.target.value)} />
              </label>
              <br />
              <label>
                What is your Username: <br /><br />
                <textarea name="username" placeholder="Write your response here" cols="50" rows="2" style={{ resize: "none" }} value={username} onChange={(e) => setUsername(e.target.value)} />
              </label>
              <br />
              <label>
                Entry Date:<br /><br />
                <input type="date" value={entryDate} onChange={(e) => setEntryDate(e.target.value)} />
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </CardContent></Card><br />
      </center>
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