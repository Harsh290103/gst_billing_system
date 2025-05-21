import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from '@mui/material';
import {
  Person as PersonIcon,
  Receipt as InvoiceIcon,
} from '@mui/icons-material';
import { customerAPI, invoiceAPI } from '../api/api';

const StatCard = ({ title, value, icon, color, onClick }) => (
  <Paper
    onClick={onClick}
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: 140,
      bgcolor: color,
      color: 'white',
      cursor: onClick ? 'pointer' : 'default',
      transition: 'box-shadow 0.2s',
      '&:hover': {
        boxShadow: onClick ? 8 : undefined,
      },
    }}
    elevation={3}
  >
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Typography component="h2" variant="h6" gutterBottom>
        {title}
      </Typography>
      {icon}
    </Box>
    <Typography component="p" variant="h4">
      {value}
    </Typography>
  </Paper>
);

const Dashboard = () => {
  const [counts, setCounts] = useState({
    customers: 0,
    invoices: 0,
  });
  const [companyCustomers, setCompanyCustomers] = useState([]);
  const [companyInvoices, setCompanyInvoices] = useState([]);
  const [openCustomers, setOpenCustomers] = useState(false);
  const [openInvoices, setOpenInvoices] = useState(false);

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        // Get logged-in user's company id
        const user = JSON.parse(localStorage.getItem('user')) || {};
        const companyId = user.company_id;

        // Fetch all customers and invoices
        const [customers, invoices] = await Promise.all([
          customerAPI.getAllCustomers(),
          invoiceAPI.getAllInvoices(),
        ]);

        // Filter by company_id only
        const filteredCustomers = customers.filter(
          (cust) => String(cust.company_id) === String(companyId)
        );
        const filteredInvoices = invoices.filter(
          (inv) => String(inv.company_id) === String(companyId)
        );

        setCompanyCustomers(filteredCustomers);
        setCompanyInvoices(filteredInvoices);
        setCounts({
          customers: filteredCustomers.length,
          invoices: filteredInvoices.length,
        });
      } catch (error) {
        setCounts({ customers: 0, invoices: 0 });
        setCompanyCustomers([]);
        setCompanyInvoices([]);
      }
    };
    fetchCounts();
  }, []);

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6}>
          <StatCard
            title="Customers"
            value={counts.customers}
            icon={<PersonIcon />}
            color="#ed6c02"
            onClick={() => setOpenCustomers(true)}
          />
        </Grid>
        <Grid item xs={12} sm={6} md={6}>
          <StatCard
            title="Invoices"
            value={counts.invoices}
            icon={<InvoiceIcon />}
            color="#9c27b0"
            onClick={() => setOpenInvoices(true)}
          />
        </Grid>
      </Grid>

      {/* Customers Modal */}
      <Dialog open={openCustomers} onClose={() => setOpenCustomers(false)} maxWidth="md" fullWidth>
        <DialogTitle>Customer Details</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Industry</TableCell>
                <TableCell>GST No</TableCell>
                <TableCell>PAN</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companyCustomers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No customer data found.
                  </TableCell>
                </TableRow>
              ) : (
                companyCustomers.map((cust) => (
                  <TableRow key={cust.id}>
                    <TableCell>{cust.Company_name}</TableCell>
                    <TableCell>{cust.client_industry}</TableCell>
                    <TableCell>{cust.business_gstno}</TableCell>
                    <TableCell>{cust.business_pan}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button onClick={() => setOpenCustomers(false)} variant="contained">Close</Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Invoices Modal */}
      <Dialog open={openInvoices} onClose={() => setOpenInvoices(false)} maxWidth="md" fullWidth>
        <DialogTitle>Invoice Details</DialogTitle>
        <DialogContent>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Invoice No</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Due Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {companyInvoices.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    No invoices found.
                  </TableCell>
                </TableRow>
              ) : (
                companyInvoices.map((inv) => (
                  <TableRow key={inv.id}>
                    <TableCell>{inv.invoice_no}</TableCell>
                    <TableCell>{inv.invoice_date}</TableCell>
                    <TableCell>{inv.due_date}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <Box sx={{ mt: 2, textAlign: 'right' }}>
            <Button onClick={() => setOpenInvoices(false)} variant="contained">Close</Button>
          </Box>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default Dashboard;