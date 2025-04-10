import { useState, useMemo } from 'react';
import { Container, Grid, Typography, Pagination, Box, useTheme } from '@mui/material';
import CarCard from '../components/CarCard';
import FilterPanel from '../components/FilterPanel';
import CarDetailsModal from '../components/CarDetailsModal';
import { cars } from '../data/cars';

function Home() {
  const theme = useTheme();
  const [filters, setFilters] = useState({
    search: '',
    priceRange: null,
    priceRangeIndex: '',
    fuelType: '',
    brand: '',
    seats: 0,
  });

  const [page, setPage] = useState(1);
  const [selectedCar, setSelectedCar] = useState(null);
  const carsPerPage = 10;

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const searchTerm = filters.search?.toLowerCase() || '';
      const matchesSearch = !searchTerm || 
        car.brand.toLowerCase().includes(searchTerm) ||
        car.model.toLowerCase().includes(searchTerm);
      
      const matchesBrand = !filters.brand || car.brand === filters.brand;
      
      const matchesPrice = !filters.priceRange || 
        (car.price >= filters.priceRange[0] && car.price <= filters.priceRange[1]);
      
      const matchesFuelType = !filters.fuelType || car.fuelType === filters.fuelType;
      const matchesSeats = !filters.seats || car.seatingCapacity === filters.seats;
      
      return matchesSearch && matchesPrice && matchesFuelType && matchesSeats && matchesBrand;
    });
  }, [filters]);

  const paginatedCars = useMemo(() => {
    const startIndex = (page - 1) * carsPerPage;
    return filteredCars.slice(startIndex, startIndex + carsPerPage);
  }, [filteredCars, page]);

  const pageCount = Math.ceil(filteredCars.length / carsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCarClick = (car) => {
    setSelectedCar(car);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 6 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        textAlign: 'center',
        mb: 4,
        fontWeight: 'bold',
        background: theme.palette.mode === 'dark'
          ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
          : 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent'
      }}>
        Find Your Perfect Car
      </Typography>
      
      <Box sx={{ mb: 4 }}>
        <FilterPanel filters={filters} setFilters={setFilters} />
      </Box>
      
      <Grid container spacing={3}>
        {paginatedCars.map((car) => (
          <Grid item key={car.id} xs={12} sm={6} md={4}>
            <CarCard car={car} onClick={() => handleCarClick(car)} />
          </Grid>
        ))}
        {filteredCars.length === 0 && (
          <Grid item xs={12}>
            <Typography variant="body1" color="text.secondary" textAlign="center">
              No cars match your filters
            </Typography>
          </Grid>
        )}
      </Grid>
      
      {pageCount > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination 
            count={pageCount} 
            page={page} 
            onChange={handlePageChange}
            color="primary"
            size="large"
            sx={{
              '& .MuiPaginationItem-root': {
                background: theme.palette.mode === 'dark'
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(0, 0, 0, 0.05)',
                backdropFilter: 'blur(10px)',
                '&:hover': {
                  background: theme.palette.mode === 'dark'
                    ? 'rgba(255, 255, 255, 0.1)'
                    : 'rgba(0, 0, 0, 0.1)',
                }
              }
            }}
          />
        </Box>
      )}

      <CarDetailsModal 
        car={selectedCar}
        open={Boolean(selectedCar)}
        onClose={() => setSelectedCar(null)}
      />
    </Container>
  );
}

export default Home;