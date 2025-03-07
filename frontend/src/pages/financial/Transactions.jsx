import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Container,
  Paper,
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  CircularProgress,
  Card,
  CardContent
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import DownloadIcon from '@mui/icons-material/Download';
import ApiService from '../../services/api.service';

const Transactions = () => {
  // State for transactions
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for pagination
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  
  // State for filtering and searching
  const [searchTerm, setSearchTerm] = useState('');
  const [timeFrame, setTimeFrame] = useState('all');
  const [transactionType, setTransactionType] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');

  // State for transaction creation/editing
  const [openTransactionDialog, setOpenTransactionDialog] = useState(false);
  const [currentTransaction, setCurrentTransaction] = useState(null);
  const [transactionFormData, setTransactionFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    description: '',
    amount: '',
    type: 'Expense',
    category: '',
    notes: ''
  });

  // Load transactions on component mount and when filters change
  useEffect(() => {
    fetchTransactions();
  }, [timeFrame, transactionType]);

  // Apply search and amount filters
  useEffect(() => {
    applyFilters();
  }, [searchTerm, minAmount, maxAmount, transactions]);

  const fetchTransactions = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = { sort: 'date:desc' };
      
      if (timeFrame !== 'all') {
        params.period = timeFrame;
      }
      
      if (transactionType !== 'all') {
        params.type = transactionType;
      }
      
      const response = await ApiService.getTransactions(params);
      setTransactions(response.data);
      setFilteredTransactions(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching transactions:', err);
      setError('Failed to load transactions. Please try again later.');
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...transactions];
    
    // Apply search term filter
    if (searchTerm) {
      filtered = filtered.filter(transaction => 
        transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (transaction.category && transaction.category.toLowerCase().includes(searchTerm.toLowerCase())) ||
        transaction.amount.toString().includes(searchTerm)
      );
    }
    
    // Apply min amount filter
    if (minAmount) {
      filtered = filtered.filter(transaction => 
        transaction.amount >= parseFloat(minAmount)
      );
    }
    
    // Apply max amount filter
    if (maxAmount) {
      filtered = filtered.filter(transaction => 
        transaction.amount <= parseFloat(maxAmount)
      );
    }
    
    setFilteredTransactions(filtered);
    setPage(0); // Reset to first page when filters change
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  const handleTransactionTypeChange = (event) => {
    setTransactionType(event.target.value);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setTimeFrame('all');
    setTransactionType('all');
    setMinAmount('');
    setMaxAmount('');
    setShowFilters(false);
  };

  const handleAddTransaction = () => {
    setCurrentTransaction(null);
    setTransactionFormData({
      date: new Date().toISOString().split('T')[0],
      description: '',
      amount: '',
      type: 'Expense',
      category: '',
      notes: ''
    });
    setOpenTransactionDialog(true);
  };

  const handleEditTransaction = (transaction) => {
    setCurrentTransaction(transaction);
    setTransactionFormData({
      date: new Date(transaction.date).toISOString().split('T')[0],
      description: transaction.description,
      amount: transaction.amount.toString(),
      type: transaction.type,
      category: transaction.category || '',
      notes: transaction.notes || ''
    });
    setOpenTransactionDialog(true);
  };

  const handleTransactionFormChange = (event) => {
    const { name, value } = event.target;
    setTransactionFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveTransaction = async () => {
    try {
      const transactionData = {
        ...transactionFormData,
        amount: parseFloat(transactionFormData.amount)
      };
      
      if (currentTransaction) {
        // Update existing transaction
        await ApiService.updateTransaction(currentTransaction.id, transactionData);
      } else {
        // Create new transaction
        await ApiService.addTransaction(transactionData);
      }
      
      setOpenTransactionDialog(false);
      fetchTransactions(); // Reload transactions
    } catch (err) {
      console.error('Error saving transaction:', err);
      setError('Failed to save transaction. Please try again.');
    }
  };

  const handleDeleteTransaction = async (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await ApiService.deleteTransaction(id);
        fetchTransactions(); // Reload transactions
      } catch (err) {
        console.error('Error deleting transaction:', err);
        setError('Failed to delete transaction. Please try again.');
      }
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  // Calculate summary data
  const calculateSummary = () => {
    if (!filteredTransactions.length) return { totalIncome: 0, totalExpenses: 0, balance: 0 };
    
    const totalIncome = filteredTransactions
      .filter(t => t.type === 'Income')
      .reduce((sum, t) => sum + t.amount, 0);
      
    const totalExpenses = filteredTransactions
      .filter(t => t.type === 'Expense')
      .reduce((sum, t) => sum + t.amount, 0);
      
    return {
      totalIncome,
      totalExpenses,
      balance: totalIncome - totalExpenses
    };
  };

  const summary = calculateSummary();

  // Loading state
  if (loading && transactions.length === 0) {
    return (
      <Container>
        <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Loading transactions...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Transactions
          </Typography>
          <Box>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={handleAddTransaction}
            >
              Add Transaction
            </Button>
          </Box>
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
            <Button color="inherit" size="small" onClick={fetchTransactions} sx={{ ml: 2 }}>
              Try Again
            </Button>
          </Alert>
        )}

        {/* Summary Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Income
                </Typography>
                <Typography variant="h4" color="success.main">
                  ${summary.totalIncome.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Total Expenses
                </Typography>
                <Typography variant="h4" color="error.main">
                  ${summary.totalExpenses.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Typography variant="subtitle2" color="text.secondary">
                  Balance
                </Typography>
                <Typography 
                  variant="h4" 
                  color={summary.balance >= 0 ? 'success.main' : 'error.main'}
                >
                  ${summary.balance.toLocaleString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Filters Section */}
        <Paper sx={{ p: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center', mb: showFilters ? 2 : 0 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, maxWidth: 500 }}>
              <TextField
                placeholder="Search transactions..."
                variant="outlined"
                size="small"
                fullWidth
                value={searchTerm}
                onChange={handleSearchChange}
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
                onClick={toggleFilters}
                sx={{ minWidth: 120 }}
              >
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </Button>
            </Box>
            <Box sx={{ display: 'flex', mt: { xs: 2, sm: 0 } }}>
              <Button 
                variant="outlined" 
                startIcon={<DownloadIcon />}
                sx={{ ml: 1 }}
              >
                Export
              </Button>
            </Box>
          </Box>

          {showFilters && (
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 2 }}>
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel id="time-frame-label">Time Period</InputLabel>
                <Select
                  labelId="time-frame-label"
                  id="time-frame"
                  value={timeFrame}
                  label="Time Period"
                  onChange={handleTimeFrameChange}
                  size="small"
                >
                  <MenuItem value="all">All Time</MenuItem>
                  <MenuItem value="month">This Month</MenuItem>
                  <MenuItem value="quarter">This Quarter</MenuItem>
                  <MenuItem value="year">This Year</MenuItem>
                </Select>
              </FormControl>
              
              <FormControl sx={{ minWidth: 150 }}>
                <InputLabel id="transaction-type-label">Type</InputLabel>
                <Select
                  labelId="transaction-type-label"
                  id="transaction-type"
                  value={transactionType}
                  label="Type"
                  onChange={handleTransactionTypeChange}
                  size="small"
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="Income">Income</MenuItem>
                  <MenuItem value="Expense">Expense</MenuItem>
                </Select>
              </FormControl>
              
              <TextField
                label="Min Amount"
                size="small"
                type="number"
                value={minAmount}
                onChange={(e) => setMinAmount(e.target.value)}
                sx={{ width: 120 }}
              />
              
              <TextField
                label="Max Amount"
                size="small"
                type="number"
                value={maxAmount}
                onChange={(e) => setMaxAmount(e.target.value)}
                sx={{ width: 120 }}
              />
              
              <Button 
                variant="outlined" 
                color="secondary"
                onClick={resetFilters}
              >
                Reset Filters
              </Button>
            </Box>
          )}
        </Paper>

        {/* Transactions Table */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          {loading && transactions.length > 0 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', p: 2 }}>
              <CircularProgress size={24} />
              <Typography sx={{ ml: 2 }}>Updating...</Typography>
            </Box>
          )}
          
          <TableContainer>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Category</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">Amount</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} align="center">
                      <Typography sx={{ py: 3 }} color="text.secondary">
                        No transactions found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>{formatDate(transaction.date)}</TableCell>
                        <TableCell>{transaction.description}</TableCell>
                        <TableCell>{transaction.category || '-'}</TableCell>
                        <TableCell>
                          <Chip 
                            label={transaction.type} 
                            color={transaction.type === 'Income' ? 'success' : 'error'} 
                            size="small" 
                          />
                        </TableCell>
                        <TableCell align="right">
                          <Typography 
                            color={transaction.type === 'Income' ? 'success.main' : 'error.main'}
                          >
                            {transaction.type === 'Income' ? '+' : '-'}${transaction.amount.toLocaleString()}
                          </Typography>
                        </TableCell>
                        <TableCell align="right">
                          <IconButton 
                            size="small" 
                            onClick={() => handleEditTransaction(transaction)}
                            aria-label="edit"
                          >
                            <EditIcon fontSize="small" />
                          </IconButton>
                          <IconButton 
                            size="small" 
                            onClick={() => handleDeleteTransaction(transaction.id)}
                            aria-label="delete"
                            color="error"
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
          
          <TablePagination
            rowsPerPageOptions={[10, 25, 50, 100]}
            component="div"
            count={filteredTransactions.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>

      {/* Transaction Dialog */}
      <Dialog 
        open={openTransactionDialog} 
        onClose={() => setOpenTransactionDialog(false)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>
          {currentTransaction ? 'Edit Transaction' : 'Add New Transaction'}
        </DialogTitle>
        <DialogContent>
          <Box component="form" sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Date"
              type="date"
              name="date"
              fullWidth
              value={transactionFormData.date}
              onChange={handleTransactionFormChange}
              InputLabelProps={{ shrink: true }}
            />
            
            <TextField
              label="Description"
              name="description"
              fullWidth
              value={transactionFormData.description}
              onChange={handleTransactionFormChange}
              required
            />
            
            <TextField
              label="Amount"
              name="amount"
              type="number"
              fullWidth
              value={transactionFormData.amount}
              onChange={handleTransactionFormChange}
              required
              InputProps={{
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
              }}
            />
            
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                name="type"
                value={transactionFormData.type}
                label="Type"
                onChange={handleTransactionFormChange}
              >
                <MenuItem value="Income">Income</MenuItem>
                <MenuItem value="Expense">Expense</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label="Category"
              name="category"
              fullWidth
              value={transactionFormData.category}
              onChange={handleTransactionFormChange}
            />
            
            <TextField
              label="Notes"
              name="notes"
              fullWidth
              multiline
              rows={3}
              value={transactionFormData.notes}
              onChange={handleTransactionFormChange}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTransactionDialog(false)}>Cancel</Button>
          <Button 
            onClick={handleSaveTransaction} 
            variant="contained"
            disabled={!transactionFormData.description || !transactionFormData.amount}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Transactions;
