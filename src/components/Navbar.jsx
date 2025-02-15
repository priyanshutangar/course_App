import { useState, useEffect } from 'react';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import { AppBar, Box, Container, Typography, Button } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledAppBar = styled(AppBar)({
  background: 'rgba(30, 27, 75, 0.95)',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
  position: 'fixed',
  transition: 'all 0.3s ease',
  '&.scrolled': {
    background: 'rgba(99, 102, 241, 0.95)',
  },
});

const NavButton = styled(Button)({
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: '-100%',
    width: '100%',
    height: '100%',
    background: 'rgba(255, 255, 255, 0.2)',
    transition: 'transform 0.3s ease',
    transform: 'skewX(-15deg)',
  },
  '&:hover::before': {
    transform: 'skewX(-15deg) translateX(100%)',
  },
});

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <StyledAppBar className={scrolled ? 'scrolled' : ''}>
      <Container>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            py: 2,
          }}
        >
          <Typography
            variant="h5"
            component={RouterLink}
            to="/"
            sx={{
              fontWeight: 700,
              background: 'linear-gradient(45deg, #fff 30%, #a5b4fc 90%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textDecoration: 'none',
              letterSpacing: '1px',
            }}
          >
            EduVerse
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2 }}>
            <NavButton
              component={RouterLink}
              to="/"
              className="nav-link"
              sx={{
                borderBottom: location.pathname === '/' ? '2px solid white' : 'none',
              }}
            >
              Explore Courses
            </NavButton>
            <NavButton
              component={RouterLink}
              to="/dashboard"
              className="nav-link"
              sx={{
                borderBottom: location.pathname === '/dashboard' ? '2px solid white' : 'none',
              }}
            >
              My Learning
            </NavButton>
          </Box>
        </Box>
      </Container>
    </StyledAppBar>
  );
}

export default Navbar;