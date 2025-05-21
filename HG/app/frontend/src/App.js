import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate, useNavigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

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
import Login from './pages/Login';
import Profile from './pages/Profile';

const theme = createTheme({
  palette: {
    primary: { main: '#1976d2' },
    secondary: { main: '#dc004e' },
    background: { default: '#f5f5f5' },
  },
});

const isAuthenticated = () => !!localStorage.getItem('user');
const PrivateRoute = ({ children }) => isAuthenticated() ? children : <Navigate to="/login" />;

// Welcome Page Component
const Welcome = () => {
  const navigate = useNavigate();
  let userName = '';
  let companyName = '';
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    userName = user?.first_name || user?.user_email || '';
    companyName = user?.company_name || '';
  } catch {}

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Welcome, {userName}!
      </Typography>
      <Typography variant="h6" gutterBottom>
        Company: {companyName}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 4 }}
        onClick={() => navigate('/invoices')}
      >
        Add Invoice
      </Button>
      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" sx={{ mr: 2 }} onClick={() => navigate('/customers')}>
          Customers
        </Button>
        <Button variant="outlined" onClick={() => navigate('/configure-taxes')}>
          Configure Tax
        </Button>
      </Box>
    </Box>
  );
};

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Get company name from user info in localStorage
  let companyName = '';
  try {
    const user = JSON.parse(localStorage.getItem('user'));
    companyName = user?.company_name || '';
  } catch {}

  return (
    <Box sx={{ display: 'flex' }}>
      {!isLoginPage && (
        <Navbar onMenuClick={() => setSidebarOpen(true)} companyName={companyName} />
      )}
      {!isLoginPage && (
        <Sidebar
          open={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
          companyName={companyName}
        />
      )}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          mt: !isLoginPage ? 8 : 0,
          backgroundColor: 'background.default',
          minHeight: '100vh',
        }}
      >
        <Routes>
          <Route path="/login" element={<Login />} />
          {/* Welcome page after login */}
          <Route path="/" element={<PrivateRoute><Welcome /></PrivateRoute>} />
          <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
          <Route path="/users" element={<PrivateRoute><Users /></PrivateRoute>} />
          <Route path="/companies" element={<PrivateRoute><Companies /></PrivateRoute>} />
          <Route path="/customers" element={<PrivateRoute><Customers /></PrivateRoute>} />
          <Route path="/countries" element={<PrivateRoute><Countries /></PrivateRoute>} />
          <Route path="/categories" element={<PrivateRoute><Categories /></PrivateRoute>} />
          <Route path="/configure-taxes" element={<PrivateRoute><ConfigureTaxes /></PrivateRoute>} />
          <Route path="/invoice-products" element={<PrivateRoute><InvoiceProducts /></PrivateRoute>} />
          <Route path="/invoices" element={<PrivateRoute><Invoices /></PrivateRoute>} />
        </Routes>
      </Box>
    </Box>
  );
}

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppContent />
      </Router>
    </ThemeProvider>
  );
}

export default App;