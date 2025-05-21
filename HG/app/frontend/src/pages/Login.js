import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from '@mui/material';
import logo from '../assets/image.png';
import { userAPI, companyAPI, countryAPI } from '../api/api';

// Country list for selection
const COUNTRIES = [
  { id: 1, name: 'India' },
  { id: 2, name: 'United States' },
  { id: 3, name: 'United Kingdom' },
  { id: 4, name: 'Australia' },
  { id: 5, name: 'Canada' },
];

const initialLoginForm = {
  user_email: '',
  password: '',
};

const initialRegisterForm = {
  user_email: '',
  password: '',
  last_login: '',
  first_name: '',
  last_name: '',
  mobile_no: '',
  company_name: '',
  country_id: '',
  country_name: '',
  company_address: '',
  business_gstno: '',
  business_pan: '',
};

const Login = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [loginForm, setLoginForm] = useState(initialLoginForm);
  const [registerForm, setRegisterForm] = useState(initialRegisterForm);
  const [error, setError] = useState({});
  const [countryDialogOpen, setCountryDialogOpen] = useState(false);
  const [loginMsg, setLoginMsg] = useState('');
  const navigate = useNavigate();

  // Login validation
  const validateLogin = () => {
    const err = {};
    if (!loginForm.user_email) err.user_email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(loginForm.user_email)) err.user_email = 'Invalid email';
    if (!loginForm.password) err.password = 'Password is required';
    return err;
  };

  // Register validation
  const validateRegister = () => {
    const form = registerForm;
    const err = {};
    if (!form.user_email) err.user_email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.user_email)) err.user_email = 'Invalid email';
    if (!form.password) err.password = 'Password is required';
    if (!form.first_name) err.first_name = 'First name is required';
    if (!form.last_name) err.last_name = 'Last name is required';
    if (!form.mobile_no) err.mobile_no = 'Mobile number is required';
    else if (!/^\d{10,}$/.test(form.mobile_no)) err.mobile_no = 'Invalid mobile number';
    if (!form.last_login) err.last_login = 'Last login is required';
    if (!form.company_name) err.company_name = 'Company name is required';
    if (!form.country_id) err.country_id = 'Country ID is required';
    else if (isNaN(Number(form.country_id))) err.country_id = 'Country ID must be a number';
    if (!form.company_address) err.company_address = 'Company address is required';
    if (!form.business_gstno) err.business_gstno = 'GST No is required';
    if (!form.business_pan) err.business_pan = 'PAN is required';
    return err;
  };

  const handleLoginChange = (e) => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: undefined });
    setLoginMsg('');
  };

  const handleRegisterChange = (e) => {
    setRegisterForm({ ...registerForm, [e.target.name]: e.target.value });
    setError({ ...error, [e.target.name]: undefined });
  };

  const handleCountrySelect = (country) => {
    setRegisterForm({
      ...registerForm,
      country_id: country.id,
      country_name: country.name,
    });
    setError({ ...error, country_id: undefined, country_name: undefined });
    setCountryDialogOpen(false);
  };

  // Register with backend
  const handleRegister = async (e) => {
    e.preventDefault();
    const err = validateRegister();
    setError(err);
    if (Object.keys(err).length === 0) {
      try {
        // 1. Create user
        const userPayload = {
          user_email: registerForm.user_email,
          password: registerForm.password,
          last_login: registerForm.last_login,
          first_name: registerForm.first_name,
          last_name: registerForm.last_name,
          mobile_no: registerForm.mobile_no,
        };
        const userRes = await userAPI.createUser(userPayload);

        // 2. Create company (link with user)
        const companyPayload = {
          company_name: registerForm.company_name,
          country_id: registerForm.country_id,
          company_address: registerForm.company_address,
          business_gstno: registerForm.business_gstno,
          business_pan: registerForm.business_pan,
          user_id: userRes.insertId || userRes.id, // Use the correct key returned by your backend
        };
        await companyAPI.createCompany(companyPayload);

        setIsRegister(false);
        setLoginMsg('Registration successful! Please login.');
        setLoginForm({
          user_email: registerForm.user_email,
          password: registerForm.password,
        });
      } catch (err) {
        setLoginMsg('Registration failed! ' + (err.response?.data?.message || err.message));
      }
    }
  };

  // Login with backend
  const handleLogin = async (e) => {
    e.preventDefault();
    const err = validateLogin();
    setError(err);
    setLoginMsg('');
    if (Object.keys(err).length === 0) {
      try {
        const users = await userAPI.getAllUsers();
        const found = users.find(
          u => u.user_email === loginForm.user_email && u.password === loginForm.password
        );
        if (!found) {
          setLoginMsg('Invalid credentials or user not registered.');
          return;
        }
        // Optionally, fetch company details for this user
        const companies = await companyAPI.getAllCompanies();
        const userCompany = companies.find(c => c.user_id === found.id);
        // Save both user and company to localStorage/session
        localStorage.setItem('user', JSON.stringify(found));
        if (userCompany) {
          localStorage.setItem('company', JSON.stringify(userCompany));
        }
        navigate('/');
      } catch (err) {
        setLoginMsg('Login failed! ' + (err.response?.data?.message || err.message));
      }
    }
  };

  return (
    <Grid container direction="column" sx={{ minHeight: '100vh' }}>
      {/* Header */}
      <Grid item sx={{ background: '#1976d2', color: '#fff', py: 3, px: 2 }}>
        <Box
          display="flex"
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box display="flex" alignItems="center">
            <img src={logo} alt="GST Billing System" style={{ width: 60, marginRight: 16, borderRadius: '50%' }} />
            <Box>
              <Typography variant="h4" fontWeight={700} sx={{ lineHeight: 1 }}>
                GST Billing System
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.8 }}>
                Simple GST Billing & Invoicing for your business
              </Typography>
            </Box>
          </Box>
          <Box>
            {!isRegister && (
              <Button
                variant="contained"
                color="secondary"
                onClick={() => {
                  setIsRegister(true);
                  setLoginMsg('');
                  setError({});
                }}
              >
                REGISTER
              </Button>
            )}
            {isRegister && (
              <Button
                variant="outlined"
                color="inherit"
                onClick={() => {
                  setIsRegister(false);
                  setError({});
                }}
              >
                LOGIN
              </Button>
            )}
          </Box>
        </Box>
      </Grid>

      {/* Main Form */}
      <Grid
        item
        xs
        container
        justifyContent="center"
        alignItems="center"
        sx={{ flex: 1, background: '#f5f5f5' }}
      >
        <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 600 }}>
          <Typography variant="h5" fontWeight={600} mb={2} align="center">
            {isRegister ? 'Register' : 'Login'}
          </Typography>
          {isRegister ? (
            <form onSubmit={handleRegister} noValidate>
              <Typography variant="subtitle1" fontWeight={500} mt={2}>User Details</Typography>
              <TextField
                label="Email"
                name="user_email"
                value={registerForm.user_email}
                onChange={handleRegisterChange}
                fullWidth
                margin="normal"
                required
                error={!!error.user_email}
                helperText={error.user_email}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={registerForm.password}
                onChange={handleRegisterChange}
                fullWidth
                margin="normal"
                required
                error={!!error.password}
                helperText={error.password}
              />
              <TextField
                label="Last Login"
                name="last_login"
                type="datetime-local"
                value={registerForm.last_login}
                onChange={handleRegisterChange}
                fullWidth
                margin="normal"
                required
                error={!!error.last_login}
                helperText={error.last_login}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                label="First Name"
                name="first_name"
                value={registerForm.first_name}
                onChange={handleRegisterChange}
                fullWidth
                margin="normal"
                required
                error={!!error.first_name}
                helperText={error.first_name}
              />
              <TextField
                label="Last Name"
                name="last_name"
                value={registerForm.last_name}
                onChange={handleRegisterChange}
                fullWidth
                margin="normal"
                required
                error={!!error.last_name}
                helperText={error.last_name}
              />
              <TextField
                label="Mobile No"
                name="mobile_no"
                value={registerForm.mobile_no}
                onChange={handleRegisterChange}
                fullWidth
                margin="normal"
                required
                error={!!error.mobile_no}
                helperText={error.mobile_no}
              />

              <Typography variant="subtitle1" fontWeight={500} mt={3}>Company Details</Typography>
              <TextField
                label="Company Name"
                name="company_name"
                value={registerForm.company_name}
                onChange={handleRegisterChange}
                fullWidth
                margin="normal"
                required
                error={!!error.company_name}
                helperText={error.company_name}
              />
              <TextField
                label="Country"
                name="country_name"
                value={registerForm.country_name}
                onClick={() => setCountryDialogOpen(true)}
                fullWidth
                margin="normal"
                required
                error={!!error.country_name}
                helperText={error.country_name}
                InputProps={{
                  readOnly: true,
                }}
              />
              <Dialog open={countryDialogOpen} onClose={() => setCountryDialogOpen(false)}>
                <DialogTitle>Select Country</DialogTitle>
                <DialogContent>
                  <List>
                    {COUNTRIES.map((country) => (
                      <ListItem key={country.id} disablePadding>
                        <ListItemButton onClick={() => handleCountrySelect(country)}>
                          <ListItemText primary={country.name} />
                        </ListItemButton>
                      </ListItem>
                    ))}
                  </List>
                </DialogContent>
              </Dialog>
              <TextField
                label="Country ID"
                name="country_id"
                value={registerForm.country_id}
                fullWidth
                margin="normal"
                required
                error={!!error.country_id}
                helperText={error.country_id}
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                label="Company Address"
                name="company_address"
                value={registerForm.company_address}
                onChange={handleRegisterChange}
                fullWidth
                margin="normal"
                required
                error={!!error.company_address}
                helperText={error.company_address}
              />
              <TextField
                label="Business GST No"
                name="business_gstno"
                value={registerForm.business_gstno}
                onChange={handleRegisterChange}
                fullWidth
                margin="normal"
                required
                error={!!error.business_gstno}
                helperText={error.business_gstno}
              />
              <TextField
                label="Business PAN"
                name="business_pan"
                value={registerForm.business_pan}
                onChange={handleRegisterChange}
                fullWidth
                margin="normal"
                required
                error={!!error.business_pan}
                helperText={error.business_pan}
              />

              {loginMsg && (
                <Typography color={loginMsg.includes('successful') ? 'primary' : 'error'} sx={{ mt: 1, mb: 1 }} align="center">
                  {loginMsg}
                </Typography>
              )}

              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Register
              </Button>
            </form>
          ) : (
            <form onSubmit={handleLogin} noValidate>
              <TextField
                label="Email"
                name="user_email"
                value={loginForm.user_email}
                onChange={handleLoginChange}
                fullWidth
                margin="normal"
                required
                error={!!error.user_email}
                helperText={error.user_email}
              />
              <TextField
                label="Password"
                name="password"
                type="password"
                value={loginForm.password}
                onChange={handleLoginChange}
                fullWidth
                margin="normal"
                required
                error={!!error.password}
                helperText={error.password}
              />
              {loginMsg && (
                <Typography color="error" sx={{ mt: 1, mb: 1 }} align="center">
                  {loginMsg}
                </Typography>
              )}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={{ mt: 2 }}
              >
                Login
              </Button>
            </form>
          )}
        </Paper>
      </Grid>

      {/* Footer */}
      <Grid item sx={{ background: '#1976d2', color: '#fff', py: 2, mt: 'auto' }}>
        <Box textAlign="center">
          <Typography variant="body2">
            &copy; {new Date().getFullYear()} GST Billing System. All rights reserved.
          </Typography>
        </Box>
      </Grid>
    </Grid>
  );
};

export default Login;