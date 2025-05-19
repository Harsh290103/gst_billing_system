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
import { companyAPI } from '../api/api';

const Companies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [formData, setFormData] = useState({
    company_name: '',
    country_id: '',
    company_address: '',
    business_gstno: '',
    business_pan: '',
    user_id: '',
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'company_name', headerName: 'Company Name', width: 200 },
    { field: 'company_address', headerName: 'Address', width: 250 },
    { field: 'business_gstno', headerName: 'GST No', width: 150 },
    { field: 'business_pan', headerName: 'PAN', width: 150 },
  ];

  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const data = await companyAPI.getAllCompanies();
      setCompanies(data);
    } catch (error) {
      console.error('Error fetching companies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  const handleOpenDialog = (company = null) => {
    if (company) {
      setSelectedCompany(company);
      setFormData({
        company_name: company.company_name,
        country_id: company.country_id,
        company_address: company.company_address,
        business_gstno: company.business_gstno,
        business_pan: company.business_pan,
        user_id: company.user_id,
      });
    } else {
      setSelectedCompany(null);
      setFormData({
        company_name: '',
        country_id: '',
        company_address: '',
        business_gstno: '',
        business_pan: '',
        user_id: '',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedCompany(null);
    setFormData({
      company_name: '',
      country_id: '',
      company_address: '',
      business_gstno: '',
      business_pan: '',
      user_id: '',
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
      if (selectedCompany) {
        await companyAPI.updateCompany(selectedCompany.id, formData);
      } else {
        await companyAPI.createCompany(formData);
      }
      handleCloseDialog();
      fetchCompanies();
    } catch (error) {
      console.error('Error saving company:', error);
    }
  };

  const handleDelete = async (company) => {
    if (window.confirm('Are you sure you want to delete this company?')) {
      try {
        await companyAPI.deleteCompany(company.id);
        fetchCompanies();
      } catch (error) {
        console.error('Error deleting company:', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Companies
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Company
        </Button>
      </Box>

      <Paper sx={{ p: 2 }}>
        <DataTable
          rows={companies}
          columns={columns}
          onEdit={handleOpenDialog}
          onDelete={handleDelete}
          loading={loading}
          getRowId={(row) => row.id}
        />
      </Paper>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedCompany ? 'Edit Company' : 'Add New Company'}
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
              name="country_id"
              label="Country ID"
              value={formData.country_id}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="company_address"
              label="Company Address"
              value={formData.company_address}
              onChange={handleInputChange}
              fullWidth
              multiline
              rows={3}
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
              label="PAN Number"
              value={formData.business_pan}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="user_id"
              label="User ID"
              value={formData.user_id}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedCompany ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Companies; 