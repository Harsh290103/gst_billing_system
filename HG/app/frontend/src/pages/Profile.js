import React, { useEffect, useState } from 'react';
import { Box, Paper, Typography, Divider, Grid } from '@mui/material';

// Replace these with your actual API calls or data fetching logic
async function fetchUserDetails(email) {
  // Example: fetch from your backend
  // return fetch(`/api/users?email=${email}`).then(res => res.json());
  return {}; // Replace with actual user data
}

async function fetchCompanyDetails(companyName) {
  // Example: fetch from your backend
  // return fetch(`/api/companies?name=${companyName}`).then(res => res.json());
  return {}; // Replace with actual company data
}

const Profile = () => {
  const [user, setUser] = useState({});
  const [company, setCompany] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get login info from localStorage
    let loginUser = {};
    try {
      loginUser = JSON.parse(localStorage.getItem('user')) || {};
    } catch {}

    async function loadData() {
      setLoading(true);
      // Fetch user and company details
      const userDetails = await fetchUserDetails(loginUser.user_email);
      const companyDetails = await fetchCompanyDetails(loginUser.company_name);
      setUser(userDetails);
      setCompany(companyDetails);
      setLoading(false);
    }

    loadData();
  }, []);

  if (loading) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', minHeight: '80vh' }}>
      <Paper elevation={3} sx={{ p: 4, minWidth: 350, width: '100%', maxWidth: 800 }}>
        <Typography variant="h5" fontWeight={700} gutterBottom>
          Profile Details
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <Grid container spacing={2}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>User Details</Typography>
            {Object.entries(user).map(([key, value]) => (
              <Typography key={key} variant="body2">
                <strong>{key.replace(/_/g, ' ')}:</strong> {value?.toString()}
              </Typography>
            ))}
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>Company Details</Typography>
            {Object.entries(company).map(([key, value]) => (
              <Typography key={key} variant="body2">
                <strong>{key.replace(/_/g, ' ')}:</strong> {value?.toString()}
              </Typography>
            ))}
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
};

export default Profile;