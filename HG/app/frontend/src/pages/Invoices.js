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
  MenuItem,
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DataTable from '../components/DataTable';
import { invoiceAPI, customerAPI, configureTaxAPI } from '../api/api';

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
    customer_id: '',
    tax_id: '',
  });

  // Customer and Tax Dialogs
  const [customerDialogOpen, setCustomerDialogOpen] = useState(false);
  const [taxDialogOpen, setTaxDialogOpen] = useState(false);

  // Customer and Tax Data
  const [customers, setCustomers] = useState([]);
  const [taxes, setTaxes] = useState([]);

  // Customer Form
  const [customerForm, setCustomerForm] = useState({
    customer_name: '',
    customer_email: '',
    customer_address: '',
  });

  // Tax Form
  const [taxForm, setTaxForm] = useState({
    tax_name: '',
    tax_rate: '',
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'invoice_no', headerName: 'Invoice No', width: 150 },
    { field: 'invoice_date', headerName: 'Invoice Date', width: 150 },
    { field: 'due_date', headerName: 'Due Date', width: 150 },
    { field: 'company_id', headerName: 'Company ID', width: 120 },
    { field: 'customer_id', headerName: 'Customer', width: 150 },
    { field: 'tax_id', headerName: 'Tax', width: 120 },
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

  const fetchCustomers = async () => {
    try {
      const data = await customerAPI.getAllCustomers();
      setCustomers(data);
    } catch (error) {
      setCustomers([]);
    }
  };

  const fetchTaxes = async () => {
    try {
      const data = await configureTaxAPI.getAllConfigureTax();
      setTaxes(data);
    } catch (error) {
      setTaxes([]);
    }
  };

  useEffect(() => {
    fetchInvoices();
    fetchCustomers();
    fetchTaxes();
  }, []);

  const handleOpenDialog = (invoice = null) => {
    setSelectedInvoice(invoice);
    setFormData(invoice ? {
      invoice_no: invoice.invoice_no,
      invoice_date: invoice.invoice_date,
      due_date: invoice.due_date,
      company_id: invoice.company_id,
      customer_id: invoice.customer_id || '',
      tax_id: invoice.tax_id || '',
    } : {
      invoice_no: '',
      invoice_date: '',
      due_date: '',
      company_id: '',
      customer_id: '',
      tax_id: '',
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
      customer_id: '',
      tax_id: '',
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

  // Customer Dialog Handlers
  const handleCustomerFormChange = (e) => {
    const { name, value } = e.target;
    setCustomerForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddCustomer = async (e) => {
    e.preventDefault();
    await customerAPI.createCustomer(customerForm);
    setCustomerDialogOpen(false);
    setCustomerForm({ customer_name: '', customer_email: '', customer_address: '' });
    fetchCustomers();
  };

  // Tax Dialog Handlers
  const handleTaxFormChange = (e) => {
    const { name, value } = e.target;
    setTaxForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAddTax = async (e) => {
    e.preventDefault();
    await configureTaxAPI.createConfigureTax(taxForm);
    setTaxDialogOpen(false);
    setTaxForm({ tax_name: '', tax_rate: '' });
    fetchTaxes();
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Invoices
        </Typography>
        <Box>
          <Button
            variant="outlined"
            sx={{ mr: 2 }}
            onClick={() => setCustomerDialogOpen(true)}
          >
            Add Customer
          </Button>
          <Button
            variant="outlined"
            sx={{ mr: 2 }}
            onClick={() => setTaxDialogOpen(true)}
          >
            Add Configure Tax
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
          >
            Add Invoice
          </Button>
        </Box>
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
      {/* Invoice Dialog */}
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
            <TextField
              select
              name="customer_id"
              label="Customer"
              value={formData.customer_id}
              onChange={handleInputChange}
              fullWidth
            >
              {customers.map((c) => (
                <MenuItem key={c.id} value={c.id}>{c.customer_name}</MenuItem>
              ))}
            </TextField>
            <TextField
              select
              name="tax_id"
              label="Tax"
              value={formData.tax_id}
              onChange={handleInputChange}
              fullWidth
            >
              {taxes.map((t) => (
                <MenuItem key={t.id} value={t.id}>{t.tax_name} ({t.tax_rate}%)</MenuItem>
              ))}
            </TextField>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {selectedInvoice ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Add Customer Dialog */}
      <Dialog open={customerDialogOpen} onClose={() => setCustomerDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Add New Customer</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddCustomer}>
            <TextField
              label="Customer Name"
              name="customer_name"
              value={customerForm.customer_name}
              onChange={handleCustomerFormChange}
              fullWidth margin="normal" required
            />
            <TextField
              label="Customer Email"
              name="customer_email"
              value={customerForm.customer_email}
              onChange={handleCustomerFormChange}
              fullWidth margin="normal"
            />
            <TextField
              label="Customer Address"
              name="customer_address"
              value={customerForm.customer_address}
              onChange={handleCustomerFormChange}
              fullWidth margin="normal"
            />
            <DialogActions>
              <Button onClick={() => setCustomerDialogOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained">Add</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
      {/* Add Tax Dialog */}
      <Dialog open={taxDialogOpen} onClose={() => setTaxDialogOpen(false)} maxWidth="xs" fullWidth>
        <DialogTitle>Add Configure Tax</DialogTitle>
        <DialogContent>
          <form onSubmit={handleAddTax}>
            <TextField
              label="Tax Name"
              name="tax_name"
              value={taxForm.tax_name}
              onChange={handleTaxFormChange}
              fullWidth margin="normal" required
            />
            <TextField
              label="Tax Rate (%)"
              name="tax_rate"
              value={taxForm.tax_rate}
              onChange={handleTaxFormChange}
              fullWidth margin="normal" required
            />
            <DialogActions>
              <Button onClick={() => setTaxDialogOpen(false)}>Cancel</Button>
              <Button type="submit" variant="contained">Add</Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Invoices;