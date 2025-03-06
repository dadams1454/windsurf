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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Card,
  CardContent,
  CardMedia,
  Tab,
  Tabs,
  TextField
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import LocalPrintshopIcon from '@mui/icons-material/LocalPrintshop';
import EmailIcon from '@mui/icons-material/Email';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ReceiptIcon from '@mui/icons-material/Receipt';
import AssignmentIcon from '@mui/icons-material/Assignment';

const SaleDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [sale, setSale] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock data fetch
  useEffect(() => {
    // In a real implementation, this would be an API call
    setTimeout(() => {
      setSale({
        id: parseInt(id),
        date: '2025-03-01',
        puppy: {
          id: 1,
          name: 'Max Jr.',
          breed: 'Golden Retriever',
          color: 'Golden',
          gender: 'Male',
          dob: '2025-01-15',
          microchip: '985112345678123',
          photo: 'https://placedog.net/500/280?id=1'
        },
        buyer: {
          id: 101,
          name: 'John Smith',
          email: 'john.smith@example.com',
          phone: '(555) 123-4567',
          address: '123 Main St, Anytown, NY 12345'
        },
        amount: 2500,
        contract: {
          id: 1,
          title: 'Puppy Purchase Agreement',
          signed_date: '2025-02-25'
        },
        status: 'Completed',
        payment_status: 'Paid',
        payments: [
          { id: 1, date: '2025-02-01', amount: 500, method: 'Credit Card', type: 'Deposit' },
          { id: 2, date: '2025-03-01', amount: 2000, method: 'Bank Transfer', type: 'Final Payment' }
        ],
        documents: [
          { id: 1, title: 'Puppy Purchase Agreement', date: '2025-02-25', type: 'Contract' },
          { id: 2, title: 'Health Certificate', date: '2025-02-28', type: 'Health Record' },
          { id: 3, title: 'AKC Registration', date: '2025-03-05', type: 'Registration' }
        ],
        communications: [
          { id: 1, date: '2025-02-01', type: 'Email', subject: 'Deposit Confirmation', summary: 'Confirmation of deposit and reservation details.' },
          { id: 2, date: '2025-02-15', type: 'Phone Call', subject: 'Pickup Arrangements', summary: 'Discussed pickup date and what to bring.' },
          { id: 3, date: '2025-03-01', type: 'Email', subject: 'Follow up and care instructions', summary: 'Sent puppy care package and first week instructions.' }
        ],
        notes: 'Buyer intends to do therapy work with this dog. Has owned Goldens before and has a good setup for a puppy.'
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
          <Typography>Loading sale details...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 2 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/sales')}
          sx={{ mb: 2 }}
        >
          Back to Sales
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Sale #{sale.id} - {sale.puppy.name}
            <Chip 
              label={sale.status} 
              color="success" 
              size="small" 
              sx={{ ml: 2, verticalAlign: 'middle' }} 
            />
          </Typography>
          <Box>
            <Button 
              variant="outlined" 
              startIcon={<LocalPrintshopIcon />} 
              sx={{ mr: 1 }}
            >
              Print
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<EmailIcon />} 
              sx={{ mr: 1 }}
            >
              Email
            </Button>
            <Button 
              variant="contained" 
              startIcon={<EditIcon />}
            >
              Edit Sale
            </Button>
          </Box>
        </Box>

        <Paper sx={{ mb: 3 }}>
          <Tabs value={value} onChange={handleTabChange} variant="fullWidth">
            <Tab label="Overview" />
            <Tab label="Payments" />
            <Tab label="Documents" />
            <Tab label="Communication" />
          </Tabs>
          <Divider />

          {/* Overview Tab */}
          {value === 0 && (
            <Box sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={4}>
                  <Card>
                    <CardMedia
                      component="img"
                      height="200"
                      image={sale.puppy.photo}
                      alt={sale.puppy.name}
                    />
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        Puppy Information
                      </Typography>
                      <Typography variant="body2">
                        <strong>Name:</strong> {sale.puppy.name}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Breed:</strong> {sale.puppy.breed}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Color:</strong> {sale.puppy.color}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Gender:</strong> {sale.puppy.gender}
                      </Typography>
                      <Typography variant="body2">
                        <strong>DOB:</strong> {sale.puppy.dob}
                      </Typography>
                      <Typography variant="body2">
                        <strong>Microchip:</strong> {sale.puppy.microchip}
                      </Typography>
                      <Button 
                        size="small" 
                        variant="outlined" 
                        sx={{ mt: 1 }}
                        onClick={() => navigate(`/dogs/${sale.puppy.id}`)}
                      >
                        View Dog Profile
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                      Buyer Information
                    </Typography>
                    <Typography variant="body2">
                      <strong>Name:</strong> {sale.buyer.name}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Email:</strong> {sale.buyer.email}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Phone:</strong> {sale.buyer.phone}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Address:</strong> {sale.buyer.address}
                    </Typography>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      sx={{ mt: 2 }}
                      onClick={() => navigate(`/contacts/${sale.buyer.id}`)}
                    >
                      View Contact
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={12} md={4}>
                  <Paper sx={{ p: 2, height: '100%' }}>
                    <Typography variant="h6" gutterBottom>
                      Sale Information
                    </Typography>
                    <Typography variant="body2">
                      <strong>Sale Date:</strong> {sale.date}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Sale Price:</strong> ${sale.amount.toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Payment Status:</strong> 
                      <Chip 
                        label={sale.payment_status} 
                        color="success" 
                        size="small" 
                        sx={{ ml: 1, verticalAlign: 'middle' }} 
                      />
                    </Typography>
                    <Typography variant="body2">
                      <strong>Contract:</strong> {sale.contract.title}
                    </Typography>
                    <Typography variant="body2">
                      <strong>Contract Signed:</strong> {sale.contract.signed_date}
                    </Typography>
                    <Button 
                      size="small" 
                      variant="outlined" 
                      startIcon={<AssignmentIcon />}
                      sx={{ mt: 2 }}
                    >
                      View Contract
                    </Button>
                  </Paper>
                </Grid>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      Notes
                    </Typography>
                    <TextField
                      fullWidth
                      multiline
                      rows={3}
                      variant="outlined"
                      value={sale.notes}
                    />
                    <Button variant="text" sx={{ mt: 1 }}>
                      Save Notes
                    </Button>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Payments Tab */}
          {value === 1 && (
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Payment History
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<AttachMoneyIcon />}
                >
                  Record Payment
                </Button>
              </Box>
              <TableContainer component={Paper} variant="outlined">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Method</TableCell>
                      <TableCell align="right">Amount</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sale.payments.map((payment) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.date}</TableCell>
                        <TableCell>{payment.type}</TableCell>
                        <TableCell>{payment.method}</TableCell>
                        <TableCell align="right">${payment.amount.toLocaleString()}</TableCell>
                        <TableCell>
                          <Button 
                            size="small" 
                            variant="outlined"
                            startIcon={<ReceiptIcon />}
                          >
                            Receipt
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell colSpan={3} align="right">
                        <Typography variant="subtitle1">Total:</Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Typography variant="subtitle1">
                          ${sale.payments.reduce((sum, payment) => sum + payment.amount, 0).toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
          )}

          {/* Documents Tab */}
          {value === 2 && (
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Sale Documents
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<AssignmentIcon />}
                >
                  Upload Document
                </Button>
              </Box>
              <List>
                {sale.documents.map((document) => (
                  <ListItem key={document.id}>
                    <ListItemText 
                      primary={document.title} 
                      secondary={`${document.type} • ${document.date}`} 
                    />
                    <Button size="small" variant="outlined">View</Button>
                  </ListItem>
                ))}
              </List>
            </Box>
          )}

          {/* Communication Tab */}
          {value === 3 && (
            <Box sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h6">
                  Communication History
                </Typography>
                <Button 
                  variant="contained" 
                  startIcon={<EmailIcon />}
                >
                  Send Email
                </Button>
              </Box>
              <List>
                {sale.communications.map((comm) => (
                  <React.Fragment key={comm.id}>
                    <ListItem alignItems="flex-start">
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1">
                            {comm.subject}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.secondary">
                              {comm.type} • {comm.date}
                            </Typography>
                            <Typography variant="body2" paragraph>
                              {comm.summary}
                            </Typography>
                          </>
                        }
                      />
                    </ListItem>
                    <Divider component="li" />
                  </React.Fragment>
                ))}
              </List>
            </Box>
          )}
        </Paper>
      </Box>
    </Container>
  );
};

export default SaleDetails;
