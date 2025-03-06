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
  IconButton,
  TextField,
  InputAdornment,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const SalesList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data for demonstration
  const [sales] = useState([
    { 
      id: 1, 
      date: '2025-03-01', 
      puppy: 'Max Jr. (Golden Retriever)', 
      buyer: 'John Smith', 
      amount: 2500,
      status: 'Completed',
      payment_status: 'Paid'
    },
    { 
      id: 2, 
      date: '2025-02-15', 
      puppy: 'Bella (Labrador)', 
      buyer: 'Emily Johnson', 
      amount: 2200,
      status: 'Completed',
      payment_status: 'Paid'
    },
    { 
      id: 3, 
      date: '2025-03-10', 
      puppy: 'Duke (German Shepherd)', 
      buyer: 'Michael Brown', 
      amount: 2800,
      status: 'In Progress',
      payment_status: 'Partial'
    },
    { 
      id: 4, 
      date: '2025-03-20', 
      puppy: 'Luna (Golden Retriever)', 
      buyer: 'Sarah Wilson', 
      amount: 2500,
      status: 'Pending',
      payment_status: 'Deposit'
    },
    { 
      id: 5, 
      date: '2025-02-28', 
      puppy: 'Cooper (Labrador)', 
      buyer: 'David Miller', 
      amount: 2200,
      status: 'Completed',
      payment_status: 'Paid'
    },
  ]);

  // Filter sales based on search term
  const filteredSales = sales.filter(sale => 
    sale.puppy.toLowerCase().includes(searchTerm.toLowerCase()) || 
    sale.buyer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total revenue
  const totalRevenue = sales
    .filter(sale => sale.payment_status === 'Paid')
    .reduce((sum, sale) => sum + sale.amount, 0);

  // Calculate pending revenue
  const pendingRevenue = sales
    .filter(sale => sale.payment_status !== 'Paid')
    .reduce((sum, sale) => sum + sale.amount, 0);

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

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Sales
              </Typography>
              <Typography variant="h4">{sales.length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Completed Sales
              </Typography>
              <Typography variant="h4">{sales.filter(sale => sale.status === 'Completed').length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Revenue
              </Typography>
              <Typography variant="h4">${totalRevenue.toLocaleString()}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Pending Revenue
              </Typography>
              <Typography variant="h4">${pendingRevenue.toLocaleString()}</Typography>
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
              {filteredSales.map((sale) => (
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
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default SalesList;
