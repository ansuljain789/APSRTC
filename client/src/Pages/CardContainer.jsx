import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';

// Import your image
import Img1 from '../assets/images/beach.jpg';
import Img2 from '../assets/images/Mountain.avif';
import Img3 from '../assets/images/City.avif';
import Img4 from '../assets/images/Forest.avif';

const cardData = [
  {
    title: 'Beautiful Beach',
    image: Img1,
    description: 'Experience the serene beauty of crystal clear waters and soft sandy shores. Perfect for relaxation and photography lovers. Bring your sunscreen!',
  },
  {
    title: 'Mountain Adventure',
    image: Img2,
    description: 'Explore breathtaking heights and adventure-filled trails with stunning views. Ideal for hikers, campers, and nature enthusiasts looking for peace.',
  },
  {
    title: 'City Lights',
    image: Img3,
    description: 'Feel the vibrant energy of the city that never sleeps and its sparkling lights. Best for night owls and urban photographers.',
  },
  {
    title: 'Forest Escape',
    image: Img4,
    description: 'Take a break and reconnect with nature in peaceful forest landscapes. Great for long walks, meditation, and family picnics.',
  },
];

const BasicCard = ({ title, image, description, onReadMore }) => {
  return (
    <Card sx={{ maxWidth: 280, borderRadius: 4, boxShadow: 4 }}>
      <CardMedia
        component="img"
        height="150"
        image={image}
        alt={title}
      />
      <CardContent>
        <Typography gutterBottom variant="h6" component="div" fontWeight="bold">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description.length > 100 ? description.slice(0, 100) + '...' : description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" sx={{ fontWeight: 'bold', color: '#1976d2' }} onClick={onReadMore}>
          Read More
        </Button>
      </CardActions>
    </Card>
  );
};

export default function CardContainer() {
  const [open, setOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);

  const handleReadMore = (card) => {
    setSelectedCard(card);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedCard(null);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3, backgroundColor: '#f9fafb' }}>
      <Typography variant="h4" align="center" sx={{ mb: 4, color: '#1976d2', fontWeight: 'bold' }}>
        Discover Places
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <BasicCard
              title={card.title}
              image={card.image}
              description={card.description}
              onReadMore={() => handleReadMore(card)}
            />
          </Grid>
        ))}
      </Grid>

      {/* Read More Modal */}
      <Dialog open={open} onClose={handleClose}>
        {selectedCard && (
          <>
            <DialogTitle>{selectedCard.title}</DialogTitle>
            <DialogContent>
              <img
                src={selectedCard.image}
                alt={selectedCard.title}
                style={{ width: '100%', borderRadius: 10, marginBottom: 15 }}
              />
              <Typography variant="body1" color="text.secondary">
                {selectedCard.description}
              </Typography>
            </DialogContent>
          </>
        )}
      </Dialog>
    </Box>
  );
}
