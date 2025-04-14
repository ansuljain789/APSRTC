import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const cardData = [
  {
    title: '',
    word: (<>{'be'}{bull}{'nev'}{bull}{'o'}{bull}{'lent'}</>),
    partOfSpeech: 'adjective',
    description: 'well meaning and kindly.\n"a benevolent smile"',
  },
  {
    title: 'Word of the Day',
    word: (<>{'in'}{bull}{'no'}{bull}{'cent'}</>),
    partOfSpeech: 'adjective',
    description: 'innocent, not guilty.\n"an innocent look"',
  },
  {
    title: 'Word of the Day',
    word: (<>{'ex'}{bull}{'cel'}{bull}{'lent'}</>),
    partOfSpeech: 'adjective',
    description: 'extremely good in quality.\n"an excellent performance"',
  },
  {
    title: 'Word of the Day',
    word: (<>{'de'}{bull}{'ter'}{bull}{'mined'}</>),
    partOfSpeech: 'adjective',
    description: 'having made a firm decision.\n"a determined spirit"',
  },
];

const BasicCard = ({ title, word, partOfSpeech, description }) => {
  const [selected, setSelected] = React.useState(false);
  const handleClick = () => {
    setSelected((prev) => !prev);
  };

  return (
    <Card 
      onClick={handleClick}
      sx={{ 
        minWidth: 275, 
        cursor: 'pointer', 
        transition: '0.3s',
        border: selected ? '2px solid darkblue' : 'none',
        '&:hover': {
          border: '2px solid darkblue'
        }
      }}
    >
      <CardContent>
        <Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
          {title}
        </Typography>
        <Typography variant="h5" component="div">
          {word}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
          {partOfSpeech}
        </Typography>
        <Typography variant="body2">
          {description.split('\n').map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
};

export default function CardContainer() {
  return (
    <Box sx={{ flexGrow: 1, p: 2, backgroundColor: 'white' }}>
      <Typography variant="h3" align="center" sx={{ mb: 4, color: '#2171fc', fontWeight:'bold' }}>
        HOLIDAY
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {cardData.map((card, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <BasicCard 
              title={card.title}
              word={card.word}
              partOfSpeech={card.partOfSpeech}
              description={card.description}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}