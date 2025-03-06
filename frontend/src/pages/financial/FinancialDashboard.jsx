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
  Select
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import PrintIcon from '@mui/icons-material/Print';

// In a real app, we would use a charting library like Chart.js or Recharts
// This is a placeholder for demonstration purposes
const MockChart = ({ title, height = 200 }) => (
  <Paper sx={{ p: 2, height: height, display: 'flex', flexDirection: 'column' }}>
    <Typography variant="h6" gutterBottom>{title}</Typography>
    <Box sx={{ 
      flexGrow: 1, 
      bgcolor: 'background.default', 
      border: '1px dashed', 
      borderColor: 'divider',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <Typography variant="body2" color="text.secondary">
        [Chart Visualization]
      </Typography>
    </Box>
  </Paper>
);

const FinancialDashboard = () => {
  const [timeFrame, setTimeFrame] = useState('year');
  const [loading, setLoading] = useState(true);
  const [financialData, setFinancialData] = useState(null);

  // Mock data fetch
  useEffect(() => {
    // In a real implementation, this would be an API call with the timeFrame as parameter
    setTimeout(() => {
      setFinancialData({
        summary: {
          totalRevenue: 28500,
          totalExpenses: 12350,
          netIncome: 16150,
          revenueChange: 12.5, // percentage change from previous period
          expenseChange: 8.2,
          netIncomeChange: 15.4
        },
        revenue: {
          puppySales: 25000,
          studFees: 3500,
          other: 0
        },
        expenses: {
          veterinary: 4500,
          food: 2800,
          supplies: 1200,
          advertising: 850,
          registration: 600,
          utilities: 1400,
          other: 1000
        },
        recentTransactions: [
          { id: 1, date: '2025-03-01', description: 'Puppy Sale - Golden Retriever Male', amount: 2500, type: 'Income' },
          { id: 2, date: '2025-02-25', description: 'Veterinary Visit - Vaccinations', amount: 450, type: 'Expense' },
          { id: 3, date: '2025-02-20', description: 'Puppy Sale - Golden Retriever Female', amount: 2500, type: 'Income' },
          { id: 4, date: '2025-02-15', description: 'Dog Food - Premium Brand', amount: 280, type: 'Expense' },
          { id: 5, date: '2025-02-10', description: 'Stud Service Fee', amount: 1500, type: 'Income' },
        ]
      });
      setLoading(false);
    }, 800);
  }, [timeFrame]);

  const handleTimeFrameChange = (event) => {
    setTimeFrame(event.target.value);
    setLoading(true);
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography>Loading financial data...</Typography>
        </Box>
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
                    <Typography variant="h4">${financialData.summary.totalRevenue.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                    <TrendingUpIcon sx={{ mr: 0.5 }} />
                    <Typography variant="body2">
                      {financialData.summary.revenueChange}%
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
                    <Typography variant="h4">${financialData.summary.totalExpenses.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'error.main' }}>
                    <TrendingUpIcon sx={{ mr: 0.5 }} />
                    <Typography variant="body2">
                      {financialData.summary.expenseChange}%
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
                    <Typography variant="h4">${financialData.summary.netIncome.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', color: 'success.main' }}>
                    <TrendingUpIcon sx={{ mr: 0.5 }} />
                    <Typography variant="body2">
                      {financialData.summary.netIncomeChange}%
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
            <MockChart title="Revenue vs Expenses" height={300} />
          </Grid>
          <Grid item xs={12} md={4}>
            <MockChart title="Revenue Breakdown" />
            <Box sx={{ mt: 3 }}>
              <MockChart title="Expense Breakdown" />
            </Box>
          </Grid>
        </Grid>

        {/* Revenue Breakdown */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Revenue Breakdown</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Puppy Sales</TableCell>
                      <TableCell align="right">${financialData.revenue.puppySales.toLocaleString()}</TableCell>
                      <TableCell align="right">{Math.round(financialData.revenue.puppySales / financialData.summary.totalRevenue * 100)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Stud Fees</TableCell>
                      <TableCell align="right">${financialData.revenue.studFees.toLocaleString()}</TableCell>
                      <TableCell align="right">{Math.round(financialData.revenue.studFees / financialData.summary.totalRevenue * 100)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Other Income</TableCell>
                      <TableCell align="right">${financialData.revenue.other.toLocaleString()}</TableCell>
                      <TableCell align="right">{Math.round(financialData.revenue.other / financialData.summary.totalRevenue * 100)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Total</strong></TableCell>
                      <TableCell align="right"><strong>${financialData.summary.totalRevenue.toLocaleString()}</strong></TableCell>
                      <TableCell align="right"><strong>100%</strong></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>Expense Breakdown</Typography>
              <TableContainer>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Category</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell align="right">Percentage</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>Veterinary</TableCell>
                      <TableCell align="right">${financialData.expenses.veterinary.toLocaleString()}</TableCell>
                      <TableCell align="right">{Math.round(financialData.expenses.veterinary / financialData.summary.totalExpenses * 100)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Food</TableCell>
                      <TableCell align="right">${financialData.expenses.food.toLocaleString()}</TableCell>
                      <TableCell align="right">{Math.round(financialData.expenses.food / financialData.summary.totalExpenses * 100)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Supplies</TableCell>
                      <TableCell align="right">${financialData.expenses.supplies.toLocaleString()}</TableCell>
                      <TableCell align="right">{Math.round(financialData.expenses.supplies / financialData.summary.totalExpenses * 100)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Advertising</TableCell>
                      <TableCell align="right">${financialData.expenses.advertising.toLocaleString()}</TableCell>
                      <TableCell align="right">{Math.round(financialData.expenses.advertising / financialData.summary.totalExpenses * 100)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Registration</TableCell>
                      <TableCell align="right">${financialData.expenses.registration.toLocaleString()}</TableCell>
                      <TableCell align="right">{Math.round(financialData.expenses.registration / financialData.summary.totalExpenses * 100)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Utilities</TableCell>
                      <TableCell align="right">${financialData.expenses.utilities.toLocaleString()}</TableCell>
                      <TableCell align="right">{Math.round(financialData.expenses.utilities / financialData.summary.totalExpenses * 100)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>Other</TableCell>
                      <TableCell align="right">${financialData.expenses.other.toLocaleString()}</TableCell>
                      <TableCell align="right">{Math.round(financialData.expenses.other / financialData.summary.totalExpenses * 100)}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell><strong>Total</strong></TableCell>
                      <TableCell align="right"><strong>${financialData.summary.totalExpenses.toLocaleString()}</strong></TableCell>
                      <TableCell align="right"><strong>100%</strong></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Grid>
        </Grid>

        {/* Recent Transactions */}
        <Paper sx={{ p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="h6">Recent Transactions</Typography>
            <Button variant="outlined">View All</Button>
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
                {financialData.recentTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.date}</TableCell>
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
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Box>
    </Container>
  );
};

export default FinancialDashboard;
