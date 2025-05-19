import React, { useState, useEffect } from 'react';
import {
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Typography, Paper
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DataTable from '../components/DataTable';
import { configureTaxAPI } from '../api/api';

const ConfigureTaxes = () => {
  const [taxes, setTaxes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedTax, setSelectedTax] = useState(null);
  const [formData, setFormData] = useState({
    category_id: '',
    invoice_id: '',
    select_tax_type: '',
    gst_type: ''
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'category_id', headerName: 'Category ID', width: 120 },
    { field: 'invoice_id', headerName: 'Invoice ID', width: 120 },
    { field: 'select_tax_type', headerName: 'Tax Type', width: 150 },
    { field: 'gst_type', headerName: 'GST Type', width: 120 },
  ];

  const fetchTaxes = async () => {
    try {
      setLoading(true);
      const data = await configureTaxAPI.getAllConfigureTax();
      setTaxes(data.map((t, idx) => ({ ...t, id: t.id || idx })));
    } catch (error) {
      console.error('Error fetching taxes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchTaxes(); }, []);

  const handleOpenDialog = (tax = null) => {
    setSelectedTax(tax);
    setFormData(tax ? {
      category_id: tax.category_id,
      invoice_id: tax.invoice_id,
      select_tax_type: tax.select_tax_type,
      gst_type: tax.gst_type
    } : {
      category_id: '',
      invoice_id: '',
      select_tax_type: '',
      gst_type: ''
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedTax(null);
    setFormData({
      category_id: '',
      invoice_id: '',
      select_tax_type: '',
      gst_type: ''
    });
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      if (selectedTax) {
        await configureTaxAPI.updateConfigureTax(selectedTax.id, formData);
      } else {
        await configureTaxAPI.createConfigureTax(formData);
      }
      handleCloseDialog();
      fetchTaxes();
    } catch (error) {
      console.error('Error saving tax:', error);
    }
  };

  const handleDelete = async (tax) => {
    if (window.confirm('Are you sure you want to delete this tax?')) {
      try {
        await configureTaxAPI.deleteConfigureTax(tax.id);
        fetchTaxes();
      } catch (error) {
        console.error('Error deleting tax:', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">Configure Taxes</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>Add Tax</Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <DataTable
          rows={taxes}
          columns={columns}
          onEdit={handleOpenDialog}
          onDelete={handleDelete}
          loading={loading}
          getRowId={(row) => row.id}
        />
      </Paper>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedTax ? 'Edit Tax' : 'Add New Tax'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField name="category_id" label="Category ID" value={formData.category_id} onChange={handleInputChange} fullWidth />
            <TextField name="invoice_id" label="Invoice ID" value={formData.invoice_id} onChange={handleInputChange} fullWidth />
            <TextField name="select_tax_type" label="Tax Type" value={formData.select_tax_type} onChange={handleInputChange} fullWidth />
            <TextField name="gst_type" label="GST Type" value={formData.gst_type} onChange={handleInputChange} fullWidth />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">{selectedTax ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default ConfigureTaxes;