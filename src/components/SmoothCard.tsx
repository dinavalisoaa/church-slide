import React from 'react';
import { Card, CardContent, CardMedia, Typography, CardActionArea, Box, IconButton } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export interface SmoothCardProps {
  title: string;
  description: string;
  imageUrl: string;
  onClick: () => void; // Fonction à exécuter au clic
}

const SmoothCard: React.FC<SmoothCardProps> = ({ title, description, imageUrl, onClick }) => {
  return (
    <Card
      sx={{
        maxWidth: 345,
        borderRadius: 2,
        boxShadow: 3,
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: 6,
        },
      }}
    >
      <CardActionArea onClick={onClick}>
        <CardMedia
          component="img"
          height="140"
          image={imageUrl}
          alt={title}
          sx={{ borderTopLeftRadius: 2, borderTopRightRadius: 2 }}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            {description}
          </Typography>
          {/* Flèche Chevron à la fin */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              More Details
            </Typography>
            <IconButton>
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default SmoothCard;
