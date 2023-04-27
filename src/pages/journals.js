import React, { useState } from 'react';
import { CardContent, IconButton, Stack, Card } from '@mui/material';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import CreateIcon from '@mui/icons-material/Create';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LogoutIcon from '@mui/icons-material/Logout';

const Journals = ({ restId }) => {
  const navigate = useNavigate()
  const [journalEntries, setJournalEntries] = useState([])

  const goToHome = () => {
    navigate("/basepage")
  }

  const goToCalm = () => {
    navigate("/calm")
  }

  const gotToPast = () => {
    navigate("/past")
  }

  const goToLogin = () => {
    navigate("/login");
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const question1 = formData.get("accomplishment");
    const question2 = formData.get("gratitude");
    const question3 = formData.get("learning");
    const question4 = formData.get("struggle");
    const question5 = formData.get("lookingForward");
    const submissionDate = new Date().toISOString();


    setJournalEntries([]);


    setJournalEntries((prevEntries) => [...prevEntries, { text1: question1, text2: question2, text3: question3, text4: question4, text5: question5, submissionDate },]);
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
          <IconButton size="small" variant="contained" color="primary" onClick={(e) => gotToPast()}><AutoStoriesIcon /> Past Journals</IconButton>
          <IconButton size="small" variant="contained" color="primary" onClick={(e) => goToLogin()}><LogoutIcon /></IconButton>
        </Stack>
        <Card sx={{ width: 650 }} style={{ backgroundColor: '#83C5BE' }}><CardContent>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center"}}>
            <form onSubmit={handleFormSubmit}>
              <label>
                What is one thing you accomplished today?<br/><br/>
                <textarea name="accomplishment" placeholder="Write your response here" cols="50" rows="3" style={{ resize: "none" }}></textarea>
              </label>
              <br />
              <label>
                What is one thing you are grateful for today?<br/><br/>
                <textarea name="gratitude" placeholder="Write your response here" cols="50" rows="3" style={{ resize: "none" }}></textarea>
              </label>
              <br />
              <label>
                What is one thing you learned today?<br/><br/>
                <textarea name="learning" placeholder="Write your response here" cols="50" rows="3" style={{ resize: "none" }}></textarea>
              </label>
              <br />
              <label>
                What is one thing you struggled with today?<br/><br/>
                <textarea name="struggle" placeholder="Write your response here" cols="50" rows="3" style={{ resize: "none" }}></textarea>
              </label>
              <br />
              <label>
                What is one thing you are looking forward to tomorrow?<br/><br/>
                <textarea name="lookingForward" placeholder="Write your response here" cols="50" rows="3" style={{ resize: "none" }}></textarea>
              </label>
              <br />
              <button type="submit">Submit</button>
            </form>
          </div>
        </CardContent></Card><br/>
        <div>

          {journalEntries.map((entry, index) => (
            <div key={index}>
              <Card sx={{ width: 275 }}><CardContent>
                <div>{entry.text1}</div>
                <div>{entry.text2}</div>
                <div>{entry.text3}</div>
                <div>{entry.text4}</div>
                <div>{entry.text5}</div>
              </CardContent></Card>
              <div>Submitted on {new Date(entry.submissionDate).toLocaleDateString()}</div>
            </div>
          ))}

        </div>
      </center>
    </>
  )
}

export default Journals
