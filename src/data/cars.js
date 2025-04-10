export const cars = [
  {
    id: 1,
    brand: "Toyota",
    model: "Camry",
    price: 2800000,
    fuelType: "Hybrid",
    seatingCapacity: 5,
    image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500",
  },
  {
    id: 2,
    brand: "Tesla",
    model: "Model 3",
    price: 3600000,
    fuelType: "Electric",
    seatingCapacity: 5,
    image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=500",
  },
  {
    id: 3,
    brand: "BMW",
    model: "X5",
    price: 5200000,
    fuelType: "Petrol",
    seatingCapacity: 7,
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500",
  },
  {
    id: 4,
    brand: "Honda",
    model: "CR-V",
    price: 2560000,
    fuelType: "Hybrid",
    seatingCapacity: 5,
    image: "https://images.unsplash.com/photo-1606611013016-969c19ba27bb?w=500",
  },
  {
    id: 5,
    brand: "Mercedes",
    model: "E-Class",
    price: 6300000,
    fuelType: "Diesel",
    seatingCapacity: 5,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500",
  },
  {
    id: 6,
    brand: "Audi",
    model: "Q7",
    price: 7500000,
    fuelType: "Diesel",
    seatingCapacity: 7,
    image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=500",
  },
  {
    id: 7,
    brand: "Lexus",
    model: "RX",
    price: 4800000,
    fuelType: "Hybrid",
    seatingCapacity: 5,
    image: "https://images.unsplash.com/photo-1619767886558-efdc259b6e09?w=500",
  },
  {
    id: 8,
    brand: "Porsche",
    model: "Taycan",
    price: 7800000,
    fuelType: "Electric",
    seatingCapacity: 5,
    image: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=500",
  },
  {
    id: 9,
    brand: "Volvo",
    model: "XC90",
    price: 5900000,
    fuelType: "Hybrid",
    seatingCapacity: 7,
    image: "https://images.unsplash.com/photo-1619971774259-c90d36ff3339?w=500",
  },
  {
    id: 10,
    brand: "Jaguar",
    model: "F-PACE",
    price: 5500000,
    fuelType: "Petrol",
    seatingCapacity: 5,
    image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=500",
  },
  {
    id: 11,
    brand: "Land Rover",
    model: "Range Rover",
    price: 7900000,
    fuelType: "Diesel",
    seatingCapacity: 5,
    image: "https://images.unsplash.com/photo-1606220838315-056192d5e927?w=500",
  },
  {
    id: 12,
    brand: "Tesla",
    model: "Model S",
    price: 6800000,
    fuelType: "Electric",
    seatingCapacity: 5,
    image: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=500",
  }
];

export const fuelTypes = ["Petrol", "Diesel", "Electric", "Hybrid"];

export const brands = [...new Set(cars.map(car => car.brand))];

export const priceRanges = [
  { label: "Under ₹25L", min: 0, max: 2500000 },
  { label: "₹25L - ₹35L", min: 2500000, max: 3500000 },
  { label: "₹35L - ₹50L", min: 3500000, max: 5000000 },
  { label: "₹50L - ₹70L", min: 5000000, max: 7000000 },
  { label: "Above ₹70L", min: 7000000, max: 10000000 }
];

export const formatIndianPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};