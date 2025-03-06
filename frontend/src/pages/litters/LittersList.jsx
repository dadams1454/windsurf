import React, { useState } from 'react';
import { 
  Typography, 
  Box, 
  Container, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow,
  Button,
  Chip,
  IconButton
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';

const LittersList = () => {
  const navigate = useNavigate();
  // Mock data for demonstration
  const [litters] = useState([
    { 
      id: 1, 
      name: 'Spring 2025 Litter', 
      sire: 'Max (Golden Retriever)', 
      dam: 'Luna (Golden Retriever)', 
      whelping_date: '2025-03-15', 
      puppies_count: 7,
      status: 'Active'
    },
    { 
      id: 2, 
      name: 'Winter Wonders', 
      sire: 'Duke (Labrador)', 
      dam: 'Bella (Labrador)', 
      whelping_date: '2025-01-10', 
      puppies_count: 6,
      status: 'Sold Out'
    },
    { 
      id: 3, 
      name: 'Summer Joy', 
      sire: 'Rocky (German Shepherd)', 
      dam: 'Daisy (German Shepherd)', 
      whelping_date: '2025-06-20', 
      puppies_count: 0,
      status: 'Planned'
    },
  ]);

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Litters Management
        </Typography>
        <Button 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => navigate('/litters/new')}
        >
          New Litter
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="litters table">
          <TableHead>
            <TableRow>
              <TableCell>Litter Name</TableCell>
              <TableCell>Sire</TableCell>
              <TableCell>Dam</TableCell>
              <TableCell>Whelping Date</TableCell>
              <TableCell>Puppies</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {litters.map((litter) => (
              <TableRow key={litter.id}>
                <TableCell component="th" scope="row">
                  {litter.name}
                </TableCell>
                <TableCell>{litter.sire}</TableCell>
                <TableCell>{litter.dam}</TableCell>
                <TableCell>{litter.whelping_date}</TableCell>
                <TableCell>{litter.puppies_count}</TableCell>
                <TableCell>
                  <Chip 
                    label={litter.status} 
                    color={
                      litter.status === 'Active' ? 'success' : 
                      litter.status === 'Planned' ? 'primary' : 'default'
                    }
                    size="small"
                  />
                </TableCell>
                <TableCell align="center">
                  <IconButton 
                    color="primary"
                    onClick={() => navigate(`/litters/${litter.id}`)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default LittersList;
