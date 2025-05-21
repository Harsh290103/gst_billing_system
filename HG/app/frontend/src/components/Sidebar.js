import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
  Typography,
  Box,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Person as PersonIcon,
  Receipt as InvoiceIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Profile', icon: <PersonIcon />, path: '/profile' },
  { text: 'Invoices', icon: <InvoiceIcon />, path: '/invoices' },
];

const Sidebar = ({ open, onClose, companyName }) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Only redirect to "/" when closing the sidebar via backdrop/Esc, not when clicking a menu item
  const handleDrawerClose = (event, reason) => {
    // Only redirect if closing by backdropClick or escapeKeyDown
    if (reason === 'backdropClick' || reason === 'escapeKeyDown') {
      if (location.pathname !== '/') {
        navigate('/');
      }
    }
    onClose();
  };

  return (
    <Drawer
      variant="temporary"
      open={open}
      onClose={handleDrawerClose}
      sx={{
        '& .MuiDrawer-paper': {
          width: 240,
          boxSizing: 'border-box',
          mt: 8,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>
          {companyName}
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => {
                navigate(item.path);
                onClose();
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;