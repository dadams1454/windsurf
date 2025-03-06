import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Container,
  Paper,
  Grid,
  Card,
  CardContent,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Chip,
  Avatar,
  Button
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import PetsIcon from '@mui/icons-material/Pets';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import ContactsIcon from '@mui/icons-material/Contacts';
import EventIcon from '@mui/icons-material/Event';
import NotificationsIcon from '@mui/icons-material/Notifications';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmailIcon from '@mui/icons-material/Email';
import WarningIcon from '@mui/icons-material/Warning';
import WhatshotIcon from '@mui/icons-material/Whatshot';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    dogCount: 0,
    litterCount: 0,
    reservationCount: 0,
    contactCount: 0,
    pendingSales: 0,
    upcomingVaccinations: 0
  });
  
  const [loading, setLoading] = useState(true);
  const [alerts, setAlerts] = useState([]);
  const [recentActivity, setRecentActivity] = useState([]);

  useEffect(() => {
    // In a real implementation, this would fetch actual data from your API
    // For now, we'll use mock data
    const fetchDashboardData = async () => {
      try {
        // Simulating API call with timeout
        setTimeout(() => {
          setStats({
            dogCount: 12,
            litterCount: 3,
            reservationCount: 8,
            contactCount: 25,
            pendingSales: 4,
            upcomingVaccinations: 6
          });
          
          setAlerts([
            { id: 1, type: 'warning', message: 'Max vaccination due in 2 days', icon: <WarningIcon color="warning" /> },
            { id: 2, type: 'info', message: 'Luna\'s heat cycle expected next week', icon: <WhatshotIcon color="error" /> },
            { id: 3, type: 'info', message: 'Website renewal due on 03/15/2025', icon: <NotificationsIcon color="info" /> }
          ]);
          
          setRecentActivity([
            { id: 1, type: 'inquiry', title: 'New Inquiry', description: 'John Smith is interested in golden retriever puppies', time: '5 hours ago', icon: <EmailIcon color="primary" /> },
            { id: 2, type: 'litter', title: 'Litter Update', description: 'Luna\'s puppies are now 6 weeks old', time: '1 day ago', icon: <ChildCareIcon color="secondary" /> },
            { id: 3, type: 'sale', title: 'New Sale', description: 'Golden Retriever puppy sold to Sarah Johnson', time: '2 days ago', icon: <TrendingUpIcon color="success" /> }
          ]);
          
          setLoading(false);
        }, 800);
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const upcomingTasks = [
    { id: 1, date: 'Today', title: 'Vaccinate Luna\'s puppies', priority: 'high' },
    { id: 2, date: 'Tomorrow', title: 'Vet appointment for Max', priority: 'medium' },
    { id: 3, date: 'Mar 8', title: 'Update website with new litter photos', priority: 'low' },
    { id: 4, date: 'Mar 10', title: 'Schedule health testing for Bella', priority: 'medium' }
  ];

  const recentInquiries = [
    { id: 1, name: 'John Smith', date: '5 hours ago', message: 'Interested in puppies from upcoming litter...', email: 'john.smith@example.com', phone: '555-123-4567' },
    { id: 2, name: 'Sarah Johnson', date: 'Yesterday', message: 'Questions about health testing for parents...', email: 'sarah.j@example.com', phone: '555-234-5678' },
    { id: 3, name: 'Michael Brown', date: '2 days ago', message: 'Looking for golden retriever puppy for family...', email: 'mbrown@example.com', phone: '555-345-6789' }
  ];

  if (loading) {
    return (
      <Container>
        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h6">Loading dashboard data...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Breeder Dashboard
          </Typography>
          <Box>
            <Button 
              variant="contained" 
              onClick={() => navigate('/dogs/new')}
              sx={{ mr: 1 }}
            >
              Add Dog
            </Button>
            <Button 
              variant="contained" 
              onClick={() => navigate('/litters/new')}
            >
              Add Litter
            </Button>
          </Box>
        </Box>

        {/* Stats Cards Row */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#e3f2fd', height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <PetsIcon sx={{ fontSize: 48, color: '#1976d2', mb: 1 }} />
                <Typography variant="h4">{stats.dogCount}</Typography>
                <Typography variant="subtitle1" color="text.secondary">Dogs</Typography>
                <Typography variant="body2" color="text.secondary">Total dogs in kennel</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#e8f5e9', height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <ChildCareIcon sx={{ fontSize: 48, color: '#2e7d32', mb: 1 }} />
                <Typography variant="h4">{stats.litterCount}</Typography>
                <Typography variant="subtitle1" color="text.secondary">Litters</Typography>
                <Typography variant="body2" color="text.secondary">Active litters</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#fff8e1', height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <BookmarkIcon sx={{ fontSize: 48, color: '#ff9800', mb: 1 }} />
                <Typography variant="h4">{stats.reservationCount}</Typography>
                <Typography variant="subtitle1" color="text.secondary">Reservations</Typography>
                <Typography variant="body2" color="text.secondary">Pending puppy reservations</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ bgcolor: '#f3e5f5', height: '100%' }}>
              <CardContent sx={{ textAlign: 'center' }}>
                <ContactsIcon sx={{ fontSize: 48, color: '#9c27b0', mb: 1 }} />
                <Typography variant="h4">{stats.contactCount}</Typography>
                <Typography variant="subtitle1" color="text.secondary">Contacts</Typography>
                <Typography variant="body2" color="text.secondary">Total contacts</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Alerts Row */}
        <Paper sx={{ p: 2, mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Alerts & Notifications
          </Typography>
          <List>
            {alerts.map((alert) => (
              <ListItem key={alert.id} divider>
                <Box sx={{ mr: 2 }}>
                  {alert.icon}
                </Box>
                <ListItemText primary={alert.message} />
              </ListItem>
            ))}
          </List>
        </Paper>

        {/* Main Dashboard Content */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Upcoming Tasks
              </Typography>
              <List>
                {upcomingTasks.map((task) => (
                  <ListItem key={task.id} divider>
                    <ListItemText 
                      primary={task.title} 
                      secondary={task.date} 
                    />
                    <Chip 
                      label={task.priority} 
                      size="small" 
                      color={
                        task.priority === 'high' ? 'error' : 
                        task.priority === 'medium' ? 'warning' : 'default'
                      }
                    />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="outlined"
                  startIcon={<EventIcon />}
                >
                  View Calendar
                </Button>
              </Box>
            </Paper>

            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {recentActivity.map((activity) => (
                  <ListItem key={activity.id} divider>
                    <ListItemAvatar>
                      <Avatar>
                        {activity.icon}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText 
                      primary={activity.title} 
                      secondary={
                        <>
                          <Typography variant="body2" component="span">
                            {activity.description}
                          </Typography>
                          <br />
                          <Typography variant="caption" color="text.secondary" component="span">
                            {activity.time}
                          </Typography>
                        </>
                      } 
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 2, mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Recent Inquiries
              </Typography>
              <List>
                {recentInquiries.map((inquiry) => (
                  <ListItem key={inquiry.id} divider>
                    <ListItemText 
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Typography variant="subtitle1">{inquiry.name}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {inquiry.date}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <>
                          <Typography variant="body2" component="p" sx={{ mt: 0.5 }}>
                            {inquiry.message}
                          </Typography>
                          <Typography variant="caption" color="text.secondary" component="p">
                            {inquiry.email} • {inquiry.phone}
                          </Typography>
                        </>
                      } 
                    />
                  </ListItem>
                ))}
              </List>
              <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                <Button 
                  variant="outlined"
                  startIcon={<EmailIcon />}
                >
                  View All Inquiries
                </Button>
              </Box>
            </Paper>

            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Quick Stats
              </Typography>
              <Grid container spacing={2} sx={{ mb: 2 }}>
                <Grid item xs={6}>
                  <Box sx={{ p: 2, bgcolor: '#fff3e0', borderRadius: 1, textAlign: 'center' }}>
                    <Typography variant="h5">{stats.pendingSales}</Typography>
                    <Typography variant="body2">Pending Sales</Typography>
                  </Box>
                </Grid>
                <Grid item xs={6}>
                  <Box sx={{ p: 2, bgcolor: '#e1f5fe', borderRadius: 1, textAlign: 'center' }}>
                    <Typography variant="h5">{stats.upcomingVaccinations}</Typography>
                    <Typography variant="body2">Upcoming Vaccinations</Typography>
                  </Box>
                </Grid>
              </Grid>
              <Divider sx={{ my: 2 }} />
              <Box>
                <Typography variant="subtitle2" gutterBottom>
                  Quick Links
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Button variant="outlined" size="small" onClick={() => navigate('/dogs')}>
                    Manage Dogs
                  </Button>
                  <Button variant="outlined" size="small" onClick={() => navigate('/litters')}>
                    Manage Litters
                  </Button>
                  <Button variant="outlined" size="small" onClick={() => navigate('/financial')}>
                    Financial Dashboard
                  </Button>
                  <Button variant="outlined" size="small" onClick={() => navigate('/website')}>
                    Edit Website
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Dashboard;
