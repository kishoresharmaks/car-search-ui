import { Container, Grid, Typography } from '@mui/material';
import { useWishlist } from '../context/WishlistContext';
import CarCard from '../components/CarCard';

function Wishlist() {
  const { wishlist } = useWishlist();

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        My Wishlist
      </Typography>
      
      <Grid container spacing={3}>
        {wishlist.length === 0 ? (
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              Your wishlist is empty. Add some cars from the home page!
            </Typography>
          </Grid>
        ) : (
          wishlist.map((car) => (
            <Grid item key={car.id} xs={12} sm={6} md={4}>
              <CarCard car={car} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}

export default Wishlist;