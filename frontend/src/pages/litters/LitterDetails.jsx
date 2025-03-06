import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Container, 
  Paper, 
  Grid, 
  Divider, 
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  Card,
  CardMedia,
  CardContent,
  Tab,
  Tabs
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';

const LitterDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [litter, setLitter] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data fetch
  useEffect(() => {
    // In a real implementation, this would be an API call
    setTimeout(() => {
      setLitter({
        id: id,
        name: 'Spring 2025 Litter',
        sire: { id: 1, name: 'Max', breed: 'Golden Retriever' },
        dam: { id: 2, name: 'Luna', breed: 'Golden Retriever' },
        whelping_date: '2025-03-15',
        expected_date: '2025-03-10',
        puppies: [
          { id: 1, name: 'Puppy #1', gender: 'Male', color: 'Light Golden', status: 'Available', weight: '380g' },
          { id: 2, name: 'Puppy #2', gender: 'Female', color: 'Golden', status: 'Reserved', weight: '360g' },
          { id: 3, name: 'Puppy #3', gender: 'Male', color: 'Dark Golden', status: 'Available', weight: '400g' },
          { id: 4, name: 'Puppy #4', gender: 'Female', color: 'Light Golden', status: 'Reserved', weight: '350g' },
          { id: 5, name: 'Puppy #5', gender: 'Male', color: 'Golden', status: 'Available', weight: '390g' },
          { id: 6, name: 'Puppy #6', gender: 'Female', color: 'Golden', status: 'Reserved', weight: '370g' },
          { id: 7, name: 'Puppy #7', gender: 'Male', color: 'Dark Golden', status: 'Available', weight: '410g' },
        ],
        reservations: [
          { id: 101, contact: 'John Smith', puppy: 'Puppy #2', date: '2025-02-10', status: 'Confirmed' },
          { id: 102, contact: 'Emily Johnson', puppy: 'Puppy #4', date: '2025-02-15', status: 'Confirmed' },
          { id: 103, contact: 'Michael Brown', puppy: 'Puppy #6', date: '2025-02-20', status: 'Confirmed' },
        ],
        updates: [
          { id: 201, date: '2025-02-01', title: 'Pregnancy Confirmed', content: 'Ultrasound confirms Luna is pregnant with multiple puppies.' },
          { id: 202, date: '2025-02-20', title: 'Pre-Whelp Checkup', content: 'Luna had her pre-whelping veterinary checkup today and everything looks great.' },
          { id: 203, date: '2025-03-05', title: 'Final Preparations', content: 'Whelping box is set up and we are ready for the puppies to arrive any day now!' },
        ],
        status: 'Active',
        notes: 'This is the first litter from Max and Luna. Both parents have excellent health clearances and temperaments.'
      });
      setLoading(false);
    }, 800);
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography>Loading litter details...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/litters')}
          sx={{ mb: 2 }}
        >
          Back to Litters
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            {litter.name}
            <Chip 
              label={litter.status} 
              color="success" 
              size="small" 
              sx={{ ml: 2, verticalAlign: 'middle' }} 
            />
          </Typography>
          <Box>
            <Button 
              variant="outlined" 
              startIcon={<MailOutlineIcon />} 
              sx={{ mr: 1 }}
            >
              Send Update
            </Button>
            <Button 
              variant="contained" 
              startIcon={<EditIcon />}
            >
              Edit Litter
            </Button>
          </Box>
        </Box>

        <Paper sx={{ mb: 3 }}>
          <Tabs value={value} onChange={handleTabChange} variant="fullWidth">
            <Tab label="Overview" />
            <Tab label="Puppies" />
            <Tab label="Reservations" />
            <Tab label="Updates" />
            <Tab label="Files" />
          </Tabs>
          <Divider />

          {/* Overview Tab */}
          {value === 0 && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Litter Information</Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Sire" secondary={`${litter.sire.name} (${litter.sire.breed})`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Dam" secondary={`${litter.dam.name} (${litter.dam.breed})`} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Expected Date" secondary={litter.expected_date} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Whelping Date" secondary={litter.whelping_date} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Puppies" secondary={`${litter.puppies.length} (${litter.puppies.filter(p => p.gender === 'Male').length} males, ${litter.puppies.filter(p => p.gender === 'Female').length} females)`} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Statistics</Typography>
                  <List>
                    <ListItem>
                      <ListItemText primary="Available Puppies" secondary={litter.puppies.filter(p => p.status === 'Available').length} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Reserved Puppies" secondary={litter.puppies.filter(p => p.status === 'Reserved').length} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Sold Puppies" secondary={litter.puppies.filter(p => p.status === 'Sold').length} />
                    </ListItem>
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Notes</Typography>
                  <Typography variant="body1">{litter.notes}</Typography>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Puppies Tab */}
          {value === 1 && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                {litter.puppies.map((puppy) => (
                  <Grid item xs={12} sm={6} md={4} key={puppy.id}>
                    <Card>
                      <CardMedia
                        component="img"
                        height="140"
                        image={`https://placedog.net/500/280?id=${puppy.id}`}
                        alt={puppy.name}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h6" component="div">
                          {puppy.name}
                          <Chip 
                            label={puppy.status} 
                            color={puppy.status === 'Available' ? 'success' : puppy.status === 'Reserved' ? 'primary' : 'default'} 
                            size="small" 
                            sx={{ ml: 1, verticalAlign: 'middle' }} 
                          />
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {puppy.gender} • {puppy.color}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Current weight: {puppy.weight}
                        </Typography>
                        <Button 
                          size="small" 
                          variant="outlined" 
                          sx={{ mt: 1 }}
                          onClick={() => navigate(`/dogs/${puppy.id}`)}
                        >
                          Details
                        </Button>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}

          {/* Reservations Tab */}
          {value === 2 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Current Reservations</Typography>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Contact</TableCell>
                      <TableCell>Puppy</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {litter.reservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell>{reservation.contact}</TableCell>
                        <TableCell>{reservation.puppy}</TableCell>
                        <TableCell>{reservation.date}</TableCell>
                        <TableCell>
                          <Chip 
                            label={reservation.status} 
                            color="primary" 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell>
                          <Button 
                            size="small" 
                            variant="outlined"
                            onClick={() => navigate(`/reservations/${reservation.id}`)}
                          >
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
                onClick={() => navigate('/reservations/new')}
              >
                New Reservation
              </Button>
            </Box>
          )}

          {/* Updates Tab */}
          {value === 3 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Litter Updates</Typography>
              <List>
                {litter.updates.map((update) => (
                  <React.Fragment key={update.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1">
                            {update.title} <Typography component="span" variant="body2" color="text.secondary">({update.date})</Typography>
                          </Typography>
                        }
                        secondary={update.content}
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
              >
                Add Update
              </Button>
            </Box>
          )}

          {/* Files Tab */}
          {value === 4 && (
            <Box sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Litter Documents</Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Dam Health Clearances.pdf" 
                    secondary="Uploaded on 2025-01-15" 
                  />
                  <Button size="small">View</Button>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Sire Health Clearances.pdf" 
                    secondary="Uploaded on 2025-01-15" 
                  />
                  <Button size="small">View</Button>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AssignmentIcon />
                  </ListItemIcon>
                  <ListItemText 
                    primary="Litter Registration.pdf" 
                    secondary="Uploaded on 2025-03-20" 
                  />
                  <Button size="small">View</Button>
                </ListItem>
              </List>
              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
              >
                Upload Document
              </Button>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default LitterDetails;
