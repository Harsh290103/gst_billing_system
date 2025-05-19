import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Typography,
  Paper,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DataTable from '../components/DataTable';
import { customerAPI } from '../api/api';

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [formData, setFormData] = useState({
    company_name: '',
    client_industry: '',
    country_id: '',
    company_id: '',
    category_id: '',
    business_gstno: '',
    business_pan: '',
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'company_name', headerName: 'Company Name', width: 180 },
    { field: 'client_industry', headerName: 'Industry', width: 150 },
    { field: 'country_id', headerName: 'Country ID', width: 110 },
    { field: 'company_id', headerName: 'Company ID', width: 110 },
    { field: 'category_id', headerName: 'Category ID', width: 110 },
    { field: 'business_gstno', headerName: 'GST No', width: 140 },
    { field: 'business_pan', headerName: 'PAN', width: 140 },
  ];

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      const data = await customerAPI.getAllCustomers();
      setCustomers(data);
    } catch (error) {
      console.error('Error fetching customers:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const handleOpenDialog = (customer = null) => {
    if (customer) {
      setSelectedCustomer(customer);
      setFormData({
        company_name: customer.company_name,
        client_industry: customer.client_industry,
        country_id: customer.country_id,
        company_id: customer.company_id,
        category_id: customer.category_id,
        business_gstno: customer.business_gstno,
        business_pan: customer.business_pan,
      });
    } else {
      setSelectedCustomer(null);
      setFormData({
        company_name: '',
        client_industry: '',
        country_id: '',
        company_id: '',
        category_id: '',
        business_gstno: '',
        business_pan: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCustomer(null);
    setFormData({
      company_name: '',
      client_industry: '',
      country_id: '',
      company_id: '',
      category_id: '',
      business_gstno: '',
      business_pan: '',
    });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      if (selectedCustomer) {
        await customerAPI.updateCustomer(selectedCustomer.id, formData);
      } else {
        await customerAPI.createCustomer(formData);
      }
      handleCloseDialog();
      fetchCustomers();
    } catch (error) {
      console.error('Error saving customer:', error);
    }
  };

  const handleDelete = async (customer) => {
    if (window.confirm('Are you sure you want to delete this customer?')) {
      try {
        await customerAPI.deleteCustomer(customer.id);
        fetchCustomers();
      } catch (error) {
        console.error('Error deleting customer:', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Customers
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Customer
        </Button>
      </Box>

      <Paper sx={{ p: 2 }}>
        <DataTable
          rows={customers}
          columns={columns}
          onEdit={handleOpenDialog}
          onDelete={handleDelete}
          loading={loading}
          getRowId={(row) => row.id}
        />
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedCustomer ? 'Edit Customer' : 'Add New Customer'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="company_name"
              label="Company Name"
              value={formData.company_name}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="client_industry"
              label="Industry"
              value={formData.client_industry}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="country_id"
              label="Country ID"
              value={formData.country_id}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="company_id"
              label="Company ID"
              value={formData.company_id}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="category_id"
              label="Category ID"
              value={formData.category_id}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="business_gstno"
              label="GST Number"
              value={formData.business_gstno}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="business_pan"
              label="PAN"
              value={formData.business_pan}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedCustomer ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Customers;