// App.tsx

import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Snackbar, AppBar, Toolbar, IconButton, Drawer, Divider, Button, Avatar, List, ListItem, ListItemIcon, ListItemText, Container, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { Menu as MenuIcon, Dashboard, Person, Settings, ExitToApp, ListAlt, ChevronLeft, ChevronRight } from '@mui/icons-material';

const rows = [
  { id: 1, name: 'Client A', email: 'clientA@example.com', status: 'Active' },
  { id: 2, name: 'Client B', email: 'clientB@example.com', status: 'Inactive' },
  { id: 3, name: 'Client C', email: 'clientC@example.com', status: 'Active' },
];

const TablesPage = () => {
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState(false);

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleSubMenuToggle = () => {
    setOpenSubMenu(!openSubMenu);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* AppBar */}
      
      {/* Drawer */}
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)} sx={{ width: 240, flexShrink: 0 }}>
        <Box sx={{ width: 240, height: '100%', backgroundColor: '#263238', color: 'white', paddingTop: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', padding: 2 }}>
            <Avatar alt="Admin Avatar" src="https://via.placeholder.com/40" sx={{ width: 40, height: 40, marginRight: 2 }} />
            <Typography variant="body1">Admin Panel</Typography>
          </Box>
          <Divider sx={{ backgroundColor: '#bbb' }} />
          <List>
            <ListItem button>
              <ListItemIcon>
                <Dashboard sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Dashboard" sx={{ color: '#fff' }} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Person sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Profile" sx={{ color: '#fff' }} />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Settings sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Settings" sx={{ color: '#fff' }} />
            </ListItem>
            <ListItem button onClick={handleSubMenuToggle}>
              <ListItemIcon>
                <ListAlt sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Admin Settings" sx={{ color: '#fff' }} />
              {openSubMenu ? <ChevronLeft sx={{ color: '#fff' }} /> : <ChevronRight sx={{ color: '#fff' }} />}
            </ListItem>
            <Divider sx={{ backgroundColor: '#bbb' }} />
            <ListItem button>
              <ListItemIcon>
                <ExitToApp sx={{ color: '#fff' }} />
              </ListItemIcon>
              <ListItemText primary="Logout" sx={{ color: '#fff' }} />
            </ListItem>
          </List>
        </Box>
      </Drawer>

      {/* Main Content Area */}
      <Box component="main" sx={{ marginTop: '64px', padding: 3, flex: 1 }}>
        <Container maxWidth="lg">
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
            <Typography variant="h5" sx={{ fontWeight: 600 }}>Tables</Typography>
            <Button variant="contained" color="primary" href="https://github.com/justboil/admin-one-react-tailwind" target="_blank" startIcon={<MenuIcon />}>
              Star on GitHub
            </Button>
          </Box>

          {/* Table Section */}
          <Card sx={{ marginBottom: 6, boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>Responsive Table</Typography>
              <TableContainer component={Paper} sx={{ boxShadow: 2, borderRadius: 1 }}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 600 }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.email}</TableCell>
                        <TableCell>{row.status}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </CardContent>
          </Card>

          {/* Empty Section */}
          <Card sx={{ boxShadow: 3, borderRadius: 2 }}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200, backgroundColor: '#f7f7f7', borderRadius: 1 }}>
                <Typography variant="h6" color="textSecondary">No data available</Typography>
              </Box>
            </CardContent>
          </Card>
        </Container>

        {/* Snackbar */}
        <Snackbar
          open={openSnackbar}
          onClose={handleSnackbarClose}
          message="New Notification"
          autoHideDuration={4000}
          sx={{ bottom: 50 }}
        />
      </Box>
    </Box>
  );
};

export default TablesPage;
