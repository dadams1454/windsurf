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
  TextField,
  InputAdornment,
  Grid,
  Alert,
  CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import ApiService from '../../services/api.service';

const SalesList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [stats, setStats] = useState({
    totalSales: 0,
    completedSales: 0,
    totalRevenue: 0,
    pendingRevenue: 0
  });
  
  useEffect(() => {
    fetchSales();
  }, []);

  const fetchSales = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getSales();
      setSales(response.data);
      calculateStats(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching sales:', err);
      setError('Failed to load sales data. Please try again later.');
      setLoading(false);
    }
  };

  const calculateStats = (salesData) => {
    const totalSales = salesData.length;
    const completedSales = salesData.filter(sale => sale.status === 'Completed').length;
    
    const totalRevenue = salesData
      .filter(sale => sale.payment_status === 'Paid')
      .reduce((sum, sale) => sum + sale.amount, 0);
    
    const pendingRevenue = salesData
      .filter(sale => sale.payment_status !== 'Paid')
      .reduce((sum, sale) => sum + sale.amount, 0);

    setStats({
      totalSales,
      completedSales,
      totalRevenue,
      pendingRevenue
    });
  };

  // Filter sales based on search term
  const filteredSales = sales.filter(sale => 
    sale.puppy?.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sale.buyer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Sales Management
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => navigate('/sales/new')}
          >
            New Sale
          </Button>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Sales
              </Typography>
              <Typography variant="h4">{stats.totalSales}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Completed Sales
              </Typography>
              <Typography variant="h4">{stats.completedSales}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Revenue
              </Typography>
              <Typography variant="h4">${stats.totalRevenue.toLocaleString()}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Pending Revenue
              </Typography>
              <Typography variant="h4">${stats.pendingRevenue.toLocaleString()}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search by puppy or buyer"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ mr: 2 }}
          />
          <Button 
            variant="outlined" 
            startIcon={<FilterListIcon />}
          >
            Filter
          </Button>
        </Box>

        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="sales table">
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Puppy</TableCell>
                  <TableCell>Buyer</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell>Sale Status</TableCell>
                  <TableCell>Payment Status</TableCell>
                  <TableCell align="center">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredSales.length > 0 ? (
                  filteredSales.map((sale) => (
                    <TableRow key={sale.id}>
                      <TableCell>{sale.date}</TableCell>
                      <TableCell>{sale.puppy}</TableCell>
                      <TableCell>{sale.buyer}</TableCell>
                      <TableCell align="right">${sale.amount.toLocaleString()}</TableCell>
                      <TableCell>
                        <Chip 
                          label={sale.status} 
                          color={
                            sale.status === 'Completed' ? 'success' : 
                            sale.status === 'In Progress' ? 'primary' : 'default'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={sale.payment_status} 
                          color={
                            sale.payment_status === 'Paid' ? 'success' : 
                            sale.payment_status === 'Partial' ? 'primary' : 'warning'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell align="center">
                        <IconButton 
                          color="primary"
                          onClick={() => navigate(`/sales/${sale.id}`)}
                        >
                          <VisibilityIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={7} align="center">
                      No sales found
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default SalesList;
