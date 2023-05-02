import React from 'react';
import {AppBar, Toolbar, Typography, IconButton} from '@mui/material';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import CreateIcon from '@mui/icons-material/Create';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LogoutIcon from '@mui/icons-material/Logout';


const Basepage = ({restId, setRestId}) => {
    const navigate = useNavigate()
    const goToJournal = (id) => {   
        
        navigate("/entries")
    }
    
    const goToCalm = (id) => {  
              
        navigate("/calm")
    }
      
    const goToPast = (id) =>{
        
        navigate("/past")
    }

    const goToLogin = (id) => {
        
        navigate("/login");
    }

    return (
        <>
            <AppBar position="sticky">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Home {restId}
                    </Typography>
                    <IconButton size="large" color="inherit" disabled><HomeIcon/></IconButton>
                    <IconButton size="large" color="inherit" onClick={() => goToCalm()}>
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
        </>
    )
}
export default Basepage
