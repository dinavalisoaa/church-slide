import React, { useState } from 'react';
import { Container, Grid, TextField, Box } from '@mui/material';
import SmoothCard, { SmoothCardProps } from './SmoothCard';

const SearchableDashboard: React.FC = () => {
  // Exemple de données de cartes
  const cardsData: SmoothCardProps[] = [
    {
      title: 'Beautiful Landscape',
      description: 'A breathtaking view of the mountains.',
      imageUrl: 'https://via.placeholder.com/300.png/09f/fff',
      onClick: () => alert('Navigating to Beautiful Landscape Details'),
    },
    {
      title: 'Urban City',
      description: 'A vibrant city with skyscrapers and busy streets.',
      imageUrl: 'https://via.placeholder.com/300.png/09f/fff',
      onClick: () => alert('Navigating to Urban City Details'),
    },
    {
      title: 'Beach Paradise',
      description: 'A relaxing view of the beach with golden sands.',
      imageUrl: 'https://via.placeholder.com/300.png/09f/fff',
      onClick: () => alert('Navigating to Beach Paradise Details'),
    },
    {
      title: 'Forest Escape',
      description: 'A calm walk through a lush green forest.',
      imageUrl: 'https://via.placeholder.com/300.png/09f/fff',
      onClick: () => alert('Navigating to Forest Escape Details'),
    },
  ];

  // L'état pour la recherche
  const [searchTerm, setSearchTerm] = useState('');

  // Filtrage des cartes en fonction du terme de recherche
  const filteredCards = cardsData.filter(card =>
    card.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container sx={{ marginTop: '64px' }}>
      {/* Barre de recherche */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          label="Search for a card"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>

      {/* Grid de cartes */}
      <Grid container spacing={3}>
        {filteredCards.map((card, index) => (
          <Grid item xs={12} sm={6} md={4} key={index}>
            <SmoothCard {...card} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SearchableDashboard;
