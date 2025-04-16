import React from 'react';
import { Box, Typography, Button, IconButton, Stack, Link, Fade } from '@mui/material';
import { Facebook, Instagram, Twitter, LinkedIn, ArrowUpward } from '@mui/icons-material';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Fade in={true} timeout={1200}>
      <Box
        sx={{
          background: 'linear-gradient(to right, #141e30, #243b55)',
          color: '#f1f1f1',
          mt: 8,
          px: 4,
          pt: 6,
          pb: 4,
          fontFamily: 'Poppins, sans-serif',
          boxShadow: '0px -2px 10px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            rowGap: 4,
          }}
        >
          {/* About Section */}
          <Box sx={{ maxWidth: 300 }}>
            <Typography
              variant="h6"
              sx={{
                mb: 1,
                fontWeight: 'bold',
                borderBottom: '2px solid #00c6ff',
                display: 'inline-block',
              }}
            >
            Explore With Us
            </Typography>
            <Typography variant="body2" sx={{ lineHeight: 1.8 }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis ipsum corporis, incidunt aperiam, consectetur distinctio rerum nulla blanditiis excepturi, totam veritatis eum aliquam. Magni molestiae, sint expedita sed quia eum.
            </Typography>
          </Box>

          {/* Links Section */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                mb: 1,
                fontWeight: 'bold',
                borderBottom: '2px solid #00c6ff',
                display: 'inline-block',
              }}
            >
              Quick Links
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', p: 0, m: 0, lineHeight: 2 }}>
              <li><Link href="/" color="inherit" underline="hover">Home</Link></li>
              <li><Link href="/contact" color="inherit" underline="hover">Contact</Link></li>
              <li><Link href="/login" color="inherit" underline="hover">Login</Link></li>
              <li><Link href="/signup" color="inherit" underline="hover">Signup</Link></li>
            </Box>
          </Box>

          {/* Social Section */}
          <Box>
            <Typography
              variant="h6"
              sx={{
                mb: 1,
                fontWeight: 'bold',
                borderBottom: '2px solid #00c6ff',
                display: 'inline-block',
              }}
            >
              Connect With Us
            </Typography>
            <Stack direction="row" spacing={2} mt={1}>
              {[Facebook, Instagram, Twitter, LinkedIn].map((Icon, i) => (
                <IconButton
                  key={i}
                  sx={{
                    color: 'white',
                    transition: '0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.3)',
                      color: '#00c6ff',
                      boxShadow: '0 0 8px #00c6ff',
                    },
                  }}
                >
                  <Icon />
                </IconButton>
              ))}
            </Stack>
          </Box>
        </Box>

        {/* Divider & Bottom Section */}
        <Box sx={{ mt: 5, pt: 2, borderTop: '1px solid #444', textAlign: 'center' }}>
          <Typography variant="body2" sx={{ mb: 1, fontSize: 14 }}>
            © {new Date().getFullYear()} Explore | All rights reserved.
          </Typography>
          <Button
            variant="outlined"
            endIcon={<ArrowUpward />}
            onClick={scrollToTop}
            sx={{
              color: '#00c6ff',
              borderColor: '#00c6ff',
              transition: '0.3s',
              '&:hover': {
                background: '#00c6ff',
                color: '#141e30',
                borderColor: '#00c6ff',
                transform: 'translateY(-2px)',
              },
            }}
          >
            Back to Top
          </Button>
        </Box>
      </Box>
    </Fade>
  );
};

export default Footer;
