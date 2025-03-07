import React, { useState } from 'react';
import {
  Typography,
  Box,
  Container,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  IconButton
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import SaveIcon from '@mui/icons-material/Save';
import ApiService from '../../services/api.service';

const DocumentGenerator = () => {
  const [open, setOpen] = useState(false);
  const [documentData, setDocumentData] = useState({
    title: '',
    type: 'Contract',
    content: ''
  });

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDocumentData({
      title: '',
      type: 'Contract',
      content: ''
    });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setDocumentData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await ApiService.createDocument(documentData);
      handleClose();
    } catch (error) {
      console.error('Error saving document:', error);
    }
  };

  return (
    <Container>
      <Box sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Document Generator
        </Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={handleOpen}>
          Generate New Document
        </Button>

        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
          <DialogTitle>Generate Document</DialogTitle>
          <DialogContent>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoFocus
                  margin="dense"
                  name="title"
                  label="Document Title"
                  type="text"
                  fullWidth
                  value={documentData.title}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <FormControl fullWidth>
                  <InputLabel>Type</InputLabel>
                  <Select
                    name="type"
                    value={documentData.type}
                    onChange={handleChange}
                  >
                    <MenuItem value="Contract">Contract</MenuItem>
                    <MenuItem value="Health Certificate">Health Certificate</MenuItem>
                    <MenuItem value="Pedigree">Pedigree</MenuItem>
                    <MenuItem value="Vaccination">Vaccination</MenuItem>
                    <MenuItem value="Receipt">Receipt</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  margin="dense"
                  name="content"
                  label="Content"
                  type="text"
                  multiline
                  rows={6}
                  fullWidth
                  value={documentData.content}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="secondary">
              Cancel
            </Button>
            <Button onClick={handleSave} color="primary" startIcon={<SaveIcon />}>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default DocumentGenerator;
