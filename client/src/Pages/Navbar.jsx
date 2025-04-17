import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import logo from "../assets/images/logo.png";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const pages = [
    { label: 'LOGIN', path: '/login' },
    { label: 'SIGNUP', path: '/signup' },
    { label: 'ADMIN LOGIN', path: '/agentLogin' },
    { label: 'CONTACT US', path: '/contact' },
  ];

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
 
  return (
   <>

<AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Desktop view: Image logo on the left */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              mr: 2,
            }}
            component="a"
            href="#app-bar-with-responsive-menu"
          >
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                height: 60,
              }}
            />
          </Box>

          {/* Desktop view: Navigation pages in the center 1 */}
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'center',
            }}
          >
            {pages.map((page) => (
              <Button
                key={page.label}
                onClick={()=>{
                  handleCloseNavMenu();
                  navigate(page.path)
      
                }}
                sx={{mx: 4,  my: 2, color: 'white', display: 'block' }}
              >
                {page.label}
              </Button>
            ))}
          </Box>

          {/* Desktop view: Text logo on the right */}
          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              ml: 2,
            }}
            component="a"
            href="#app-bar-with-responsive-menu"
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              APSRTC
            </Typography>
          </Box>

          {/* Mobile view: Menu button on the left */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
            >
              {pages.map((page) => (
                <MenuItem key={page.label} 
                 onClick={()=>{
                  handleCloseNavMenu();
                  navigate(page.path)
                 }}
              
              >
                  <Typography textAlign="center">{page.label}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Mobile view: Text logo on the right */}
          <Box
            sx={{
              display: { xs: 'flex', md: 'none' },
              alignItems: 'center',
              ml: 'auto',
            }}
            component="a"
            href="#app-bar-with-responsive-menu"
          >
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'white',
                textDecoration: 'none',
              }}
            >
              APSRTC
            </Typography>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>

   </>
  )
}

export default Navbar



