import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormControlLabel,
  Switch,
  CircularProgress,
  Alert,
  IconButton,
  Breadcrumbs,
  Link
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PreviewIcon from '@mui/icons-material/Preview';
import ApiService from '../../services/api.service';

// Rich text editor styles
const EditorContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  minHeight: '400px'
}));

const PageEditor = ({ pageId, onBack, onSave }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState({
    title: '',
    slug: '',
    content: '',
    isPublished: true,
    pageType: 'Standard',
    isInMenu: true,
    menuOrder: 0,
    metaTitle: '',
    metaDescription: '',
    headerImageUrl: ''
  });

  // Fetch page data if editing an existing page
  useEffect(() => {
    if (pageId && !pageId.startsWith('new-page')) {
      fetchPageData();
    }
  }, [pageId]);

  const fetchPageData = async () => {
    try {
      setLoading(true);
      const response = await ApiService.getWebsitePageDetails(pageId);
      
      if (response.data) {
        const pageData = response.data;
        setPage({
          title: pageData.title || '',
          slug: pageData.slug || '',
          content: pageData.content || '',
          isPublished: pageData.isPublished || false,
          pageType: pageData.pageType || 'Standard',
          isInMenu: pageData.isInMenu || false,
          menuOrder: pageData.menuOrder || 0,
          metaTitle: pageData.metaTitle || '',
          metaDescription: pageData.metaDescription || '',
          headerImageUrl: pageData.headerImageUrl || ''
        });
      }
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching page data:', err);
      setError('Failed to load page data. Please try again.');
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPage({
      ...page,
      [name]: value
    });
  };

  const handleSwitchChange = (name) => (e) => {
    setPage({
      ...page,
      [name]: e.target.checked
    });
  };

  const handleTitleChange = (e) => {
    const title = e.target.value;
    setPage({
      ...page,
      title,
      // Auto-generate slug from title if it's a new page
      slug: pageId?.startsWith('new-page') 
        ? title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
        : page.slug
    });
  };

  const handleSavePage = async () => {
    try {
      setLoading(true);
      
      // Create page object for API
      const pageData = {
        ...page,
        id: pageId
      };
      
      // Call save method from parent component
      await onSave(pageData);
      
      setLoading(false);
    } catch (err) {
      console.error('Error saving page:', err);
      setError('Failed to save page. Please try again.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header with breadcrumbs */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <IconButton onClick={onBack} sx={{ mr: 1 }}>
            <ArrowBackIcon />
          </IconButton>
          <Breadcrumbs aria-label="breadcrumb">
            <Link color="inherit" onClick={onBack} sx={{ cursor: 'pointer' }}>
              Website Pages
            </Link>
            <Typography color="text.primary">
              {pageId?.startsWith('new-page') ? 'Create New Page' : 'Edit Page'}
            </Typography>
          </Breadcrumbs>
        </Box>
        <Box>
          <Button 
            variant="outlined" 
            startIcon={<PreviewIcon />} 
            sx={{ mr: 1 }}
            onClick={() => window.open(`/preview/page/${page.slug}`, '_blank')}
          >
            Preview Page
          </Button>
          <Button 
            variant="contained" 
            startIcon={<SaveIcon />}
            onClick={handleSavePage}
            disabled={!page.title || !page.slug}
          >
            Save Page
          </Button>
        </Box>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Main content area */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <TextField 
              fullWidth
              label="Page Title"
              name="title"
              value={page.title}
              onChange={handleTitleChange}
              variant="outlined"
              sx={{ mb: 2 }}
              required
            />
            
            <TextField 
              fullWidth
              label="Page URL Slug"
              name="slug"
              value={page.slug}
              onChange={handleInputChange}
              variant="outlined"
              sx={{ mb: 2 }}
              helperText="This will be used in the URL, e.g., yourwebsite.com/page-slug"
              required
            />
            
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Page Content
            </Typography>
            
            <EditorContainer>
              <TextField
                fullWidth
                name="content"
                value={page.content}
                onChange={handleInputChange}
                multiline
                rows={15}
                variant="outlined"
                placeholder="Enter your page content here... (supports HTML formatting)"
              />
            </EditorContainer>
          </Paper>
          
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              SEO Settings
            </Typography>
            <TextField 
              fullWidth
              label="Meta Title"
              name="metaTitle"
              value={page.metaTitle}
              onChange={handleInputChange}
              variant="outlined"
              sx={{ mb: 2 }}
              helperText="Title shown in search results and browser tabs"
            />
            <TextField 
              fullWidth
              label="Meta Description"
              name="metaDescription"
              value={page.metaDescription}
              onChange={handleInputChange}
              variant="outlined"
              multiline
              rows={3}
              sx={{ mb: 2 }}
              helperText="Brief description shown in search results"
            />
          </Paper>
        </Grid>
        
        {/* Sidebar settings */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Page Settings
            </Typography>
            
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="page-type-label">Page Type</InputLabel>
              <Select
                labelId="page-type-label"
                name="pageType"
                value={page.pageType}
                onChange={handleInputChange}
                label="Page Type"
              >
                <MenuItem value="Standard">Standard</MenuItem>
                <MenuItem value="Blog">Blog</MenuItem>
                <MenuItem value="Gallery">Gallery</MenuItem>
                <MenuItem value="Contact">Contact</MenuItem>
                <MenuItem value="Special">Special</MenuItem>
              </Select>
            </FormControl>
            
            <TextField 
              fullWidth
              label="Header Image URL"
              name="headerImageUrl"
              value={page.headerImageUrl}
              onChange={handleInputChange}
              variant="outlined"
              sx={{ mb: 2 }}
              helperText="URL for the page banner image"
            />
            
            <FormControlLabel
              control={
                <Switch 
                  checked={page.isPublished} 
                  onChange={handleSwitchChange('isPublished')}
                  color="primary"
                />
              }
              label="Published"
              sx={{ display: 'block', mb: 1 }}
            />
            
            <FormControlLabel
              control={
                <Switch 
                  checked={page.isInMenu} 
                  onChange={handleSwitchChange('isInMenu')}
                  color="primary"
                />
              }
              label="Show in Navigation Menu"
              sx={{ display: 'block', mb: 1 }}
            />
            
            {page.isInMenu && (
              <TextField 
                fullWidth
                label="Menu Order"
                name="menuOrder"
                value={page.menuOrder}
                onChange={handleInputChange}
                variant="outlined"
                type="number"
                InputProps={{ inputProps: { min: 0, step: 1 } }}
                sx={{ mt: 2 }}
                helperText="Order in the navigation menu (lower numbers appear first)"
              />
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PageEditor;
