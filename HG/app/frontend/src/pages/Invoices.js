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
import { invoiceAPI } from '../api/api';

const Invoices = () => {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const [formData, setFormData] = useState({
    invoice_no: '',
    invoice_date: '',
    due_date: '',
    company_id: '',
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'invoice_no', headerName: 'Invoice No', width: 150 },
    { field: 'invoice_date', headerName: 'Invoice Date', width: 150 },
    { field: 'due_date', headerName: 'Due Date', width: 150 },
    { field: 'company_id', headerName: 'Company ID', width: 120 },
  ];

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const data = await invoiceAPI.getAllInvoices();
      setInvoices(data.map((inv, idx) => ({ ...inv, id: inv.id || idx })));
    } catch (error) {
      console.error('Error fetching invoices:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, []);

  const handleOpenDialog = (invoice = null) => {
    setSelectedInvoice(invoice);
    setFormData(invoice ? {
      invoice_no: invoice.invoice_no,
      invoice_date: invoice.invoice_date,
      due_date: invoice.due_date,
      company_id: invoice.company_id,
    } : {
      invoice_no: '',
      invoice_date: '',
      due_date: '',
      company_id: '',
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedInvoice(null);
    setFormData({
      invoice_no: '',
      invoice_date: '',
      due_date: '',
      company_id: '',
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
      if (selectedInvoice) {
        await invoiceAPI.updateInvoice(selectedInvoice.id, formData);
      } else {
        await invoiceAPI.createInvoice(formData);
      }
      handleCloseDialog();
      fetchInvoices();
    } catch (error) {
      console.error('Error saving invoice:', error);
    }
  };

  const handleDelete = async (invoice) => {
    if (window.confirm('Are you sure you want to delete this invoice?')) {
      try {
        await invoiceAPI.deleteInvoice(invoice.id);
        fetchInvoices();
      } catch (error) {
        console.error('Error deleting invoice:', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Invoices
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Add Invoice
        </Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <DataTable
          rows={invoices}
          columns={columns}
          onEdit={handleOpenDialog}
          onDelete={handleDelete}
          loading={loading}
          getRowId={(row) => row.id}
        />
      </Paper>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {selectedInvoice ? 'Edit Invoice' : 'Add New Invoice'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField
              name="invoice_no"
              label="Invoice No"
              value={formData.invoice_no}
              onChange={handleInputChange}
              fullWidth
            />
            <TextField
              name="invoice_date"
              label="Invoice Date"
              type="date"
              value={formData.invoice_date}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="due_date"
              label="Due Date"
              type="date"
              value={formData.due_date}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              name="company_id"
              label="Company ID"
              value={formData.company_id}
              onChange={handleInputChange}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedInvoice ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Invoices;