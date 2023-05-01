import React from 'react';
import {Stack, IconButton} from '@mui/material';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import CreateIcon from '@mui/icons-material/Create';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LogoutIcon from '@mui/icons-material/Logout';


const Basepage = ({restId}) => {
    const navigate = useNavigate()
    const goToJournals = (id) => {        
        navigate("/entries")
      }
    
    const goToCalm = (id) => {        
        navigate("/calm")
      }
      
    const gotToPast = () =>{
        navigate("/past")
      }

    const goToLogin = () => {
        navigate("/login");
      }
    
   

    return (
        <>
            
                <center>


                    <center><h1>Home {restId}</h1></center>
                    <div>
                    </div>
                    <Stack direction="row" justifyContent="center" spacing={.5}>
                    <IconButton size="small" variant="contained" disabled ><HomeIcon/>Home</IconButton>
                    <IconButton size="small" variant="contained"  color="primary" onClick={(e) => goToCalm()}><SelfImprovementIcon/>Calm</IconButton>
                    <IconButton size="small" variant="contained"  color="primary" onClick={(e) => goToJournals()}><CreateIcon/>New Journal</IconButton>
                    <IconButton size="small" variant="contained"  color="primary" onClick={(e) => gotToPast()}><AutoStoriesIcon /> Past Journals</IconButton>
                    <IconButton size="small" variant="contained"  color="primary" onClick={(e) => goToLogin()}><LogoutIcon/></IconButton>
                    </Stack>
                    
                    
                
                </center>


        </>
    )
}
export default Basepage