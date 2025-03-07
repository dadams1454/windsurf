import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  Container, 
  Paper, 
  Grid, 
  Divider,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Chip,
  TextField,
  Alert,
  CircularProgress,
  IconButton
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PrintIcon from '@mui/icons-material/Print';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { Line, Bar, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title } from 'chart.js';
import ApiService from '../../services/api.service';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Title
);

const FinancialDashboard = () => {
  const [timeFrame, setTimeFrame] = useState('year');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [financialData, setFinancialData] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  useEffect(() => {
    fetchFinancialData();
  }, [timeFrame]);

  useEffect(() => {
    if (transactions.length > 0) {
      filterTransactions();
    }
  }, [searchTerm, transactions]);

  const fetchFinancialData = async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch financial summary
      const summaryResponse = await ApiService.getFinancialSummary({ period: timeFrame });
      
      // Fetch revenue breakdown
      const revenueResponse = await ApiService.getRevenue({ period: timeFrame });
      
      // Fetch expense breakdown
      const expensesResponse = await ApiService.getExpenses({ period: timeFrame });
      
      // Fetch transactions
      const transactionsResponse = await ApiService.getTransactions({ 
        period: timeFrame,
        limit: 10, // Get last 10 transactions for the dashboard
        sort: 'date:desc'
      });
      
      // Combine all data
      setFinancialData({
        summary: summaryResponse.data,
        revenue: revenueResponse.data,
        expenses: expensesResponse.data
      });
      
      setTransactions(transactionsResponse.data);
      setFilteredTransactions(transactionsResponse.data);
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching financial data:', err);
      setError('Failed to load financial data. Please try again later.');
      setLoading(false);
    }
  };

  const filterTransactions = () => {
    if (!searchTerm.trim()) {
      setFilteredTransactions(transactions);
      return;
    }

    const filtered = transactions.filter(transaction => 
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.amount.toString().includes(searchTerm)
    );
    
    setFilteredTransactions(filtered);
  };

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Handle empty state
  const renderEmptyState = () => (
    <Box sx={{ mt: 4, textAlign: 'center' }}>
      <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
        No financial data available
      </Typography>
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={() => {
          // Navigate to transaction form or open a dialog
        }}
      >
        Add Your First Transaction
      </Button>
    </Box>
  );

  // Chart configurations
  const prepareRevenueVsExpensesChart = () => {
    if (!financialData) return null;

    // Prepare data for a 12-month period
    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Get the monthly data from API response
    const revenueData = financialData.summary.monthlyRevenue || Array(12).fill(0);
    const expenseData = financialData.summary.monthlyExpenses || Array(12).fill(0);
    
    return {
      labels,
      datasets: [
        {
          label: 'Revenue',
          data: revenueData,
          borderColor: 'rgba(75, 192, 192, 1)',
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          tension: 0.1
        },
        {
          label: 'Expenses',
          data: expenseData,
          borderColor: 'rgba(255, 99, 132, 1)',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.1
        }
      ]
    };
  };

  const prepareRevenueBreakdownChart = () => {
    if (!financialData?.revenue) return null;

    const labels = Object.keys(financialData.revenue).filter(key => key !== 'total');
    const data = labels.map(key => financialData.revenue[key] || 0);
    
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            'rgba(75, 192, 192, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(153, 102, 255, 0.6)',
          ],
          borderColor: [
            'rgba(75, 192, 192, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(255, 99, 132, 1)',
            'rgba(153, 102, 255, 1)',
          ],
          borderWidth: 1,
        }
      ]
    };
  };

  const prepareExpenseBreakdownChart = () => {
    if (!financialData?.expenses) return null;

    const labels = Object.keys(financialData.expenses).filter(key => key !== 'total');
    const data = labels.map(key => financialData.expenses[key] || 0);
    
    return {
      labels,
      datasets: [
        {
          data,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(201, 203, 207, 0.6)'
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(201, 203, 207, 1)'
          ],
          borderWidth: 1,
        }
      ]
    };
  };

  // Loading state
  if (loading) {
    return (
      <Container>
        <Box sx={{ mt: 10, display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
          <CircularProgress />
          <Typography sx={{ mt: 2 }}>Loading financial data...</Typography>
        </Box>
      </Container>
    );
  }

  // Error state
  if (error) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
          <Button variant="contained" onClick={fetchFinancialData}>
            Try Again
          </Button>
        </Box>
      </Container>
    );
  }

  // Empty state
  if (!financialData || !transactions.length) {
    return (
      <Container>
        {renderEmptyState()}
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Financial Dashboard
          </Typography>
          <Box>
            <FormControl sx={{ minWidth: 120, mr: 2 }}>
              <InputLabel id="time-frame-select-label">Time Frame</InputLabel>
              <Select
                labelId="time-frame-select-label"
                id="time-frame-select"
                value={timeFrame}
                label="Time Frame"
                onChange={handleTimeFrameChange}
                size="small"
              >
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="quarter">This Quarter</MenuItem>
                <MenuItem value="year">This Year</MenuItem>
                <MenuItem value="all">All Time</MenuItem>
              </Select>
            </FormControl>
            <Button 
              variant="outlined" 
              startIcon={<PrintIcon />}
              sx={{ mr: 1 }}
            >
              Print Report
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<DownloadIcon />}
              sx={{ mr: 1 }}
            >
              Export
            </Button>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
            >
              Add Transaction
            </Button>
          </Box>
        </Box>

        {/* Financial Summary */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Revenue
                    </Typography>
                    <Typography variant="h4">${financialData.summary.totalRevenue?.toLocaleString() || '0'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: financialData.summary.revenueChange >= 0 ? 'success.main' : 'error.main' }}>
                    {financialData.summary.revenueChange >= 0 ? 
                      <TrendingUpIcon sx={{ mr: 0.5 }} /> : 
                      <TrendingDownIcon sx={{ mr: 0.5 }} />
                    }
                    <Typography variant="body2">
                      {Math.abs(financialData.summary.revenueChange)}%
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Expenses
                    </Typography>
                    <Typography variant="h4">${financialData.summary.totalExpenses?.toLocaleString() || '0'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: financialData.summary.expenseChange <= 0 ? 'success.main' : 'error.main' }}>
                    {financialData.summary.expenseChange <= 0 ? 
                      <TrendingDownIcon sx={{ mr: 0.5 }} /> : 
                      <TrendingUpIcon sx={{ mr: 0.5 }} />
                    }
                    <Typography variant="body2">
                      {Math.abs(financialData.summary.expenseChange)}%
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Net Income
                    </Typography>
                    <Typography variant="h4">${financialData.summary.netIncome?.toLocaleString() || '0'}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: financialData.summary.netIncomeChange >= 0 ? 'success.main' : 'error.main' }}>
                    {financialData.summary.netIncomeChange >= 0 ? 
                      <TrendingUpIcon sx={{ mr: 0.5 }} /> : 
                      <TrendingDownIcon sx={{ mr: 0.5 }} />
                    }
                    <Typography variant="body2">
                      {Math.abs(financialData.summary.netIncomeChange)}%
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 2, height: 300 }}>
              <Typography variant="h6" gutterBottom>Revenue vs Expenses</Typography>
              <Box sx={{ height: 250 }}>
                {prepareRevenueVsExpensesChart() && (
                  <Line 
                    data={prepareRevenueVsExpensesChart()} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top',
                        },
                        title: {
                          display: false
                        }
                      }
                    }}
                  />
                )}
              </Box>
            </Paper>
          </Grid>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 2, height: 140 }}>
              <Typography variant="h6" gutterBottom>Revenue Breakdown</Typography>
              <Box sx={{ height: 100 }}>
                {prepareRevenueBreakdownChart() && (
                  <Doughnut 
                    data={prepareRevenueBreakdownChart()} 
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'right',
                          labels: {
                            boxWidth: 12
                          }
                        }
                      }
                    }}
                  />
                )}
              </Box>
            </Paper>
            <Box sx={{ mt: 2 }}>
              <Paper sx={{ p: 2, height: 140 }}>
                <Typography variant="h6" gutterBottom>Expense Breakdown</Typography>
                <Box sx={{ height: 100 }}>
                  {prepareExpenseBreakdownChart() && (
                    <Doughnut 
                      data={prepareExpenseBreakdownChart()} 
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            position: 'right',
                            labels: {
                              boxWidth: 12
                            }
                          }
                        }
                      }}
                    />
                  )}
                </Box>
              </Paper>
            </Box>
          </Grid>
        </Grid>

        {/* Transaction History */}
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Recent Transactions</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                size="small"
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: <SearchIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />,
                }}
                sx={{ mr: 2, width: 250 }}
              />
              <Button variant="outlined" component="a" href="/financial/transactions">View All</Button>
            </Box>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date</TableCell>
                  <TableCell>Description</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell align="right">Amount</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} align="center">
                      <Typography variant="body2" color="text.secondary">
                        No transactions found
                      </Typography>
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{new Date(transaction.date).toLocaleDateString()}</TableCell>
                      <TableCell>{transaction.description}</TableCell>
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
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default FinancialDashboard;
