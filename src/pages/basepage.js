import React from 'react';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { useNavigate } from "react-router-dom";
import HomeIcon from '@mui/icons-material/Home';
import SelfImprovementIcon from '@mui/icons-material/SelfImprovement';
import CreateIcon from '@mui/icons-material/Create';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import LogoutIcon from '@mui/icons-material/Logout';


const Basepage = ({ restId }) => {
    const navigate = useNavigate()

    const goToJournal = () => {
        navigate("/entries")
    }

    const goToCalm = () => {
        navigate("/calm")
    }

    const goToPast = () => {
        navigate("/past")
    }

    const goToLogin = () => {
        navigate("/login");
    }

    return (
        <>
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 999 }}>
                <AppBar position="sticky">
                    <Toolbar>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Home {restId}
                        </Typography>
                        <IconButton size="large" color="inherit" disabled><HomeIcon /></IconButton>
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
            </div>
            <div style={{ paddingTop: '80px' }}>
                <Typography variant="h4" component="h1" gutterBottom  sx={{ marginLeft: '20px' }}>
                    Welcome to Mental Health Tracker
                </Typography>
                <ul>
                    <li>
                        <Typography variant="subtitle1" component="p" gutterBottom>
                            <SelfImprovementIcon /> Here you will find the calm page where you will find pictures of nature, a breathing counter, and nice soothing sounds.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="subtitle1" component="p" gutterBottom>
                            <CreateIcon /> Here you can create your own journal entry.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="subtitle1" component="p" gutterBottom>
                            <AutoStoriesIcon /> Here you are able to see past journals that you have created.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="subtitle1" component="p" gutterBottom>
                            <LogoutIcon/> Here you will logout and bring you to the login page.
                        </Typography>
                    </li>
                </ul>




            </div>
        </>
    )
}

export default Basepage;