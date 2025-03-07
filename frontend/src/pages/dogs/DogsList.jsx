import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Container, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActions,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  Chip,
  Alert,
  CircularProgress,
  Divider
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import FemaleIcon from '@mui/icons-material/Female';
import MaleIcon from '@mui/icons-material/Male';
import ApiService from '../../services/api.service';

const DogsList = () => {
  const navigate = useNavigate();
  const [dogs, setDogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchDogs();
  }, []);

  const fetchDogs = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getDogs();
      setDogs(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching dogs:', err);
      setError('Failed to load dogs data. Please try again later.');
      setLoading(false);
    }
  };

  // Filter dogs based on search term
  const filteredDogs = dogs.filter(dog => 
    dog.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    dog.breed?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const dogPlaceholderImage = 'https://via.placeholder.com/300x200?text=No+Image';

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Dogs Management
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => navigate('/dogs/new')}
          >
            Add Dog
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 2, mb: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <TextField
                fullWidth
                size="small"
                placeholder="Search by name or breed"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={6} md={2}>
              <Typography variant="body2" color="text.secondary">
                Total: <strong>{dogs.length}</strong> dogs
              </Typography>
            </Grid>
            <Grid item xs={6} md={2}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Chip 
                  icon={<MaleIcon />} 
                  label={`${dogs.filter(dog => dog.gender === 'Male').length} Males`}
                  size="small"
                  color="primary"
                  sx={{ mr: 1 }}
                />
                <Chip 
                  icon={<FemaleIcon />} 
                  label={`${dogs.filter(dog => dog.gender === 'Female').length} Females`}
                  size="small"
                  color="secondary"
                />
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredDogs.length > 0 ? (
          <Grid container spacing={3}>
            {filteredDogs.map((dog) => (
              <Grid item xs={12} sm={6} md={4} key={dog.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardMedia
                    component="img"
                    sx={{ height: 200, objectFit: 'cover' }}
                    image={dog.image || dogPlaceholderImage}
                    alt={dog.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                      <Typography variant="h6" component="div">
                        {dog.name}
                      </Typography>
                      <IconButton size="small" color={dog.gender === 'Male' ? 'primary' : 'secondary'}>
                        {dog.gender === 'Male' ? <MaleIcon /> : <FemaleIcon />}
                      </IconButton>
                    </Box>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      {dog.breed}
                    </Typography>
                    <Divider sx={{ my: 1 }} />
                    <Typography variant="body2">
                      <strong>Age:</strong> {dog.age} {dog.age === 1 ? 'year' : 'years'}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Color:</strong> {dog.color}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Registration:</strong> {dog.registration_number || 'N/A'}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button 
                      size="small" 
                      startIcon={<VisibilityIcon />}
                      onClick={() => navigate(`/dogs/${dog.id}`)}
                    >
                      View
                    </Button>
                    <Button 
                      size="small" 
                      startIcon={<EditIcon />}
                      onClick={() => navigate(`/dogs/${dog.id}/edit`)}
                    >
                      Edit
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              No dogs found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchTerm ? 'Try a different search term or' : 'Get started by'} adding a new dog to your kennel.
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => navigate('/dogs/new')}
              sx={{ mt: 2 }}
            >
              Add Dog
            </Button>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default DogsList;
