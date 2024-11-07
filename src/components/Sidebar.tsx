import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Pour la navigation
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider, Collapse, Avatar } from '@mui/material';
import { Dashboard, Person, Settings, ExitToApp, ChevronLeft, ChevronRight, ExpandLess, ExpandMore, ListAlt } from '@mui/icons-material';

const Sidebar = ({ open, onToggle }) => {
  const [openSubMenu, setOpenSubMenu] = useState(false); // Gérer l'état du sous-menu

  const handleSubMenuToggle = () => {
    setOpenSubMenu(!openSubMenu); // Toggle l'état du sous-menu
  };

  return (
    <Drawer
    sx={{
      width: open ? 240 : 60, // 240px si ouverte, 60px si fermée
      flexShrink: 0,
      height: '100vh', // Hauteur complète de la fenêtre
      '& .MuiDrawer-paper': {
        width: open ? 240 : 60,
        boxSizing: 'border-box',
        backgroundColor: '#333',
        color: 'white',
        transition: 'width 0.3s ease', // Animation pour rétrécir/agrandir la sidebar
        overflowY: 'auto', // Permet de faire défiler le contenu si nécessaire
        overflowX: 'hidden', // Evite un scrollbar horizontal non désiré
      },
    }}
      variant="permanent"
      anchor="left"
    >
      <div style={{ padding: '16px' }}>
        {/* Afficher l'image lorsque le menu est ouvert */}
        {open ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Avatar
              alt="Admin Avatar"
              src="https://via.placeholder.com/40" // Remplacer avec le lien vers ton image
              style={{ marginBottom: '8px' }}
            />
            <h3>Admin Panel</h3>
          </div>
        ) : (
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Avatar
              alt="Admin Avatar"
              src="https://via.placeholder.com/40" // Lien vers une petite image ou icône
              style={{ marginBottom: '8px' }}
            />
          </div>
        )}

        {/* Bouton de toggle pour ouvrir/fermer la sidebar */}
     
      </div>

      <Divider />

      {/* Liste des éléments du menu */}
      <List>
        <ListItem button component={Link} to="/home">
          <ListItemIcon sx={{ color: 'white' }}>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary={open ? 'Home' : ''} />
        </ListItem>

        <ListItem button component={Link} to="/form">
          <ListItemIcon sx={{ color: 'white' }}>
            <Person />
          </ListItemIcon>
          <ListItemText primary={open ? 'Form' : ''} />
        </ListItem>

        <ListItem button component={Link} to="/">
          <ListItemIcon sx={{ color: 'white' }}>
            <Settings />
          </ListItemIcon>
          <ListItemText primary={open ? 'Index' : ''} />
        </ListItem>

        {/* Sous-menu */}
        <ListItem button onClick={handleSubMenuToggle}>
          <ListItemIcon sx={{ color: 'white' }}>
            <ListAlt />
          </ListItemIcon>
          <ListItemText primary={open ? 'Admin Settings' : ''} />
          {openSubMenu ? <ExpandLess /> : <ExpandMore />}
        </ListItem>

        <Collapse in={openSubMenu} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            <ListItem button component={Link} to="/settings/user-management">
              <ListItemIcon sx={{ color: 'white' }}>
                <Person />
              </ListItemIcon>
              <ListItemText primary={open ? 'User Management' : ''} />
            </ListItem>
            <ListItem button component={Link} to="/settings/system-settings">
              <ListItemIcon sx={{ color: 'white' }}>
                <Settings />
              </ListItemIcon>
              <ListItemText primary={open ? 'System Settings' : ''} />
            </ListItem>
          </List>
        </Collapse>

        <ListItem button component={Link} to="/logout">
          <ListItemIcon sx={{ color: 'white' }}>
            <ExitToApp />
          </ListItemIcon>
          <ListItemText primary={open ? 'Logout' : ''} />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
