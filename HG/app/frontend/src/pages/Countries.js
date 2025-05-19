import React, { useState, useEffect } from 'react';
import {
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Typography, Paper
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DataTable from '../components/DataTable';
import { countryAPI } from '../api/api';

const Countries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [formData, setFormData] = useState({ country_name: '' });

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'country_name', headerName: 'Country Name', width: 200 },
  ];

  const fetchCountries = async () => {
    try {
      setLoading(true);
      const data = await countryAPI.getAllCountries();
      setCountries(data.map((c, idx) => ({ ...c, id: c.id || idx })));
    } catch (error) {
      console.error('Error fetching countries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchCountries(); }, []);

  const handleOpenDialog = (country = null) => {
    setSelectedCountry(country);
    setFormData(country ? { country_name: country.country_name } : { country_name: '' });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCountry(null);
    setFormData({ country_name: '' });
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      if (selectedCountry) {
        await countryAPI.updateCountry(selectedCountry.id, formData);
      } else {
        await countryAPI.createCountry(formData);
      }
      handleCloseDialog();
      fetchCountries();
    } catch (error) {
      console.error('Error saving country:', error);
    }
  };

  const handleDelete = async (country) => {
    if (window.confirm('Are you sure you want to delete this country?')) {
      try {
        await countryAPI.deleteCountry(country.id);
        fetchCountries();
      } catch (error) {
        console.error('Error deleting country:', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">Countries</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>Add Country</Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <DataTable
          rows={countries}
          columns={columns}
          onEdit={handleOpenDialog}
          onDelete={handleDelete}
          loading={loading}
          getRowId={(row) => row.id}
        />
      </Paper>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedCountry ? 'Edit Country' : 'Add New Country'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField name="country_name" label="Country Name" value={formData.country_name} onChange={handleInputChange} fullWidth />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">{selectedCountry ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Countries;