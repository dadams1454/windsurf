import React, { useState, useEffect } from 'react';
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
  IconButton,
  Alert,
  CircularProgress,
  TextField,
  InputAdornment
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import ApiService from '../../services/api.service';

const LittersList = () => {
  const navigate = useNavigate();
  const [litters, setLitters] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchLitters();
  }, []);

  const fetchLitters = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getLitters();
      setLitters(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching litters:', err);
      setError('Failed to load litters data. Please try again later.');
      setLoading(false);
    }
  };

  // Filter litters based on search term
  const filteredLitters = litters.filter(litter => 
    litter.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    litter.sire?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    litter.dam?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
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

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Paper sx={{ p: 2, mb: 3 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search by litter name, sire, or dam"
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
        </Paper>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : filteredLitters.length > 0 ? (
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
                {filteredLitters.map((litter) => (
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
                        sx={{ mr: 1 }}
                      >
                        <VisibilityIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        color="secondary"
                        onClick={() => navigate(`/litters/${litter.id}/edit`)}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Paper sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary">
              No litters found
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {searchTerm ? 'Try a different search term or' : 'Get started by'} creating a new litter.
            </Typography>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => navigate('/litters/new')}
              sx={{ mt: 2 }}
            >
              New Litter
            </Button>
          </Paper>
        )}
      </Box>
    </Container>
  );
};

export default LittersList;
