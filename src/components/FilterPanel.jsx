import React, { useEffect, useState } from 'react';
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Paper,
  TextField,
  InputAdornment,
  useTheme,
  alpha,
  Grid,
  IconButton,
  Collapse,
  Button,
  Badge,
  useMediaQuery,
  Divider,
  Chip,
} from '@mui/material';
import {
  Search,
  LocalGasStation,
  AirlineSeatReclineNormal,
  CurrencyRupee,
  DirectionsCar,
  FilterList,
  RestartAlt,
  KeyboardArrowUp,
  KeyboardArrowDown,
  Close,
} from '@mui/icons-material';
import { fuelTypes, brands, priceRanges } from '../data/cars';

function FilterPanel({ filters = {}, setFilters }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState([]);

  // Set default values and track active filters
  useEffect(() => {
    // Set defaults
    setFilters({
      search: '',
      fuelType: '',
      seats: 0,
      brand: '',
      priceRange: null,
      ...filters
    });
    
    // Update active filters
    const newActiveFilters = [];
    if (filters.brand) newActiveFilters.push({ type: 'brand', value: filters.brand });
    if (filters.fuelType) newActiveFilters.push({ type: 'fuelType', value: filters.fuelType });
    if (filters.seats > 0) newActiveFilters.push({ type: 'seats', value: `${filters.seats} Seats` });
    if (filters.priceRange && filters.priceRangeIndex !== undefined) {
      newActiveFilters.push({ 
        type: 'priceRange', 
        value: priceRanges[filters.priceRangeIndex].label 
      });
    }
    setActiveFilters(newActiveFilters);
  }, [filters]);

  // Handlers
  const handleChange = (field, value) => {
    setFilters({ ...filters, [field]: value });
  };

  const handlePriceRangeChange = (event) => {
    const selectedIndex = event.target.value;
    const selectedRange = priceRanges[selectedIndex];
    setFilters({ 
      ...filters, 
      priceRangeIndex: selectedIndex,
      priceRange: selectedIndex ? [selectedRange.min, selectedRange.max] : null 
    });
  };

  const handleResetFilters = () => {
    setFilters({
      search: '',
      fuelType: '',
      seats: 0,
      brand: '',
      priceRange: null,
      priceRangeIndex: '',
    });
    setShowFilters(false);
  };

  const handleRemoveFilter = (filterType) => {
    const updatedFilters = { ...filters };
    
    switch (filterType) {
      case 'brand': updatedFilters.brand = ''; break;
      case 'fuelType': updatedFilters.fuelType = ''; break;
      case 'seats': updatedFilters.seats = 0; break;
      case 'priceRange':
        updatedFilters.priceRange = null;
        updatedFilters.priceRangeIndex = '';
        break;
    }
    
    setFilters(updatedFilters);
  };

  // Common styles
  const selectStyles = {
    borderRadius: '16px',
    background: theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.paper, 0.4)
      : alpha(theme.palette.background.paper, 0.8),
    transition: 'all 0.2s ease',
    '& .MuiSelect-select': { 
      display: 'flex', 
      alignItems: 'center',
      gap: 1,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.mode === 'dark' 
        ? alpha(theme.palette.common.white, 0.15)
        : alpha(theme.palette.common.black, 0.1),
    },
    '&:hover': {
      background: theme.palette.mode === 'dark'
        ? alpha(theme.palette.background.paper, 0.5)
        : alpha(theme.palette.background.paper, 0.95),
    },
    '&.Mui-focused': {
      boxShadow: `0 0 0 2px ${alpha(theme.palette.primary.main, 0.3)}`,
    }
  };

  const menuItemStyles = {
    borderRadius: '8px',
    mx: 1,
    my: 0.5,
    '&:hover': {
      background: alpha(theme.palette.primary.main, 0.1),
    },
    '&.Mui-selected': {
      background: alpha(theme.palette.primary.main, 0.15),
      '&:hover': {
        background: alpha(theme.palette.primary.main, 0.25),
      }
    }
  };

  const inputLabelStyles = {
    color: theme.palette.text.secondary,
    background: theme.palette.mode === 'dark'
      ? alpha(theme.palette.background.default, 0.8)
      : alpha(theme.palette.background.paper, 0.8),
    px: 1,
    ml: -0.5,
    '&.Mui-focused': {
      color: theme.palette.primary.main,
    }
  };

  const menuProps = {
    PaperProps: {
      sx: {
        maxHeight: 300,
        borderRadius: '16px',
        mt: 1,
        boxShadow: `0 8px 20px ${alpha(theme.palette.common.black, 0.2)}`,
      },
    },
  };

  const iconComponent = (props) => (
    <KeyboardArrowDown 
      {...props} 
      sx={{ 
        color: theme.palette.text.secondary, 
        transition: 'transform 0.3s',
        transform: props['aria-expanded'] ? 'rotate(180deg)' : 'rotate(0)',
      }} 
    />
  );

  return (
    <Paper 
      elevation={3}
      sx={{ 
        p: { xs: 2, md: 3 },
        background: `linear-gradient(145deg, 
          ${alpha(theme.palette.background.paper, theme.palette.mode === 'dark' ? 0.9 : 0.95)}, 
          ${alpha(theme.palette.background.default, theme.palette.mode === 'dark' ? 0.7 : 0.85)})`,
        backdropFilter: 'blur(12px)',
        borderRadius: '24px',
        border: `1px solid ${alpha(
          theme.palette.mode === 'dark' ? theme.palette.common.white : theme.palette.common.black, 
          0.08
        )}`,
        transition: 'all 0.35s cubic-bezier(0.25, 0.8, 0.25, 1)',
      }}
    >
      <Grid container spacing={3} alignItems="center">
        {/* Search Field */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Search cars..."
            value={filters.search || ''}
            onChange={(e) => handleChange('search', e.target.value)}
            sx={{
              '& .MuiOutlinedInput-root': {
                borderRadius: '18px',
                background: theme.palette.mode === 'dark'
                  ? alpha(theme.palette.background.paper, 0.4)
                  : alpha(theme.palette.background.paper, 0.8),
                transition: 'all 0.3s',
              }
            }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search color="primary" />
                </InputAdornment>
              ),
              endAdornment: filters.search && (
                <InputAdornment position="end">
                  <IconButton 
                    edge="end" 
                    onClick={() => handleChange('search', '')}
                    size="small"
                  >
                    <Close fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        {/* Filter Buttons */}
        <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
          <Badge 
            badgeContent={activeFilters.length} 
            color="primary"
            invisible={activeFilters.length === 0}
          >
            <Button
              variant={showFilters ? "contained" : "outlined"}
              color={activeFilters.length > 0 ? "primary" : "inherit"}
              onClick={() => setShowFilters(!showFilters)}
              startIcon={<FilterList />}
              endIcon={showFilters ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
              sx={{ borderRadius: '16px', fontWeight: 600, px: 2.5 }}
            >
              Filters
            </Button>
          </Badge>

          {activeFilters.length > 0 && (
            <Button
              variant="outlined"
              color="error"
              onClick={handleResetFilters}
              startIcon={<RestartAlt />}
              sx={{ borderRadius: '16px', fontWeight: 600 }}
            >
              Reset
            </Button>
          )}
        </Grid>
        
        {/* Active Filters */}
        {activeFilters.length > 0 && (
          <Grid item xs={12} sx={{ mt: 1, mb: showFilters ? 1 : 0 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, pt: 1 }}>
              {activeFilters.map((filter, index) => (
                <Chip
                  key={index}
                  label={filter.value}
                  onDelete={() => handleRemoveFilter(filter.type)}
                  color="primary"
                  variant={theme.palette.mode === 'dark' ? 'outlined' : 'filled'}
                  sx={{ borderRadius: '12px', fontWeight: 500 }}
                />
              ))}
            </Box>
          </Grid>
        )}

        {/* Filter Options */}
        <Grid item xs={12}>
          <Collapse in={showFilters}>
            {(activeFilters.length > 0 || filters.search) && (
              <Divider sx={{ my: 2, opacity: 0.6 }} />
            )}
            <Grid container spacing={isMobile ? 2 : 3} sx={{ mt: 0.5 }}>
              {/* Brand Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="brand-label" sx={inputLabelStyles}>Brand</InputLabel>
                  <Select
                    labelId="brand-label"
                    value={filters.brand || ''}
                    label="Brand"
                    onChange={(e) => handleChange('brand', e.target.value)}
                    MenuProps={menuProps}
                    sx={selectStyles}
                    startAdornment={
                      <InputAdornment position="start">
                        <DirectionsCar 
                          sx={{ color: filters.brand ? theme.palette.primary.main : theme.palette.text.secondary }} 
                        />
                      </InputAdornment>
                    }
                    IconComponent={iconComponent}
                  >
                    <MenuItem value="">All Brands</MenuItem>
                    {brands.map((brand) => (
                      <MenuItem key={brand} value={brand} sx={menuItemStyles}>
                        <DirectionsCar sx={{ mr: 1, opacity: 0.7, fontSize: '1.1rem' }} />
                        {brand}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              
              {/* Fuel Type Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="fuel-type-label" sx={inputLabelStyles}>Fuel Type</InputLabel>
                  <Select
                    labelId="fuel-type-label"
                    value={filters.fuelType || ''}
                    label="Fuel Type"
                    onChange={(e) => handleChange('fuelType', e.target.value)}
                    MenuProps={menuProps}
                    sx={selectStyles}
                    startAdornment={
                      <InputAdornment position="start">
                        <LocalGasStation 
                          sx={{ color: filters.fuelType ? theme.palette.primary.main : theme.palette.text.secondary }} 
                        />
                      </InputAdornment>
                    }
                    IconComponent={iconComponent}
                  >
                    <MenuItem value="">All Types</MenuItem>
                    {fuelTypes.map((type) => (
                      <MenuItem key={type} value={type} sx={menuItemStyles}>
                        <LocalGasStation sx={{ mr: 1, opacity: 0.7, fontSize: '1.1rem' }} />
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Price Range Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="price-range-label" sx={inputLabelStyles}>Price Range</InputLabel>
                  <Select
                    labelId="price-range-label"
                    value={filters.priceRangeIndex || ''}
                    label="Price Range"
                    onChange={handlePriceRangeChange}
                    MenuProps={menuProps}
                    sx={selectStyles}
                    startAdornment={
                      <InputAdornment position="start">
                        <CurrencyRupee 
                          sx={{ color: filters.priceRange ? theme.palette.primary.main : theme.palette.text.secondary }} 
                        />
                      </InputAdornment>
                    }
                    IconComponent={iconComponent}
                  >
                    <MenuItem value="">All Prices</MenuItem>
                    {priceRanges.map((range, index) => (
                      <MenuItem key={index} value={index} sx={menuItemStyles}>
                        <CurrencyRupee sx={{ mr: 1, opacity: 0.7, fontSize: '1.1rem' }} />
                        {range.label}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Seats Filter */}
              <Grid item xs={12} sm={6} md={3}>
                <FormControl fullWidth>
                  <InputLabel id="seats-label" sx={inputLabelStyles}>Seats</InputLabel>
                  <Select
                    labelId="seats-label"
                    value={filters.seats || 0}
                    label="Seats"
                    onChange={(e) => handleChange('seats', e.target.value)}
                    MenuProps={menuProps}
                    sx={selectStyles}
                    startAdornment={
                      <InputAdornment position="start">
                        <AirlineSeatReclineNormal 
                          sx={{ color: filters.seats > 0 ? theme.palette.primary.main : theme.palette.text.secondary }} 
                        />
                      </InputAdornment>
                    }
                    IconComponent={iconComponent}
                  >
                    <MenuItem value={0}>Any Seats</MenuItem>
                    {[2, 4, 5, 6, 7, 8].map((seatOption) => (
                      <MenuItem key={seatOption} value={seatOption} sx={menuItemStyles}>
                        <AirlineSeatReclineNormal sx={{ mr: 1, opacity: 0.7, fontSize: '1.1rem' }} />
                        {seatOption} Seats
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Collapse>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default FilterPanel;