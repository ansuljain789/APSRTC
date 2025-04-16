import React, { useState } from 'react';
import background from '../assets/images/background.png';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const MainPage = () => {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');

  const handleClear = () => {
    setFrom('');
    setTo('');
  };

  const handleSearch = () => {
    // Implement your search logic here
    console.log('Searching bus from:', from, 'to:', to);
  };

  return (
    <div
      style={{
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100vw',
        height: '100vh',
        position: 'relative'
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          padding: 4,
          borderRadius: 2,
          width: { xs: '90%', sm: '400px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 2,
          zIndex: 2,
        }}
      >
        <Typography variant="h4" sx={{ color: 'white' }}>
          Bus Search
        </Typography>
        <TextField
          fullWidth
          label="From"
          variant="outlined"
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          sx={{ backgroundColor: 'white' }}
          InputLabelProps={{
            style: { fontWeight: 'bold' },
          }}
        />
        <TextField
          fullWidth
          label="To"
          variant="outlined"
          value={to}
          onChange={(e) => setTo(e.target.value)}
          sx={{ backgroundColor: 'white' }}
          InputLabelProps={{
            style: { fontWeight: 'bold' },
          }}
        />
        <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
          <Button variant="contained" color="error" fullWidth onClick={handleClear}>
            Clear
          </Button>
          <Button variant="contained" color="primary" fullWidth onClick={handleSearch}>
            Search
          </Button>
        </Box>
      </Box>
    </div>
  );
};

export default MainPage;