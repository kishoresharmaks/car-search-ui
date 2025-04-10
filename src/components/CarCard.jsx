import { Card, CardContent, CardMedia, Typography, IconButton, Box, styled } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useWishlist } from '../context/WishlistContext';
import { formatIndianPrice } from '../data/cars';

const GlassCard = styled(Card)(({ theme }) => ({
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.02))'
    : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.7))',
  backdropFilter: 'blur(20px)',
  borderRadius: '24px',
  border: `1px solid ${theme.palette.mode === 'dark'
    ? 'rgba(255, 255, 255, 0.1)'
    : 'rgba(255, 255, 255, 0.7)'}`,
  boxShadow: theme.palette.mode === 'dark'
    ? '0 8px 32px rgba(0, 0, 0, 0.3)'
    : '0 8px 32px rgba(31, 38, 135, 0.15)',
  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
  transform: 'perspective(1000px) rotateX(0deg)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
  overflow: 'hidden',
  cursor: 'pointer',
  '&:hover': {
    transform: 'perspective(1000px) rotateX(5deg) translateY(-5px)',
    boxShadow: theme.palette.mode === 'dark'
      ? '0 20px 40px rgba(0, 0, 0, 0.4)'
      : '0 20px 40px rgba(31, 38, 135, 0.2)',
    '& .MuiCardMedia-root': {
      transform: 'scale(1.1)',
    },
    '& .wishlist-button': {
      opacity: 1,
      transform: 'scale(1)',
    },
    '&::before': {
      opacity: 1,
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0) 100%)',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
    zIndex: 1,
  },
}));

const StyledCardMedia = styled(CardMedia)({
  height: 200,
  transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
});

const PriceTag = styled(Typography)(({ theme }) => ({
  position: 'absolute',
  top: 160,
  right: 0,
  background: theme.palette.mode === 'dark'
    ? 'linear-gradient(90deg, rgba(144, 202, 249, 0.9) 0%, rgba(100, 181, 246, 0.9) 100%)'
    : 'linear-gradient(90deg, rgba(25, 118, 210, 0.9) 0%, rgba(33, 150, 243, 0.9) 100%)',
  color: theme.palette.mode === 'dark' ? '#000' : '#fff',
  padding: '8px 16px',
  borderTopLeftRadius: '16px',
  borderBottomLeftRadius: '16px',
  fontWeight: 'bold',
  backdropFilter: 'blur(5px)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
  zIndex: 2,
}));

const WishlistButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: 8,
  right: 8,
  backgroundColor: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.15)'
    : 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(5px)',
  opacity: 0.9,
  transform: 'scale(0.9)',
  transition: 'all 0.3s ease',
  zIndex: 2,
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, 0.25)'
      : 'rgba(255, 255, 255, 0.95)',
  },
  '& .MuiSvgIcon-root': {
    color: theme.palette.mode === 'dark'
      ? theme.palette.primary.light
      : theme.palette.primary.main,
    filter: theme.palette.mode === 'dark'
      ? 'drop-shadow(0 0 2px rgba(255,255,255,0.5))'
      : 'none',
  },
}));

function CarCard({ car, onClick }) {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const isInWishlist = wishlist.some((item) => item.id === car.id);

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    if (isInWishlist) {
      removeFromWishlist(car.id);
    } else {
      addToWishlist(car);
    }
  };

  return (
    <GlassCard onClick={onClick}>
      <Box sx={{ position: 'relative' }}>
        <StyledCardMedia
          component="img"
          image={car.image}
          alt={`${car.brand} ${car.model}`}
        />
        <WishlistButton
          className="wishlist-button"
          onClick={handleWishlistToggle}
          size="large"
        >
          {isInWishlist ? <Favorite /> : <FavoriteBorder />}
        </WishlistButton>
        <PriceTag variant="h6">
          {formatIndianPrice(car.price)}
        </PriceTag>
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h5" gutterBottom sx={{ 
          fontWeight: 'bold',
          background: theme => theme.palette.mode === 'dark'
            ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
            : 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          textShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          {car.brand} {car.model}
        </Typography>
        <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
          <Typography variant="body1" sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'text.secondary'
          }}>
            <span role="img" aria-label="fuel">⛽</span>
            Fuel Type: {car.fuelType}
          </Typography>
          <Typography variant="body1" sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: 'text.secondary'
          }}>
            <span role="img" aria-label="seats">💺</span>
            Seats: {car.seatingCapacity}
          </Typography>
        </Box>
      </CardContent>
    </GlassCard>
  );
}

export default CarCard;