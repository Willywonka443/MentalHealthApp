import React from 'react';
import { IconButton, AppBar, Toolbar, Typography } from '@mui/material';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import CreateIcon from '@mui/icons-material/Create';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LogoutIcon from '@mui/icons-material/Logout';

const Calm = ({ restId }) => {
  const navigate = useNavigate()
  const goToJournal = () => {

    navigate("/entries")
  }

  const goToHome = () => {
    navigate("/basepage")
  }

  const goToPast = () => {

    navigate("/past")
  }

  const goToLogin = () => {

    navigate("/login");
  }


  return (
    <>
      

        <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Calm{restId}
          </Typography>
          <IconButton size="large" color="inherit" onClick={() => goToHome()}><HomeIcon /></IconButton>
          <IconButton size="large" color="inherit" disabled>
            <SelfImprovementIcon />
          </IconButton>
          <IconButton size="large" color="inherit" onClick={() => goToJournal()}>
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
        <div>

          <p>Work in Progress</p>

        </div>

      
    </>
  )
}
export default Calm