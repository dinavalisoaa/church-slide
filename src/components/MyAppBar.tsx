import React, { useState } from 'react'
import { AppBar, IconButton, Toolbar, Typography, Button, TextField, InputAdornment } from '@mui/material'
import { Menu } from '@mui/icons-material'
import { Search as SearchIcon } from '@mui/icons-material';

const MyAppBar = ({ onToggleSidebar }) => {
  const [searchQuery, setSearchQuery] = useState(''); // État pour la valeur du champ de recherche

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Searching for:', searchQuery); // Vous pouvez ici faire une recherche ou rediriger
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: '#222' }}>
      <Toolbar>
        <IconButton edge="start" color="inherit" onClick={onToggleSidebar} sx={{ mr: 2 }}>
          <Menu />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Toolpad-Like App
        </Typography>
         {/* Formulaire de recherche */}
         <form onSubmit={handleSearchSubmit}>
          <TextField
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search..."
            variant="outlined"
            size="small"
            sx={{
              backgroundColor: 'white',
              borderRadius: 1,
              marginLeft: 2,
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
        </form>
        <Button color="inherit">Log Out</Button>
      </Toolbar>
    </AppBar>
  )
}

export default MyAppBar
