import { AppBar, Toolbar, Typography, IconButton, Badge } from '@mui/material';
import { Favorite, Brightness4, Brightness7 } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';

function Navigation({ darkMode, toggleDarkMode }) {
  const { wishlist } = useWishlist();

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Typography
          variant="h6"
          component={Link}
          to="/"
          sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}
        >
          Car Finder
        </Typography>
        <IconButton
          component={Link}
          to="/wishlist"
          color="inherit"
          sx={{ mr: 2 }}
        >
          <Badge badgeContent={wishlist.length} color="error">
            <Favorite />
          </Badge>
        </IconButton>
        <IconButton onClick={toggleDarkMode} color="inherit">
          {darkMode ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;