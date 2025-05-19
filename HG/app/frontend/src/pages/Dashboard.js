import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
} from '@mui/material';
import {
  People as PeopleIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Receipt as InvoiceIcon,
} from '@mui/icons-material';
import { userAPI, companyAPI, customerAPI, invoiceAPI } from '../api/api';

const StatCard = ({ title, value, icon, color }) => (
  <Paper
    sx={{
      p: 2,
      display: 'flex',
      flexDirection: 'column',
      height: 140,
      bgcolor: color,
      color: 'white',
    }}
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
    users: 0,
    companies: 0,
    customers: 0,
    invoices: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [users, companies, customers, invoices] = await Promise.all([
          userAPI.getAllUsers(),
          companyAPI.getAllCompanies(),
          customerAPI.getAllCustomers(),
          invoiceAPI.getAllInvoices(),
        ]);
        setCounts({
          users: users.length,
          companies: companies.length,
          customers: customers.length,
          invoices: invoices.length,
        });
      } catch (error) {
        // Handle error or set counts to 0
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
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={counts.users}
            icon={<PeopleIcon />}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Companies"
            value={counts.companies}
            icon={<BusinessIcon />}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Customers"
            value={counts.customers}
            icon={<PersonIcon />}
            color="#ed6c02"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Invoices"
            value={counts.invoices}
            icon={<InvoiceIcon />}
            color="#9c27b0"
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;