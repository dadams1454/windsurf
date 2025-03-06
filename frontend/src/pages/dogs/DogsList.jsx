import React from 'react';
import { Typography, Box, Container } from '@mui/material';

const DogsList = () => {
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dogs Management
        </Typography>
        <Typography variant="body1">
          This page will display a list of all dogs in your kennel.
        </Typography>
      </Box>
    </Container>
  );
};

export default DogsList;
