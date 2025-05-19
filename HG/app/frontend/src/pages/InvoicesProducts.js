import React, { useState, useEffect } from 'react';
import {
  Box, Button, Dialog, DialogTitle, DialogContent, DialogActions,
  TextField, Typography, Paper
} from '@mui/material';
import { Add as AddIcon } from '@mui/icons-material';
import DataTable from '../components/DataTable';
import { invoiceProductAPI } from '../api/api';

const InvoiceProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [formData, setFormData] = useState({
    invoice_id: '',
    category_id: '',
    product_name: '',
    quantity: '',
    product_rate: '',
    amount: '',
    total: ''
  });

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    { field: 'invoice_id', headerName: 'Invoice ID', width: 120 },
    { field: 'category_id', headerName: 'Category ID', width: 120 },
    { field: 'product_name', headerName: 'Product Name', width: 180 },
    { field: 'quantity', headerName: 'Quantity', width: 100 },
    { field: 'product_rate', headerName: 'Product Rate', width: 120 },
    { field: 'amount', headerName: 'Amount', width: 120 },
    { field: 'total', headerName: 'Total', width: 120 },
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const data = await invoiceProductAPI.getAllInvoiceProducts();
      setProducts(data.map((p, idx) => ({ ...p, id: p.id || idx })));
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleOpenDialog = (product = null) => {
    setSelectedProduct(product);
    setFormData(product ? {
      invoice_id: product.invoice_id,
      category_id: product.category_id,
      product_name: product.product_name,
      quantity: product.quantity,
      product_rate: product.product_rate,
      amount: product.amount,
      total: product.total
    } : {
      invoice_id: '',
      category_id: '',
      product_name: '',
      quantity: '',
      product_rate: '',
      amount: '',
      total: ''
    });
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProduct(null);
    setFormData({
      invoice_id: '',
      category_id: '',
      product_name: '',
      quantity: '',
      product_rate: '',
      amount: '',
      total: ''
    });
  };

  const handleInputChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    try {
      if (selectedProduct) {
        await invoiceProductAPI.updateInvoiceProduct(selectedProduct.id, formData);
      } else {
        await invoiceProductAPI.createInvoiceProduct(formData);
      }
      handleCloseDialog();
      fetchProducts();
    } catch (error) {
      console.error('Error saving product:', error);
    }
  };

  const handleDelete = async (product) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await invoiceProductAPI.deleteInvoiceProduct(product.id);
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1">Invoice Products</Typography>
        <Button variant="contained" startIcon={<AddIcon />} onClick={() => handleOpenDialog()}>Add Product</Button>
      </Box>
      <Paper sx={{ p: 2 }}>
        <DataTable
          rows={products}
          columns={columns}
          onEdit={handleOpenDialog}
          onDelete={handleDelete}
          loading={loading}
          getRowId={(row) => row.id}
        />
      </Paper>
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>{selectedProduct ? 'Edit Product' : 'Add New Product'}</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
            <TextField name="invoice_id" label="Invoice ID" value={formData.invoice_id} onChange={handleInputChange} fullWidth />
            <TextField name="category_id" label="Category ID" value={formData.category_id} onChange={handleInputChange} fullWidth />
            <TextField name="product_name" label="Product Name" value={formData.product_name} onChange={handleInputChange} fullWidth />
            <TextField name="quantity" label="Quantity" value={formData.quantity} onChange={handleInputChange} fullWidth />
            <TextField name="product_rate" label="Product Rate" value={formData.product_rate} onChange={handleInputChange} fullWidth />
            <TextField name="amount" label="Amount" value={formData.amount} onChange={handleInputChange} fullWidth />
            <TextField name="total" label="Total" value={formData.total} onChange={handleInputChange} fullWidth />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">{selectedProduct ? 'Update' : 'Create'}</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default InvoiceProducts;