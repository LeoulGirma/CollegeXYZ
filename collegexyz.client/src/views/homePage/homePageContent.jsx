// HomePageContent.js
import React from 'react';
import { Grid, Typography, Button, useTheme, useMediaQuery } from '@mui/material';
// import SampleImage from './path-to-your-image.svg'; 

const HomePageContent = () => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('md'));

  return (
    <div className="flex justify-center items-center min-h-screen" style={{ padding: matches ? '80px' : '16px' }}>
      <Grid container spacing={matches ? 10 : 2}>
        <Grid item xs={12} md={6} className="flex flex-col justify-center">
          <Typography variant="h2" component="h1" className="text-6xl font-bold text-gray-900 mb-4">
            Harmony in Learning
          </Typography>
          <Typography variant="h2" component="h1" className="text-emerald-600 text-6xl
font-extrabold mb-4">
            Uniting Curiosity and Knowledge
          </Typography>
          <Typography className="mb-6 text-base text-gray-500">
            Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat fugiat aliqua.
          </Typography>
          <div className="flex gap-4">
            <Button variant="contained" color="primary">
              Explore
            </Button>
            <Button variant="outlined" color="primary">
              Watch Video
            </Button>
          </div>
        </Grid>
        <Grid item xs={12} md={6} className="flex justify-center items-center">
          {/* <img src={SampleImage} alt="Educational" className="max-w-full h-auto" /> Adjust the src and alt text */}
          
        </Grid>
      </Grid>
    </div>
  );
};

export default HomePageContent;
