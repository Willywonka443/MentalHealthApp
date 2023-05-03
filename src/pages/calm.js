import React, {useState} from 'react';
import { IconButton, AppBar, Toolbar, Typography, Button, Grid, Card, CardContent, CardMedia, CardActions} from '@mui/material';
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

  const [showBreathing, setShowBreathing] = useState(false);
  const [breathingCount, setBreathingCount] = useState(0);
  const [disableButton, setDisableButton] = useState(false);
  
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

  const images = [
    { src: './milkyrockey.jpg', alt: 'Image 1' , photographer: 'Adi Perets' },
    { src: './moonmountain.jpg', alt: 'Image 2', photographer: 'Kasuma'  },
    { src: './rainbow.jpg', alt: 'Image 3' , photographer: 'Matt Hardy' },
    { src: './desertrain.jpg', alt: 'Image 4' , photographer: ' Andy Vu' },
    { src: './elephant.jpg', alt: 'Image 5' , photographer: 'Saifuddin Ratlamwala' },
    { src: './morningmountain.jpg', alt: 'Image 6' , photographer: 'Eberhard Grossgasteiger' },
    { src: './mountainriver.jpg', alt: 'Image 7', photographer: 'Michael Block'  },
    { src: './NorthernLights.jpg', alt: 'Image 8', photographer: 'Tobias Bjørkli'  },
    
  ];
  const [index, setIndex] = useState(0);
  const [indexS, setIndexS] = useState(0);
  const handleNext = () => {
    setIndex((index + 1) % images.length);
  };
  const handlePrev = () => {
    setIndex((index - 1 + images.length) % images.length);  
  };
  const sounds = [
    {
      src: './BeachWater3.mp3',
      title: 'Sandy Beach - Calm Waves - Water - Nature Sounds',
      artist: 'JuliusH',
    },
    {
      src: './BirdsSpring.mp3',
      title: 'Evening birds singing in spring. Background sounds of nature',
      artist: 'DMD Production',
    },
    {
      src: './CampFire.mp3',
      title: 'Crackling Fireplace - Nature Sounds',
      artist: 'JuliusH',
    },
  ];
  


  
    const handlePrev2 = () => {
      setIndexS((prevIndex) => (prevIndex === 0 ? sounds.length - 1 : prevIndex - 1));
    };
  
    const handleNext2 = () => {
      setIndexS((prevIndex) => (prevIndex === sounds.length - 1 ? 0 : prevIndex + 1));
    };
  

  
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
      
      <Grid container alignItems="center" justifyContent="center" style={{ marginTop: '50px' }}>
  <Grid item xs={12} sm={6} md={4} sx={{ maxWidth: '300px', mx: 'auto' }}>
    <Card variant="outlined" sx={{ borderRadius: '20px' }}>
      <CardContent>
        <Button variant="contained" onClick={startBreathing} disabled={disableButton} sx={{ mt: 2, mb: 1 }}>
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
  borderRadius: '20px',
  boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
}}>
  <CardMedia
    component="img"
    src={images[index].src}
    alt={images[index].alt}
    sx={{
      height: '250px',
      objectFit: 'cover',
      borderRadius: '20px 20px 0 0',
    }}
  />
  <CardContent sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <Typography variant="caption" color="textSecondary">
      Photo by {images[index].photographer}
    </Typography>
    <Typography variant="caption" color="textSecondary">
      {index + 1} / {images.length}
    </Typography>
  </CardContent>
  <CardActions sx={{ 
    justifyContent: 'center',
    borderBottomLeftRadius: '20px',
    borderBottomRightRadius: '20px',
    backgroundColor: 'rgba(0, 0, 0, 0.05)',
  }}>
    <Button onClick={handlePrev} disabled={index === 0} sx={{ mr: 2 }}>
      Prev
    </Button>
    <Button onClick={handleNext} disabled={index === images.length - 1} sx={{ ml: 2 }}>
      Next
    </Button>
  </CardActions>
</Card>
<Card sx={{ 
      maxWidth: 350, 
      mx: 'auto', 
      my: 2,
      borderRadius: '20px',
      boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.2)',
    }}>
      <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Typography variant="h5" gutterBottom>
          {sounds[indexS].title}
        </Typography>
        <Typography variant="subtitle1" color="textSecondary">
          {sounds[indexS].artist}
        </Typography>
        <audio 
          controls 
          src={sounds[indexS].src} 
          style={{ marginTop: '20px' }} 
          
        >
          Your browser does not support the audio element.
        </audio>
        
      </CardContent>
      <CardActions sx={{ 
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.05)',
      }}>
        <Button onClick={handlePrev2} disabled={indexS === 0} sx={{ mr: 2 }}>
          Prev
        </Button>
        <Typography variant="caption" color="textSecondary">
          {indexS + 1} / {sounds.length}
        </Typography>
        <Button onClick={handleNext2} disabled={indexS === sounds.length - 1} sx={{ ml: 2 }}>
          Next
        </Button>
      </CardActions>
    </Card>

      
    </>
  )
}
export default Calm