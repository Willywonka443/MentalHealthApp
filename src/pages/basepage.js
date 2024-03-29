import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton } from '@mui/material';
import { useQuery, gql } from '@apollo/client';
import {
    AutoStories as AutoStoriesIcon,
    Create as CreateIcon,
    Home as HomeIcon,
    Logout as LogoutIcon,
    SelfImprovement as SelfImprovementIcon,
    AssignmentInd as AssignmentIndIcon
  } from '@mui/icons-material';
  
import client from '../apolloClient';



const GET_USER_NAME = gql`
  query GetUserName($username: String!) {
    logins(where: { username: $username }) {
      username
    }
  }
`;

export const Basepage = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const userName = queryParams.get('username') || '';
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);


    const [user, setUser] = useState('');

    const { error, loading } = useQuery(GET_USER_NAME, {
        client,
        variables: { username: userName },
        onCompleted: (data) => {

            const user = data?.logins[0];
            if (user) {
                setUser(user.username);

            }
        },
    });

    useEffect(() => {
        if (error) {
            console.log('Error fetching user name:', error);
        }
    }, [error]);


    useEffect(() => {
        const storedUsername = sessionStorage.getItem('username');
        setUser(storedUsername);
    }, []);

    useEffect(() => {
        // Check for stored information (boolean value)
        const professional = sessionStorage.getItem('professional'); // Assuming you are using localStorage for storing the value
        console.log('Stored Value:', professional);
        // Perform the check
        setIsButtonDisabled(professional !== 'true');
      }, []);

    const goToJournal = () => {
        navigate('/entries');
    };

    const goToCalm = () => {
        navigate('/calm');
    };

    const goToPast = () => {
        navigate('/past');
    };
    const goToProfessional = () => {
        navigate('/professionalentries');
    }

    const goToLogin = () => {
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('professional');
        navigate('/login');
    };

    


    if (loading) {
        return <div>Loading...</div>;
    }
    // Colors:: Background, #8c92ac: Title/Big Words, #0047ab: Appbar Color, #87ceeb: Card Background Colors, #6495ed: Icon Color
    return (
        <>
            <AppBar position="sticky" sx={{ background: '#0047ab' }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Home
                    </Typography>
                    <IconButton size="large" disabled>
                        <HomeIcon />
                    </IconButton>
                    <IconButton size="large"  color="inherit" onClick={goToCalm}>
                        <SelfImprovementIcon />
                    </IconButton>
                    <IconButton size="large" color="inherit" onClick={goToJournal}>
                        <CreateIcon />
                    </IconButton>
                    <IconButton size="large" color="inherit" onClick={goToPast}>
                        <AutoStoriesIcon />
                    </IconButton>
                    <IconButton size="large" color="inherit" onClick={goToProfessional} disabled={isButtonDisabled} >
            <AssignmentIndIcon />
          </IconButton>
                    <IconButton size="large"  color="inherit" onClick={goToLogin}>

                        <LogoutIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <div
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    zIndex: 999,
                    background: ' #b0c4de',
                    paddingTop: '80px',
                }}
            >


                <Typography variant="h4" component="h1" gutterBottom sx={{ marginLeft: '20px' }}>
                    Welcome to PeacefulPulse: {user}
                </Typography>
                <ul>
                    <li>
                        <Typography variant="subtitle1" component="p" gutterBottom>
                            <SelfImprovementIcon />Here you will find the calm page where you will find pictures of nature, a
                            breathing counter, and nice soothing sounds.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="subtitle1" component="p" gutterBottom>
                            <CreateIcon />Here you can create your own journal entry.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="subtitle1" component="p" gutterBottom>
                            <AutoStoriesIcon /> Here you are able to see past journals that you have created.
                        </Typography>
                    </li>
                    <li>
                        <Typography variant="subtitle1" component="p" gutterBottom>
                            <LogoutIcon /> Here you will logout and bring you to the login page.
                        </Typography>
                    </li>
                </ul>
            </div>
        </>
    );
};



export default Basepage;