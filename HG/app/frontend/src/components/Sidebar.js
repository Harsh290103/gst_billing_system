import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemButton,
  Divider,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Business as BusinessIcon,
  Person as PersonIcon,
  Public as CountryIcon,
  Category as CategoryIcon,
  Receipt as InvoiceIcon,
  Settings as ConfigureTaxIcon,
  ShoppingCart as InvoiceProductIcon,
} from '@mui/icons-material';

const drawerWidth = 240;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Users', icon: <PeopleIcon />, path: '/users' },
  { text: 'Companies', icon: <BusinessIcon />, path: '/companies' },
  { text: 'Customers', icon: <PersonIcon />, path: '/customers' },
  { text: 'Invoices', icon: <InvoiceIcon />, path: '/invoices' },
  { text: 'Countries', icon: <CountryIcon />, path: '/countries' },
  { text: 'Categories', icon: <CategoryIcon />, path: '/categories' },
  { text: 'Configure Taxes', icon: <ConfigureTaxIcon />, path: '/configure-taxes' },
  { text: 'Invoice Products', icon: <InvoiceProductIcon />, path: '/invoice-products' },
];

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          mt: 8,
        },
      }}
    >
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => navigate(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;