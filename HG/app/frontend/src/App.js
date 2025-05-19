import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';

// Components
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

// Pages
import Dashboard from './pages/Dashboard';
import Users from './pages/Users';
import Companies from './pages/Companies';
import Customers from './pages/Customers';
import Countries from './pages/Countries';
import Categories from './pages/Categories';
import ConfigureTaxes from './pages/ConfigureTaxes';
import InvoiceProducts from './pages/InvoicesProducts';
import Invoices from './pages/Invoices';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Box sx={{ display: 'flex' }}>
          <Navbar />
          <Sidebar />
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              mt: 8,
              backgroundColor: 'background.default',
              minHeight: '100vh',
            }}
          >
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/companies" element={<Companies />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/countries" element={<Countries />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/configure-taxes" element={<ConfigureTaxes />} />
              <Route path="/invoice-products" element={<InvoiceProducts />} />
              <Route path="/invoices" element={<Invoices />} />
            </Routes>
          </Box>
        </Box>
      </Router>
    </ThemeProvider>
  );
}

export default App;