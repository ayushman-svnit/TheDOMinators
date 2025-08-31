import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  TextField, 
  Button, 
  Grid,
  Divider,
  IconButton,
  CircularProgress,
  Snackbar,
  Alert
} from '@mui/material';
import { Delete, Edit } from '@mui/icons-material';
import axios from 'axios';
import './AdminAnnouncements.css';

const AdminAnnouncements = () => {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    title: '',
    content: ''
  });
  const [currentId, setCurrentId] = useState(null);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  useEffect(() => {
    fetchAnnouncements();
  }, []);

  const fetchAnnouncements = async () => {
    try {
      setLoading(true);
      const response = await axios.get('/api/admin/announcements', {
        withCredentials: true
      });
      setAnnouncements(response.data);
    } catch (err) {
      console.error('Error fetching announcements:', err);
      showSnackbar('Failed to fetch announcements', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentId) {
        // Update existing announcement
        await axios.put(`/api/admin/announcements/${currentId}`, {
          title: formData.title,
          content: formData.content
        }, {
          withCredentials: true
        });
        showSnackbar('Announcement updated successfully', 'success');
      } else {
        // Create new announcement
        await axios.post('/api/admin/announcements', formData, {
          withCredentials: true
        });
        showSnackbar('Announcement created successfully', 'success');
      }
      resetForm();
      fetchAnnouncements();
    } catch (err) {
      console.error('Error saving announcement:', err);
      showSnackbar(
        currentId ? 'Failed to update announcement' : 'Failed to create announcement', 
        'error'
      );
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/admin/announcements/${id}`, {
        withCredentials: true
      });
      showSnackbar('Announcement deleted successfully', 'success');
      fetchAnnouncements();
    } catch (err) {
      console.error('Error deleting announcement:', err);
      showSnackbar('Failed to delete announcement', 'error');
    }
  };

  const handleEdit = (announcement) => {
    setFormData({
      title: announcement.title,
      content: announcement.content
    });
    setCurrentId(announcement._id);
  };

  const resetForm = () => {
    setFormData({ title: '', content: '' });
    setCurrentId(null);
  };

  const showSnackbar = (message, severity) => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Box className="AdminAnnouncements-container">
      <Typography variant="h4" className="AdminAnnouncements-title">
        Announcements Management
      </Typography>

      <Grid container spacing={4} className="AdminAnnouncements-grid">
        {/* Form Section */}
        <Grid item xs={12} md={6}>
          <Card className="AdminAnnouncements-form-card">
            <CardContent>
              <Typography variant="h6" className="AdminAnnouncements-form-title">
                {currentId ? 'Edit Announcement' : 'Create New Announcement'}
              </Typography>
              <form onSubmit={handleSubmit} className="AdminAnnouncements-form">
                <TextField
                  fullWidth
                  label="Title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  margin="normal"
                  required
                  className="AdminAnnouncements-input"
                />
                <TextField
                  fullWidth
                  label="Content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  margin="normal"
                  multiline
                  rows={4}
                  required
                  className="AdminAnnouncements-input"
                />
                <Box className="AdminAnnouncements-form-actions">
                  <Button 
                    type="submit" 
                    variant="contained" 
                    color="primary"
                    className="AdminAnnouncements-submit-btn"
                  >
                    {currentId ? 'Update' : 'Create'}
                  </Button>
                  {currentId && (
                    <Button 
                      variant="outlined" 
                      onClick={resetForm}
                      className="AdminAnnouncements-cancel-btn"
                    >
                      Cancel
                    </Button>
                  )}
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>

        {/* Announcements List Section */}
        <Grid item xs={12} md={6}>
          <Card className="AdminAnnouncements-list-card">
            <CardContent>
              <Typography variant="h6" className="AdminAnnouncements-list-title">
                Existing Announcements
              </Typography>
              {loading ? (
                <Box className="AdminAnnouncements-loading">
                  <CircularProgress />
                </Box>
              ) : announcements.length === 0 ? (
                <Typography className="AdminAnnouncements-empty">
                  No announcements found
                </Typography>
              ) : (
                <Box className="AdminAnnouncements-list">
                  {announcements.map((announcement) => (
                    <Card 
                      key={announcement._id} 
                      className="AdminAnnouncements-announcement-card"
                    >
                      <CardContent>
                        <Box className="AdminAnnouncements-announcement-header">
                          <Typography variant="h6" className="AdminAnnouncements-announcement-title">
                            {announcement.title}
                          </Typography>
                          <Box className="AdminAnnouncements-announcement-actions">
                            <IconButton 
                              onClick={() => handleEdit(announcement)}
                              className="AdminAnnouncements-edit-btn"
                            >
                              <Edit fontSize="small" />
                            </IconButton>
                            <IconButton 
                              onClick={() => handleDelete(announcement._id)}
                              className="AdminAnnouncements-delete-btn"
                            >
                              <Delete fontSize="small" />
                            </IconButton>
                          </Box>
                        </Box>
                        <Typography variant="body2" className="AdminAnnouncements-announcement-date">
                          Created: {formatDate(announcement.createdAt)}
                        </Typography>
                        <Divider className="AdminAnnouncements-divider" />
                        <Typography variant="body1" className="AdminAnnouncements-announcement-content">
                          {announcement.content}
                        </Typography>
                      </CardContent>
                    </Card>
                  ))}
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AdminAnnouncements;