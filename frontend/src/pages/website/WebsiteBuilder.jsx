import React, { useState } from 'react';
import {
  Typography,
  Box,
  Container,
  Paper,
  Grid,
  Tabs,
  Tab,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton
} from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SaveIcon from '@mui/icons-material/Save';
import LanguageIcon from '@mui/icons-material/Language';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import SettingsIcon from '@mui/icons-material/Settings';
import ImageIcon from '@mui/icons-material/Image';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';

// Mock preview component - in a real implementation, this would render an iframe or similar
const WebsitePreview = styled(Paper)(({ theme }) => ({
  width: '100%',
  height: 500,
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#f5f5f5',
  overflow: 'hidden',
  border: '1px solid #ddd'
}));

const WebsitePreviewHeader = styled(Box)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor || theme.palette.primary.main,
  padding: theme.spacing(2),
  color: '#fff'
}));

const WebsitePreviewContent = styled(Box)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor || '#fff',
  flexGrow: 1,
  padding: theme.spacing(2),
  overflowY: 'auto'
}));

const ColorBox = styled(Box)(({ theme, color }) => ({
  width: 30,
  height: 30,
  borderRadius: 4,
  backgroundColor: color,
  border: '1px solid #ddd',
  cursor: 'pointer',
  '&:hover': {
    opacity: 0.8,
  }
}));

const WebsiteBuilder = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [theme, setTheme] = useState({
    primaryColor: '#3f51b5',
    secondaryColor: '#f50057',
    backgroundColor: '#ffffff',
    fontColor: '#000000',
    fontFamily: 'Roboto'
  });
  
  const [siteSettings, setSiteSettings] = useState({
    siteName: 'Golden Paws Kennel',
    tagline: 'Quality Golden Retrievers for Loving Homes',
    logo: null,
    favicon: null,
    showBreedInfo: true,
    showTestimonials: true,
    showAvailablePuppies: true,
    showUpcomingLitters: true,
    showContactForm: true,
    showAboutUs: true,
  });
  
  const [pages, setPages] = useState([
    { id: 'home', title: 'Home', isDefault: true, published: true },
    { id: 'about', title: 'About Us', isDefault: false, published: true },
    { id: 'puppies', title: 'Available Puppies', isDefault: false, published: true },
    { id: 'gallery', title: 'Photo Gallery', isDefault: false, published: true },
    { id: 'contact', title: 'Contact Us', isDefault: false, published: true }
  ]);
  
  const [templates, setTemplates] = useState([
    { id: 'modern', title: 'Modern Breeder', thumbnail: 'https://via.placeholder.com/150x100?text=Modern' },
    { id: 'classic', title: 'Classic Kennel', thumbnail: 'https://via.placeholder.com/150x100?text=Classic' },
    { id: 'elegant', title: 'Elegant Breeder', thumbnail: 'https://via.placeholder.com/150x100?text=Elegant' },
    { id: 'minimal', title: 'Minimalist Design', thumbnail: 'https://via.placeholder.com/150x100?text=Minimal' }
  ]);
  
  const [selectedTemplate, setSelectedTemplate] = useState('modern');

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleThemeChange = (property, value) => {
    setTheme({
      ...theme,
      [property]: value
    });
  };

  const handleSettingsChange = (property, value) => {
    setSiteSettings({
      ...siteSettings,
      [property]: value
    });
  };

  const handleAddPage = () => {
    const newPage = {
      id: `page-${pages.length + 1}`,
      title: `New Page ${pages.length + 1}`,
      isDefault: false,
      published: false
    };
    setPages([...pages, newPage]);
  };

  const handleTemplateSelect = (templateId) => {
    setSelectedTemplate(templateId);
  };

  const handlePublishWebsite = () => {
    alert('Website published successfully!');
    // In a real app, this would call an API to publish the website
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Website Builder
          </Typography>
          <Box>
            <Button 
              variant="outlined" 
              startIcon={<VisibilityIcon />}
              sx={{ mr: 1 }}
              onClick={() => window.open('/preview', '_blank')}
            >
              Preview
            </Button>
            <Button 
              variant="contained" 
              color="success"
              startIcon={<LanguageIcon />}
              onClick={handlePublishWebsite}
            >
              Publish Website
            </Button>
          </Box>
        </Box>

        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <Paper sx={{ mb: 3 }}>
              <Tabs value={activeTab} onChange={handleTabChange} variant="fullWidth">
                <Tab label="Template" icon={<FormatPaintIcon />} iconPosition="start" />
                <Tab label="Design" icon={<ColorLensIcon />} iconPosition="start" />
                <Tab label="Pages" icon={<ImageIcon />} iconPosition="start" />
                <Tab label="Settings" icon={<SettingsIcon />} iconPosition="start" />
              </Tabs>
              <Box sx={{ p: 3 }}>
                {/* Template Selection Tab */}
                {activeTab === 0 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>Choose a Template</Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      Select a template as the starting point for your breeder website. You can customize colors, fonts, and content later.
                    </Typography>
                    <Grid container spacing={2} sx={{ mt: 2 }}>
                      {templates.map((template) => (
                        <Grid item xs={12} sm={6} md={3} key={template.id}>
                          <Card 
                            sx={{ 
                              border: selectedTemplate === template.id ? '2px solid #3f51b5' : '1px solid #ddd',
                              cursor: 'pointer'
                            }}
                            onClick={() => handleTemplateSelect(template.id)}
                          >
                            <CardMedia
                              component="img"
                              height="140"
                              image={template.thumbnail}
                              alt={template.title}
                            />
                            <CardContent>
                              <Typography variant="subtitle1">{template.title}</Typography>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button 
                        variant="contained" 
                        startIcon={<SaveIcon />}
                      >
                        Apply Template
                      </Button>
                    </Box>
                  </Box>
                )}

                {/* Design Tab */}
                {activeTab === 1 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>Customize Design</Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" gutterBottom>Colors</Typography>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" gutterBottom>Primary Color</Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            {['#3f51b5', '#f50057', '#2196f3', '#4caf50', '#ff9800', '#795548'].map((color) => (
                              <ColorBox 
                                key={color} 
                                color={color} 
                                onClick={() => handleThemeChange('primaryColor', color)}
                                sx={{ outline: theme.primaryColor === color ? '2px solid black' : 'none' }}
                              />
                            ))}
                          </Box>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" gutterBottom>Secondary Color</Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            {['#f50057', '#3f51b5', '#ff9800', '#4caf50', '#2196f3', '#795548'].map((color) => (
                              <ColorBox 
                                key={color} 
                                color={color} 
                                onClick={() => handleThemeChange('secondaryColor', color)}
                                sx={{ outline: theme.secondaryColor === color ? '2px solid black' : 'none' }}
                              />
                            ))}
                          </Box>
                        </Box>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" gutterBottom>Background Color</Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            {['#ffffff', '#f5f5f5', '#eeeeee', '#e0f7fa', '#fff8e1', '#f3e5f5'].map((color) => (
                              <ColorBox 
                                key={color} 
                                color={color} 
                                onClick={() => handleThemeChange('backgroundColor', color)}
                                sx={{ outline: theme.backgroundColor === color ? '2px solid black' : 'none' }}
                              />
                            ))}
                          </Box>
                        </Box>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" gutterBottom>Typography</Typography>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                          <InputLabel id="font-family-select-label">Font Family</InputLabel>
                          <Select
                            labelId="font-family-select-label"
                            id="font-family-select"
                            value={theme.fontFamily}
                            label="Font Family"
                            onChange={(e) => handleThemeChange('fontFamily', e.target.value)}
                          >
                            <MenuItem value="Roboto">Roboto</MenuItem>
                            <MenuItem value="Open Sans">Open Sans</MenuItem>
                            <MenuItem value="Lato">Lato</MenuItem>
                            <MenuItem value="Montserrat">Montserrat</MenuItem>
                            <MenuItem value="Playfair Display">Playfair Display</MenuItem>
                          </Select>
                        </FormControl>
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" gutterBottom>Text Color</Typography>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            {['#000000', '#212121', '#424242', '#616161', '#757575', '#2e7d32'].map((color) => (
                              <ColorBox 
                                key={color} 
                                color={color} 
                                onClick={() => handleThemeChange('fontColor', color)}
                                sx={{ outline: theme.fontColor === color ? '2px solid black' : 'none' }}
                              />
                            ))}
                          </Box>
                        </Box>
                      </Grid>
                    </Grid>
                    <Divider sx={{ my: 3 }} />
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button 
                        variant="contained" 
                        startIcon={<SaveIcon />}
                      >
                        Save Design
                      </Button>
                    </Box>
                  </Box>
                )}

                {/* Pages Tab */}
                {activeTab === 2 && (
                  <Box>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Typography variant="h6">Manage Pages</Typography>
                      <Button 
                        variant="contained" 
                        startIcon={<AddIcon />}
                        onClick={handleAddPage}
                      >
                        Add Page
                      </Button>
                    </Box>
                    <List>
                      {pages.map((page) => (
                        <ListItem key={page.id}>
                          <ListItemText 
                            primary={page.title} 
                            secondary={page.isDefault ? 'Homepage' : (page.published ? 'Published' : 'Draft')} 
                          />
                          <ListItemSecondaryAction>
                            <IconButton edge="end" aria-label="edit">
                              <EditIcon />
                            </IconButton>
                            <IconButton edge="end" aria-label="delete" sx={{ ml: 1 }}>
                              <DeleteIcon />
                            </IconButton>
                          </ListItemSecondaryAction>
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}

                {/* Settings Tab */}
                {activeTab === 3 && (
                  <Box>
                    <Typography variant="h6" gutterBottom>Site Settings</Typography>
                    <Grid container spacing={3}>
                      <Grid item xs={12} sm={6}>
                        <TextField
                          fullWidth
                          label="Site Name"
                          value={siteSettings.siteName}
                          onChange={(e) => handleSettingsChange('siteName', e.target.value)}
                          margin="normal"
                        />
                        <TextField
                          fullWidth
                          label="Tagline"
                          value={siteSettings.tagline}
                          onChange={(e) => handleSettingsChange('tagline', e.target.value)}
                          margin="normal"
                        />
                        <Button
                          variant="outlined"
                          component="label"
                          startIcon={<ImageIcon />}
                          sx={{ mt: 2, mr: 2 }}
                        >
                          Upload Logo
                          <input
                            type="file"
                            hidden
                            onChange={(e) => handleSettingsChange('logo', e.target.files[0])}
                          />
                        </Button>
                        <Button
                          variant="outlined"
                          component="label"
                          startIcon={<ImageIcon />}
                          sx={{ mt: 2 }}
                        >
                          Upload Favicon
                          <input
                            type="file"
                            hidden
                            onChange={(e) => handleSettingsChange('favicon', e.target.files[0])}
                          />
                        </Button>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="subtitle1" gutterBottom>Content Settings</Typography>
                        <FormControlLabel
                          control={
                            <Switch
                              checked={siteSettings.showBreedInfo}
                              onChange={(e) => handleSettingsChange('showBreedInfo', e.target.checked)}
                            />
                          }
                          label="Show Breed Information"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={siteSettings.showTestimonials}
                              onChange={(e) => handleSettingsChange('showTestimonials', e.target.checked)}
                            />
                          }
                          label="Show Testimonials"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={siteSettings.showAvailablePuppies}
                              onChange={(e) => handleSettingsChange('showAvailablePuppies', e.target.checked)}
                            />
                          }
                          label="Show Available Puppies"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={siteSettings.showUpcomingLitters}
                              onChange={(e) => handleSettingsChange('showUpcomingLitters', e.target.checked)}
                            />
                          }
                          label="Show Upcoming Litters"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={siteSettings.showContactForm}
                              onChange={(e) => handleSettingsChange('showContactForm', e.target.checked)}
                            />
                          }
                          label="Show Contact Form"
                        />
                        <FormControlLabel
                          control={
                            <Switch
                              checked={siteSettings.showAboutUs}
                              onChange={(e) => handleSettingsChange('showAboutUs', e.target.checked)}
                            />
                          }
                          label="Show About Us"
                        />
                      </Grid>
                    </Grid>
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                      <Button 
                        variant="contained" 
                        startIcon={<SaveIcon />}
                      >
                        Save Settings
                      </Button>
                    </Box>
                  </Box>
                )}
              </Box>
            </Paper>
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom>Live Preview</Typography>
            <WebsitePreview>
              <WebsitePreviewHeader bgcolor={theme.primaryColor}>
                <Typography variant="subtitle1">{siteSettings.siteName}</Typography>
                <Typography variant="caption">{siteSettings.tagline}</Typography>
              </WebsitePreviewHeader>
              <WebsitePreviewContent bgcolor={theme.backgroundColor}>
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: theme.fontColor,
                    fontFamily: theme.fontFamily 
                  }}
                >
                  Website content preview will appear here as you make changes to your design.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography 
                    variant="h5" 
                    sx={{ 
                      color: theme.fontColor,
                      fontFamily: theme.fontFamily 
                    }}
                  >
                    About Our Kennel
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: theme.fontColor,
                      fontFamily: theme.fontFamily 
                    }}
                  >
                    Welcome to {siteSettings.siteName}, where we raise top quality puppies in a loving home environment. Our dogs are health-tested and well-socialized.
                  </Typography>
                </Box>
                {siteSettings.showAvailablePuppies && (
                  <Box sx={{ mt: 2 }}>
                    <Typography 
                      variant="h5" 
                      sx={{ 
                        color: theme.fontColor,
                        fontFamily: theme.fontFamily 
                      }}
                    >
                      Available Puppies
                    </Typography>
                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: theme.fontColor,
                        fontFamily: theme.fontFamily 
                      }}
                    >
                      We currently have puppies available for loving homes.
                    </Typography>
                  </Box>
                )}
              </WebsitePreviewContent>
            </WebsitePreview>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default WebsiteBuilder;
