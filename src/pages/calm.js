import React, { useState, useEffect } from 'react';
import { IconButton, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, CardMedia, CardActions } from '@mui/material';
import { useNavigate } from "react-router-dom";
import {
  AutoStories as AutoStoriesIcon,
  Create as CreateIcon,
  Home as HomeIcon,
  Logout as LogoutIcon,
  SelfImprovement as SelfImprovementIcon,
  AssignmentInd as AssignmentIndIcon
} from '@mui/icons-material';

import { CssBaseline } from '@mui/material';
import { gql, useQuery } from "@apollo/client";
import client from '../apolloClient';


const CUSTOMS_QUERY = gql`
query Customs($limit: Int, $loginId: ID!) {
  customs(first: $limit, where: { login: { id: $loginId } }) {
      images{
        url
      }
      sounds{
        url
      }
      id
      login {
        username
        id
      }
    }
  }
`;

// const CREATE_CUSTOM_ENTRY = gql`
// mutation createCustom($images: [Upload]!, $sounds: [Upload]!) {
//   createCustom(
//     data: {
//       images: $images
//       sounds: $sounds 
//       login: {connect: {id:$id}}
//     }
//   ) {
//     id
//     login{
//       id
//     }
//     images
//     sounds
//   }
// }

// `;
// const PUBLISH_CUSTOM_ENTRY = gql`
//   mutation publishCustom($id: ID!) {
//     publishCustom(where: { id: $id }, to: PUBLISHED) {
//       id
//     }
//   }
// `;


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
  const goToPatientPast = () => {
    navigate('/professionalentries');
  };


  const goToLogin = () => {
    sessionStorage.removeItem('username');
    sessionStorage.removeItem('id');
    sessionStorage.removeItem('professional');
    navigate("/login");
  }

  const [showBreathing, setShowBreathing] = useState(false);
  const [breathingCount, setBreathingCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const startBreathing = () => {
    setShowBreathing(true);
    setDisableButton(true);
    let count = 20;
    setBreathingCount('Get ready...');

    setTimeout(() => {
      setBreathingCount('Breathe in...');
      const timer = setInterval(() => {
        if (count === 0) {
          clearInterval(timer);
          setBreathingCount('Good job!');
          setDisableButton(false);
        } else if (count === 11) {
          count--;
          setBreathingCount('Breathe out...');
        } else {
          setBreathingCount(count);
        }
        count--;
      }, 1000);
    }, 1000);
  };


  const [index, setIndex] = useState(0);
  const [indexS, setIndexS] = useState(0);
  const handleNext = () => {
    setIndex((index + 1) % imagesFromQuery.length);
  };
  const handlePrev = () => {
    setIndex((index - 1 + imagesFromQuery.length) % imagesFromQuery.length);
  };


  const handlePrev2 = () => {
    setIndexS((prevIndex) => (prevIndex === 0 ? soundsFromQuery.length - 1 : prevIndex - 1));
  };

  const handleNext2 = () => {
    setIndexS((prevIndex) => (prevIndex === soundsFromQuery.length - 1 ? 0 : prevIndex + 1));
  };

  useEffect(() => {
    // Check for stored information (boolean value)
    const professional = sessionStorage.getItem('professional');
    console.log('Stored Value:', professional);
    setIsButtonDisabled(professional !== 'true');

  }, []);

  const handleAddAudio = () => {
    // Implement your logic to add audio here
    // This function will be called when the "Add" button is clicked
  };

  const handleAddImage = () => {

  };
  
  const userId = sessionStorage.getItem('id');

  const { loading, error, data } = useQuery(CUSTOMS_QUERY, {
    client,
    variables: { limit: 1, loginId: userId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const imagesFromQuery = data.customs[0].images;
  const soundsFromQuery = data.customs[0].sounds;
  
  const currentSound = soundsFromQuery[indexS];
  const audioAvailable = !!currentSound;

  const currentImage = imagesFromQuery[indexS];
  const imageAvailable = !!currentImage;


  return (
    <>

      <CssBaseline />
      <div style={{ background: ' #b0c4de', minHeight: '100vh' }}>
        <AppBar position="sticky" sx={{ background: '#0047ab' }}>
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Calm{restId}
            </Typography>
            <IconButton size="large" color="inherit" onClick={() => goToHome()}><HomeIcon /></IconButton>
            <IconButton size="large" disabled>
              <SelfImprovementIcon />
            </IconButton>
            <IconButton size="large" color="inherit" onClick={() => goToJournal()}>
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

        <Grid container alignItems="center" justifyContent="center" style={{ marginTop: '50px' }}>
          <Grid item xs={12} sm={6} md={4} sx={{ maxWidth: '300px', mx: 'auto' }}>
            <Card variant="outlined" sx={{ borderRadius: '20px', background: ' #87ceeb' }}>
              <CardContent>
                <Button
                  variant="contained"
                  onClick={startBreathing}
                  disabled={disableButton}
                  sx={{
                    mt: 2,
                    mb: 1,
                    color: '#fff',
                    borderRadius: '4px',
                    padding: '8px 16px',
                    fontWeight: 'bold',
                    backgroundColor: ' #0047ab',
                    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                    '&:hover': {
                      backgroundColor: '#0047ab',
                    },
                  }}
                >
                  Start Breathing
                </Button>
                {showBreathing && (
                  <>
                    <Typography variant="h4" component="p" sx={{ my: 3 }}>
                      {breathingCount}
                    </Typography>
                  </>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>


        <Card sx={{
          maxWidth: 350,
          mx: 'auto',
          my: 2,
          backgroundColor: ' #0047ab',
          borderRadius: '20px',
          boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
          background: ' #87ceeb'
        }}>
          <CardMedia
            component="img"
            src={imagesFromQuery[index].url}
            alt={imagesFromQuery[index].alt}
            sx={{
              height: '250px',
              objectFit: 'cover',
              borderRadius: '20px 20px 0 0',
              background: ' #87ceeb'
            }}
          />

          <CardActions sx={{
            justifyContent: 'center',
            borderBottomLeftRadius: '20px',
            borderBottomRightRadius: '20px',
            background: ' #87ceeb'
          }}>
            <Button onClick={handlePrev}
              disabled={index === 0}
              sx={{
                mr: 2,
                backgroundColor: '#0047ab',
                color: '#fff',
                borderRadius: '4px',
                padding: '8px 16px',
                fontWeight: 'bold',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: '#6495ed',
                },
              }}>
              Prev
            </Button>
            <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="caption" color="textSecondary">
              {index + 1} / {imagesFromQuery.length}
            </Typography>
          </CardContent>
            <Button
              onClick={handleNext}
              disabled={index === imagesFromQuery.length - 1}
              sx={{
                ml: 2,
                backgroundColor: '#0047ab',
                color: '#fff',
                borderRadius: '4px',
                padding: '8px 16px',
                fontWeight: 'bold',
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
                '&:hover': {
                  backgroundColor: '#6495ed',
                },
              }}
            >
              Next
            </Button>
            
          </CardActions>
          <CardActions sx={{ justifyContent: 'center', background: '#87ceeb' }}>
        <Button
          onClick={handleAddImage}
          disabled={!imageAvailable}
          sx={{
            backgroundColor: '#0047ab',
            color: '#fff',
            borderRadius: '4px',
            padding: '8px 16px',
            fontWeight: 'bold',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#6495ed',
            },
          }}
        >
          Add Image
        </Button>
      </CardActions>
        </Card>
        <Card
      sx={{
        maxWidth: 350,
        mx: 'auto',
        my: 2,
        borderRadius: '20px',
        boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
        background: '#87ceeb',
      }}
    >
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {audioAvailable ? (
          <>
            <Typography variant="h5" gutterBottom>
              {currentSound.title}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {currentSound.artist}
            </Typography>
            <audio controls src={currentSound.url} style={{ marginTop: '20px' }}>
              Your browser does not support the audio element.
            </audio>
          </>
        ) : (
          <Typography variant="body1" gutterBottom>
            No audio available.
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: 'center', background: '#87ceeb' }}>
        <Button
          onClick={handlePrev2}
          disabled={indexS === 0 || !audioAvailable}
          sx={{
            mr: 2,
            backgroundColor: '#0047ab',
            color: '#fff',
            borderRadius: '4px',
            padding: '8px 16px',
            fontWeight: 'bold',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#6495ed',
            },
          }}
        >
          Prev
        </Button>
        <Typography variant="caption" color="textSecondary">
          {audioAvailable ? `${indexS + 1} / ${soundsFromQuery.length}` : '0 / 0'}
        </Typography>
        <Button
          onClick={handleNext2}
          disabled={indexS === soundsFromQuery.length - 1 || !audioAvailable}
          sx={{
            ml: 2,
            backgroundColor: '#0047ab',
            color: '#fff',
            borderRadius: '4px',
            padding: '8px 16px',
            fontWeight: 'bold',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#6495ed',
            },
          }}
        >
          Next
        </Button>
      </CardActions>
      <CardActions sx={{ justifyContent: 'center', background: '#87ceeb' }}>
        <Button
          onClick={handleAddAudio}
          disabled={!audioAvailable}
          sx={{
            backgroundColor: '#0047ab',
            color: '#fff',
            borderRadius: '4px',
            padding: '8px 16px',
            fontWeight: 'bold',
            boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            '&:hover': {
              backgroundColor: '#6495ed',
            },
          }}
        >
          Add Audio
        </Button>
      </CardActions>
    </Card>

      </div>
    </>
  )
}
export default Calm