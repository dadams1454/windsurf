import React, { useState, useEffect } from 'react';
import {
  Typography,
  Box,
  Container,
  Paper,
  Grid,
  Button,
  TextField,
  Chip,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tab,
  Tabs,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemAvatar,
  Avatar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import ShareIcon from '@mui/icons-material/Share';
import HistoryIcon from '@mui/icons-material/History';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ArticleIcon from '@mui/icons-material/Article';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
import SaveIcon from '@mui/icons-material/Save';
import LinkIcon from '@mui/icons-material/Link';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const DocumentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const [document, setDocument] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [shareData, setShareData] = useState({
    type: 'email',
    recipient: '',
    message: '',
    expirationDays: 7
  });

  // Mock data fetch
  useEffect(() => {
    // In a real implementation, this would be an API call
    setTimeout(() => {
      setDocument({
        id: parseInt(id),
        title: 'Puppy Purchase Agreement',
        description: 'Standard contract for puppy sales, including health guarantee and terms of sale.',
        type: 'contract',
        format: 'pdf',
        dateCreated: '2025-01-15',
        dateModified: '2025-02-20',
        createdBy: 'John Doe',
        fileSize: '256 KB',
        tags: ['sales', 'legal', 'contract'],
        shared: false,
        content: 'This agreement made and entered into on [DATE] between [BREEDER NAME], hereinafter known as "Seller" and [BUYER NAME], hereinafter known as "Buyer"...',
        versions: [
          { number: '1.0', date: '2025-01-15', modifiedBy: 'John Doe', note: 'Initial document creation' },
          { number: '1.1', date: '2025-02-10', modifiedBy: 'Jane Smith', note: 'Updated health guarantee section' },
          { number: '1.2', date: '2025-02-20', modifiedBy: 'John Doe', note: 'Added microchip registration details' }
        ],
        usageHistory: [
          { id: 1, date: '2025-02-25', action: 'Used in sale', reference: 'Sale #1023 - Golden Retriever Puppy', user: 'John Doe' },
          { id: 2, date: '2025-03-01', action: 'Emailed to client', reference: 'David Wilson', user: 'Jane Smith' }
        ],
        variables: [
          { name: 'BUYER_NAME', description: 'Full name of the buyer' },
          { name: 'BUYER_ADDRESS', description: 'Complete address of the buyer' },
          { name: 'PUPPY_BREED', description: 'Breed of the puppy' },
          { name: 'PUPPY_DOB', description: 'Date of birth of the puppy' },
          { name: 'PUPPY_PRICE', description: 'Purchase price of the puppy' },
          { name: 'SALE_DATE', description: 'Date of the sale transaction' }
        ]
      });
      setLoading(false);
    }, 800);
  }, [id]);

  const handleTabChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleEditToggle = () => {
    setEditMode(!editMode);
  };

  const handleSaveDocument = () => {
    setEditMode(false);
    // In a real app, this would save the document data to an API
    alert('Document saved successfully!');
  };

  const handleShareDialogOpen = () => {
    setShareDialogOpen(true);
  };

  const handleShareDialogClose = () => {
    setShareDialogOpen(false);
  };

  const handleShareTypeChange = (event) => {
    setShareData({
      ...shareData,
      type: event.target.value
    });
  };

  const handleShareDataChange = (property, value) => {
    setShareData({
      ...shareData,
      [property]: value
    });
  };

  const handleShareDocument = () => {
    // In a real app, this would share the document via the chosen method
    setShareDialogOpen(false);
    setDocument({
      ...document,
      shared: true
    });
    alert(`Document shared via ${shareData.type}!`);
  };

  const getDocumentIcon = () => {
    if (document.format === 'pdf') {
      return <PictureAsPdfIcon sx={{ fontSize: 80 }} color="error" />;
    } else if (document.format === 'docx') {
      return <ArticleIcon sx={{ fontSize: 80 }} color="primary" />;
    } else {
      return <ArticleIcon sx={{ fontSize: 80 }} color="action" />;
    }
  };

  if (loading) {
    return (
      <Container>
        <Box sx={{ mt: 4 }}>
          <Typography>Loading document details...</Typography>
        </Box>
      </Container>
    );
  }

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Button 
          startIcon={<ArrowBackIcon />} 
          onClick={() => navigate('/documents')}
          sx={{ mb: 2 }}
        >
          Back to Documents
        </Button>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            {document.title}
          </Typography>
          <Box>
            <Button 
              variant="outlined" 
              startIcon={<DownloadIcon />} 
              sx={{ mr: 1 }}
            >
              Download
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<ShareIcon />}
              sx={{ mr: 1 }}
              onClick={handleShareDialogOpen}
            >
              Share
            </Button>
            {editMode ? (
              <Button 
                variant="contained" 
                color="success"
                startIcon={<SaveIcon />}
                onClick={handleSaveDocument}
              >
                Save Changes
              </Button>
            ) : (
              <Button 
                variant="contained" 
                startIcon={<EditIcon />}
                onClick={handleEditToggle}
              >
                Edit Document
              </Button>
            )}
          </Box>
        </Box>

        {/* Share Dialog */}
        <Dialog open={shareDialogOpen} onClose={handleShareDialogClose}>
          <DialogTitle>Share Document</DialogTitle>
          <DialogContent>
            <FormControl fullWidth sx={{ mt: 2, mb: 2 }}>
              <InputLabel id="share-type-label">Share Method</InputLabel>
              <Select
                labelId="share-type-label"
                id="share-type"
                value={shareData.type}
                label="Share Method"
                onChange={handleShareTypeChange}
              >
                <MenuItem value="email">Email</MenuItem>
                <MenuItem value="link">Generate Link</MenuItem>
                <MenuItem value="user">Share with User</MenuItem>
              </Select>
            </FormControl>

            {shareData.type === 'email' && (
              <>
                <TextField
                  autoFocus
                  margin="dense"
                  id="recipient"
                  label="Recipient Email"
                  type="email"
                  fullWidth
                  variant="outlined"
                  value={shareData.recipient}
                  onChange={(e) => handleShareDataChange('recipient', e.target.value)}
                  sx={{ mb: 2 }}
                />
                <TextField
                  margin="dense"
                  id="message"
                  label="Message (Optional)"
                  type="text"
                  fullWidth
                  multiline
                  rows={3}
                  variant="outlined"
                  value={shareData.message}
                  onChange={(e) => handleShareDataChange('message', e.target.value)}
                />
              </>
            )}

            {shareData.type === 'link' && (
              <>
                <TextField
                  margin="dense"
                  id="generated-link"
                  label="Shareable Link"
                  type="text"
                  fullWidth
                  variant="outlined"
                  value="https://example.com/d/share?id=abc123"
                  InputProps={{
                    readOnly: true,
                    endAdornment: (
                      <IconButton edge="end" title="Copy to clipboard">
                        <ContentCopyIcon />
                      </IconButton>
                    ),
                  }}
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id="expiration-label">Link Expiration</InputLabel>
                  <Select
                    labelId="expiration-label"
                    id="expiration"
                    value={shareData.expirationDays}
                    label="Link Expiration"
                    onChange={(e) => handleShareDataChange('expirationDays', e.target.value)}
                  >
                    <MenuItem value={1}>1 Day</MenuItem>
                    <MenuItem value={7}>7 Days</MenuItem>
                    <MenuItem value={30}>30 Days</MenuItem>
                    <MenuItem value={0}>Never</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}

            {shareData.type === 'user' && (
              <TextField
                autoFocus
                margin="dense"
                id="user"
                label="Username or Email"
                type="text"
                fullWidth
                variant="outlined"
                value={shareData.recipient}
                onChange={(e) => handleShareDataChange('recipient', e.target.value)}
                sx={{ mb: 2 }}
              />
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleShareDialogClose}>Cancel</Button>
            <Button onClick={handleShareDocument} variant="contained">Share</Button>
          </DialogActions>
        </Dialog>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, mb: 3 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mb: 2 }}>
                {getDocumentIcon()}
                <Typography variant="subtitle1" sx={{ mt: 1 }}>
                  {document.format.toUpperCase()} Document
                </Typography>
              </Box>
              <Divider sx={{ mb: 2 }} />
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Document Type
                </Typography>
                <Typography variant="body1">
                  {document.type.charAt(0).toUpperCase() + document.type.slice(1)}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Created By
                </Typography>
                <Typography variant="body1">
                  {document.createdBy}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Date Created
                </Typography>
                <Typography variant="body1">
                  {document.dateCreated}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Last Modified
                </Typography>
                <Typography variant="body1">
                  {document.dateModified}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  File Size
                </Typography>
                <Typography variant="body1">
                  {document.fileSize}
                </Typography>
              </Box>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Tags
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 1 }}>
                  {document.tags.map((tag, index) => (
                    <Chip key={index} label={tag} size="small" />
                  ))}
                  {editMode && (
                    <Chip 
                      icon={<AddIcon />} 
                      label="Add" 
                      size="small" 
                      variant="outlined" 
                      onClick={() => {}}
                    />
                  )}
                </Box>
              </Box>
              {editMode && (
                <Button
                  variant="outlined"
                  component="label"
                  startIcon={<CloudUploadIcon />}
                  fullWidth
                  sx={{ mt: 2 }}
                >
                  Upload New Version
                  <input
                    type="file"
                    hidden
                  />
                </Button>
              )}
            </Paper>
          </Grid>

          <Grid item xs={12} md={8}>
            <Paper sx={{ mb: 3 }}>
              <Tabs value={value} onChange={handleTabChange} variant="fullWidth">
                <Tab label="Preview" />
                <Tab label="Version History" />
                <Tab label="Usage" />
                <Tab label="Variables" />
              </Tabs>
              <Divider />

              {/* Preview Tab */}
              {value === 0 && (
                <Box sx={{ p: 3 }}>
                  {editMode ? (
                    <TextField
                      fullWidth
                      multiline
                      rows={15}
                      variant="outlined"
                      value={document.content}
                      onChange={(e) => setDocument({ ...document, content: e.target.value })}
                    />
                  ) : (
                    <Paper 
                      variant="outlined" 
                      sx={{ 
                        p: 3, 
                        minHeight: '400px',
                        whiteSpace: 'pre-wrap',
                        fontFamily: 'monospace',
                        fontSize: '0.9rem',
                        backgroundColor: '#f9f9f9'
                      }}
                    >
                      {document.content}
                    </Paper>
                  )}
                  {editMode && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Document Description
                      </Typography>
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        variant="outlined"
                        value={document.description}
                        onChange={(e) => setDocument({ ...document, description: e.target.value })}
                      />
                    </Box>
                  )}
                  {!editMode && (
                    <Box sx={{ mt: 2 }}>
                      <Typography variant="subtitle2" gutterBottom>
                        Description
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {document.description}
                      </Typography>
                    </Box>
                  )}
                </Box>
              )}

              {/* Version History Tab */}
              {value === 1 && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Version History
                  </Typography>
                  <List>
                    {document.versions.map((version, index) => (
                      <ListItem key={index} divider={index < document.versions.length - 1}>
                        <ListItemIcon>
                          <HistoryIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary={`Version ${version.number} - ${version.date}`}
                          secondary={
                            <>
                              <Typography variant="body2" component="span">
                                {version.note}
                              </Typography>
                              <br />
                              <Typography variant="caption" component="span">
                                Modified by {version.modifiedBy}
                              </Typography>
                            </>
                          }
                        />
                        <Button size="small" startIcon={<DownloadIcon />} variant="outlined">
                          Download
                        </Button>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {/* Usage Tab */}
              {value === 2 && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Usage History
                  </Typography>
                  <List>
                    {document.usageHistory.map((usage) => (
                      <ListItem key={usage.id} divider>
                        <ListItemAvatar>
                          <Avatar>
                            {usage.action === 'Used in sale' ? '$' : <EmailIcon />}
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary={usage.action}
                          secondary={
                            <>
                              <Typography variant="body2" component="span">
                                {usage.reference}
                              </Typography>
                              <br />
                              <Typography variant="caption" component="span">
                                {usage.date} by {usage.user}
                              </Typography>
                            </>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}

              {/* Variables Tab */}
              {value === 3 && (
                <Box sx={{ p: 3 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    Template Variables
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    These variables can be used in the document text and will be replaced with actual values when the document is generated.
                  </Typography>
                  <List>
                    {document.variables.map((variable, index) => (
                      <ListItem key={index} divider={index < document.variables.length - 1}>
                        <ListItemText
                          primary={`{{${variable.name}}}`}
                          secondary={variable.description}
                        />
                        {editMode && (
                          <IconButton edge="end" aria-label="delete">
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </ListItem>
                    ))}
                    {editMode && (
                      <Button
                        startIcon={<AddIcon />}
                        sx={{ mt: 2 }}
                      >
                        Add Variable
                      </Button>
                    )}
                  </List>
                </Box>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default DocumentDetails;
