import React, { useState }from 'react';
import {IconButton, Stack} from '@mui/material';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import CreateIcon from '@mui/icons-material/Create';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';

const Journals = ({ restId }) => {
  const navigate = useNavigate()
  const [journalEntries, setJournalEntries] = useState([]) // initialize state variable for journal entries

  const goToHome = () => {
    navigate("/basepage")
  }

  const goToCalm = () => {
    navigate("/calm")
  }

  const gotToPast = () => {
    navigate("/past")
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const journalEntry = formData.get("journalEntry");
    const submissionDate = new Date().toISOString();

    // Clear the previous entries from the journalEntries array
    setJournalEntries([]);

    // Add the new entry to the journalEntries array
    setJournalEntries((prevEntries) => [    ...prevEntries,    { text: journalEntry, submissionDate },  ]);
  };


  return (
    <>
      <center>
        <div>
          <h1>Journals {restId} </h1>
        </div>
        <Stack direction="row" justifyContent="center" spacing={.5}>
          <IconButton size="small" variant="contained"  color="primary" onClick={(e) => goToHome()}><HomeIcon/>Home</IconButton>
          <IconButton size="small" variant="contained"  color="primary" onClick={(e) => goToCalm()}><SelfImprovementIcon/>Calm</IconButton>
          <IconButton size="small" variant="contained"  color="primary" disabled><CreateIcon/>New Journal</IconButton>
          <IconButton size="small" variant="contained"  color="primary" onClick={(e) => gotToPast()}><AutoStoriesIcon /> Past Journals</IconButton>
        </Stack>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "25vh" }}>
          <form onSubmit={handleFormSubmit}>
            <input type="text" name="journalEntry" placeholder="Write your journal entry here" />
            <div></div>
            <button type="submit">Submit</button>
          </form>
        </div>
        <div>
          {journalEntries.map((entry, index) => (
            <div key={index}>
              <div>{entry.text}</div>
              <div>Submitted on {new Date(entry.submissionDate).toLocaleDateString()}</div>
            </div>
          ))}
        </div>
      </center>
    </>
  )
}

export default Journals
