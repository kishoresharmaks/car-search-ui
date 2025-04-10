import { 
  Dialog, 
  DialogContent, 
  DialogTitle, 
  IconButton, 
  Typography, 
  Box, 
  Grid,
  useTheme,
  styled
} from '@mui/material';
import { Close, Speed, LocalGasStation, EventSeat, AttachMoney } from '@mui/icons-material';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: '16px',
    background: theme.palette.mode === 'dark' 
      ? 'rgba(18, 18, 18, 0.95)'
      : 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(10px)',
    border: `1px solid ${theme.palette.mode === 'dark' 
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)'}`,
  }
}));

const FeatureBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  padding: theme.spacing(2),
  borderRadius: '12px',
  background: theme.palette.mode === 'dark' 
    ? 'rgba(255, 255, 255, 0.05)'
    : 'rgba(0, 0, 0, 0.05)',
}));

function CarDetailsModal({ car, open, onClose }) {
  const theme = useTheme();

  if (!car) return null;

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle sx={{ 
        m: 0, 
        p: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Typography variant="h5" component="div" sx={{ 
          fontWeight: 'bold',
          background: theme.palette.mode === 'dark'
            ? 'linear-gradient(45deg, #90caf9 30%, #64b5f6 90%)'
            : 'linear-gradient(45deg, #1976d2 30%, #2196f3 90%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          {car.brand} {car.model}
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent dividers>
        <Box sx={{ position: 'relative', mb: 3 }}>
          <img
            src={car.image}
            alt={`${car.brand} ${car.model}`}
            style={{
              width: '100%',
              height: '300px',
              objectFit: 'cover',
              borderRadius: '12px',
            }}
          />
        </Box>

        <Grid container spacing={2} sx={{ mb: 3 }}>
          <Grid item xs={6} sm={3}>
            <FeatureBox>
             
              <Typography>₹{car.price.toLocaleString()}</Typography>
            </FeatureBox>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FeatureBox>
              <LocalGasStation color="primary" />
              <Typography>{car.fuelType}</Typography>
            </FeatureBox>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FeatureBox>
              <EventSeat color="primary" />
              <Typography>{car.seatingCapacity} Seats</Typography>
            </FeatureBox>
          </Grid>
          <Grid item xs={6} sm={3}>
            <FeatureBox>
              <Speed color="primary" />
              <Typography>Automatic</Typography>
            </FeatureBox>
          </Grid>
        </Grid>

        <Typography variant="h6" gutterBottom color="primary">
          Description
        </Typography>
        <Typography variant="body1" paragraph>
          Experience luxury and performance with the {car.brand} {car.model}. 
          This {car.fuelType.toLowerCase()} vehicle offers comfortable seating for {car.seatingCapacity} passengers, 
          making it perfect for both family trips and daily commutes.
        </Typography>
      </DialogContent>
    </StyledDialog>
  );
}

export default CarDetailsModal;