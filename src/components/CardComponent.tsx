// CardComponent.js
import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
const CardComponent = () => {
  return (
    <Card
    id=''
      sx={{
        backgroundImage: `url("https://www.gstatic.com/images/icons/material/apps/fonts/1x/catalog/v5/noto/noto_read_and_write_text_dark.jpg=w600" )`,
        borderRadius: '16px',
        width: '100%',
        gap:'10px',
        height: '200px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
        position: 'relative',
        boxShadow: 3,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6,
        },
      }}
    >
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
        </Typography>
      </CardContent>
      <Box
        component="img"
        src="/content-to-cards.png" // Remplacez avec le chemin de votre icône
        alt="Icon"
        sx={{
          position: 'absolute',
          right: '16px',
          bottom: '16px',
          width: '60px',
          height: '60px',
          opacity: 0.7,
        }}
      />
    </Card>
  );
};
export default CardComponent

