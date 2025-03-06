import React from 'react';
import { Typography, Box, Container, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

const DogDetails = () => {
  const { id } = useParams();
  
  return (
    <Container>
      <Box sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dog Details
        </Typography>
        <Paper elevation={3} sx={{ p: 3 }}>
          <Typography variant="body1">
            Viewing details for dog with ID: {id}
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default DogDetails;
