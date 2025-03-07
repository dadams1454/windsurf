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
  TextField,
  InputAdornment,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Chip,
  IconButton,
  Snackbar,
  Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import ArticleIcon from '@mui/icons-material/Article';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import ImageIcon from '@mui/icons-material/Image';
import DocumentGenerator from './DocumentGenerator';
import ApiService from '../../services/api.service';
import DocuSignService from '../../services/docusign.service';

const DocumentsList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [documentType, setDocumentType] = useState('all');
  const [open, setOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const [newDocument, setNewDocument] = useState({
    title: '',
    type: 'contract',
    tags: []
  });
  const [documents, setDocuments] = useState([]);
  const [notification, setNotification] = useState({ open: false, message: '', severity: 'success' });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await ApiService.getDocuments();
      const documentsWithStatus = await Promise.all(response.data.map(async (doc) => {
        const status = await DocuSignService.getEnvelopeStatus(doc.id);
        return { ...doc, signatureStatus: status };
      }));
      setDocuments(documentsWithStatus);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const handleDocumentCreated = () => {
    fetchDocuments();
    setNotification({ open: true, message: 'Document created successfully!', severity: 'success' });
  };

  const handleNotificationClose = () => {
    setNotification({ ...notification, open: false });
  };

  const handleSendForSignature = async (document) => {
    try {
      const recipientEmail = prompt('Enter recipient email');
      const recipientName = prompt('Enter recipient name');
      if (recipientEmail && recipientName) {
        await DocuSignService.sendDocumentForSignature(document.id, recipientEmail, recipientName);
        setNotification({ open: true, message: 'Document sent for signature!', severity: 'success' });
      }
    } catch (error) {
      console.error('Error sending document for signature:', error);
      setNotification({ open: true, message: 'Failed to send document for signature.', severity: 'error' });
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setNewDocument({
      title: '',
      type: 'contract',
      tags: []
    });
  };

  const handleDocumentTypeChange = (event) => {
    setDocumentType(event.target.value);
  };

  const handleNewDocumentChange = (property, value) => {
    setNewDocument({
      ...newDocument,
      [property]: value
    });
  };

  const handleAddDocument = () => {
    const id = documents.length + 1;
    const today = new Date().toISOString().split('T')[0];
    
    const document = {
      id,
      title: newDocument.title,
      type: newDocument.type,
      format: 'pdf', // Default format
      dateCreated: today,
      dateModified: today,
      tags: newDocument.tags,
      shared: false
    };
    
    setDocuments([...documents, document]);
    handleClose();
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'pdf':
        return <PictureAsPdfIcon color="error" />;
      case 'docx':
        return <ArticleIcon color="primary" />;
      case 'png':
      case 'jpg':
        return <ImageIcon color="success" />;
      default:
        return <InsertDriveFileIcon />;
    }
  };

  const getTypeChipColor = (type) => {
    switch (type) {
      case 'contract':
        return 'primary';
      case 'template':
        return 'info';
      case 'image':
        return 'success';
      default:
        return 'default';
    }
  };

  // Filter documents based on search term and document type
  const filteredDocuments = documents.filter(doc => 
    (doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
     doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))) &&
    (documentType === 'all' || doc.type === documentType)
  );

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" component="h1">
            Documents
          </Typography>
          <Button variant="contained" startIcon={<AddIcon />} onClick={handleClickOpen}>
            New Document
          </Button>
        </Box>

        <DocumentGenerator onDocumentCreated={handleDocumentCreated} />

        <Snackbar open={notification.open} autoHideDuration={6000} onClose={handleNotificationClose}>
          <Alert onClose={handleNotificationClose} severity={notification.severity} sx={{ width: '100%' }}>
            {notification.message}
          </Alert>
        </Snackbar>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Document</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Create a new document or upload an existing file to your document library.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="title"
              label="Document Title"
              fullWidth
              variant="outlined"
              value={newDocument.title}
              onChange={(e) => handleNewDocumentChange('title', e.target.value)}
              sx={{ mb: 2, mt: 2 }}
            />
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel id="document-type-label">Document Type</InputLabel>
              <Select
                labelId="document-type-label"
                id="document-type"
                value={newDocument.type}
                onChange={(e) => handleNewDocumentChange('type', e.target.value)}
                label="Document Type"
              >
                <MenuItem value="contract">Contract</MenuItem>
                <MenuItem value="template">Template</MenuItem>
                <MenuItem value="form">Form</MenuItem>
                <MenuItem value="image">Image</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>
            <TextField
              margin="dense"
              id="tags"
              label="Tags (comma separated)"
              fullWidth
              variant="outlined"
              placeholder="e.g. sales, legal, health"
              onChange={(e) => handleNewDocumentChange('tags', e.target.value.split(',').map(tag => tag.trim()))}
            />
            <Button
              variant="outlined"
              component="label"
              startIcon={<UploadFileIcon />}
              sx={{ mt: 3 }}
              fullWidth
            >
              Upload File
              <input
                type="file"
                hidden
              />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button 
              onClick={handleAddDocument}
              disabled={!newDocument.title}
              variant="contained"
            >
              Add Document
            </Button>
          </DialogActions>
        </Dialog>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Total Documents
              </Typography>
              <Typography variant="h4">{documents.length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Contracts
              </Typography>
              <Typography variant="h4">{documents.filter(doc => doc.type === 'contract').length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Templates
              </Typography>
              <Typography variant="h4">{documents.filter(doc => doc.type === 'template').length}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Paper sx={{ p: 2, textAlign: 'center', height: '100%' }}>
              <Typography variant="subtitle2" color="text.secondary">
                Shared Documents
              </Typography>
              <Typography variant="h4">{documents.filter(doc => doc.shared).length}</Typography>
            </Paper>
          </Grid>
        </Grid>

        <Box sx={{ display: 'flex', mb: 2 }}>
          <TextField
            variant="outlined"
            size="small"
            placeholder="Search documents by title or tags"
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
          <FormControl sx={{ minWidth: 200 }}>
            <InputLabel id="document-type-filter-label">Document Type</InputLabel>
            <Select
              labelId="document-type-filter-label"
              id="document-type-filter"
              value={documentType}
              label="Document Type"
              onChange={handleDocumentTypeChange}
              size="small"
            >
              <MenuItem value="all">All Types</MenuItem>
              <MenuItem value="contract">Contracts</MenuItem>
              <MenuItem value="template">Templates</MenuItem>
              <MenuItem value="form">Forms</MenuItem>
              <MenuItem value="image">Images</MenuItem>
              <MenuItem value="other">Other</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="documents table">
            <TableHead>
              <TableRow>
                <TableCell>Document</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Date Modified</TableCell>
                <TableCell>Tags</TableCell>
                <TableCell align="center">Shared</TableCell>
                <TableCell align="center">Signature Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredDocuments.length > 0 ? (
                filteredDocuments.map((document) => (
                  <TableRow key={document.id}>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {getFormatIcon(document.format)}
                        <Typography sx={{ ml: 1 }}>{document.title}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={document.type.charAt(0).toUpperCase() + document.type.slice(1)} 
                        color={getTypeChipColor(document.type)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{document.dateModified}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                        {document.tags.map((tag, index) => (
                          <Chip 
                            key={index} 
                            label={tag} 
                            size="small" 
                            variant="outlined" 
                          />
                        ))}
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      {document.shared ? 'Yes' : 'No'}
                    </TableCell>
                    <TableCell align="center">
                      {document.signatureStatus || 'N/A'}
                    </TableCell>
                    <TableCell align="center">
                      <IconButton color="primary" title="View">
                        <VisibilityIcon />
                      </IconButton>
                      <IconButton color="info" title="Edit">
                        <EditIcon />
                      </IconButton>
                      <IconButton color="success" title="Download">
                        <DownloadIcon />
                      </IconButton>
                      <IconButton color="error" title="Delete">
                        <DeleteIcon />
                      </IconButton>
                      <Button 
                        variant="outlined" 
                        size="small" 
                        onClick={() => handleSendForSignature(document)}
                      >
                        Send for Signature
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <Typography variant="subtitle1" sx={{ py: 2 }}>
                      No documents found matching your search criteria
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Container>
  );
};

export default DocumentsList;
