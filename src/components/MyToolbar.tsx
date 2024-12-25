import React, { useState } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Menu, MenuItem, Button, Divider } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const MyToolbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {/* Bouton de menu */}
        <IconButton edge="start" color="inherit" onClick={handleMenuOpen} aria-controls="file-menu" aria-haspopup="true">
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Mon Application
        </Typography>

        {/* Menu déroulant */}
        <Menu
          id="file-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>
            New... <Typography variant="body2" sx={{ marginLeft: 'auto' }}>Ctrl+N</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            New Tab <Typography variant="body2" sx={{ marginLeft: 'auto' }}>Ctrl+T</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            New Runner Tab <Typography variant="body2" sx={{ marginLeft: 'auto' }}>Ctrl+Shift+R</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            New Postman Window <Typography variant="body2" sx={{ marginLeft: 'auto' }}>Ctrl+Shift+N</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            Import... <Typography variant="body2" sx={{ marginLeft: 'auto' }}>Ctrl+O</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            Settings <Typography variant="body2" sx={{ marginLeft: 'auto' }}>Ctrl+,</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            Close Window <Typography variant="body2" sx={{ marginLeft: 'auto' }}>Ctrl+Shift+W</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            Close Tab <Typography variant="body2" sx={{ marginLeft: 'auto' }}>Ctrl+W</Typography>
          </MenuItem>
          <MenuItem onClick={handleMenuClose}>
            Force Close Tab <Typography variant="body2" sx={{ marginLeft: 'auto' }}>Alt+Ctrl+W</Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleMenuClose}>
            Exit
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default MyToolbar;
