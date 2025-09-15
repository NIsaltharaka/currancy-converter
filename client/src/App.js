import React, { useState, useEffect } from 'react';
import {
  Container,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  IconButton,
  Typography,
  Box,
  Grid,
  CssBaseline,
} from '@mui/material';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';

function App() {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [rates, setRates] = useState({});
  const [currencyOptions, setCurrencyOptions] = useState([]);
  const [convertedAmount, setConvertedAmount] = useState(0);

  // Fetch exchange rates on initial render
  useEffect(() => {
    const fetchRates = async () => {
      try {
        // NOTE: Replace with your actual API endpoint
        const response = await fetch('http://localhost:5000/api/rates');
        const data = await response.json();
        if (data.result === 'success') {
          setRates(data.conversion_rates);
          setCurrencyOptions([data.base_code, ...Object.keys(data.conversion_rates)]);
          const initialRate = data.conversion_rates[toCurrency];
          setConvertedAmount((amount * initialRate).toFixed(4));
        }
      } catch (error) {
        console.error("Error fetching rates:", error);
        // Handle error state in UI if necessary
      }
    };
    fetchRates();
  }, []); // Empty dependency array means this runs only once on mount

  // Recalculate conversion when dependencies change
  useEffect(() => {
    if (rates && rates[fromCurrency] && rates[toCurrency]) {
      // Perform conversion using the base currency (USD in this API's case)
      const result = (amount / rates[fromCurrency]) * rates[toCurrency];
      setConvertedAmount(result.toFixed(2));
    }
  }, [amount, fromCurrency, toCurrency, rates]);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    // Prevent negative numbers
    setAmount(value < 0 ? 0 : value);
  };

  const handleSwapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5, textAlign: 'center' }}>
      <CssBaseline />
      <Typography variant="h4" component="h1" fontWeight={700} gutterBottom>
        Real-Time Currency Converter
      </Typography>
      <Box elevation={3} sx={{ p: 4, border:"1px solid #cccc", borderRadius: 2 }}>
        <Grid container spacing={2} alignItems="center">
          {/* Amount Input */}
          <Grid item xs={12}>
            <TextField
            size='small'
              label="Amount"
              type="number"
              value={amount}
              onChange={handleAmountChange}
              fullWidth
              InputProps={{ inputProps: { min: 0 } }}
            />
          </Grid>

          {/* From Currency Selector */}
          <Grid item xs={12} sm={5}>
            <FormControl fullWidth>
              <InputLabel>From</InputLabel>
              <Select
              size='small'
                value={fromCurrency}
                label="From"
                onChange={(e) => setFromCurrency(e.target.value)}
              >
                {currencyOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          {/* Swap Button */}
          <Grid item xs={12} sm={2} sx={{ textAlign: 'center' }}>
            <IconButton color="primary" onClick={handleSwapCurrencies}>
              <SwapHorizIcon />
            </IconButton>
          </Grid>

          {/* To Currency Selector */}
          <Grid item xs={12} sm={5}>
            <FormControl fullWidth>
              <InputLabel>To</InputLabel>
              <Select
              size='small'
                value={toCurrency}
                label="To"
                onChange={(e) => setToCurrency(e.target.value)}
              >
                {currencyOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>

        {/* Result Display */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" component="h2">
            Converted Amount:
          </Typography>
          <Typography variant="h4" color="primary" sx={{ fontWeight: 'bold' }}>
            {convertedAmount} {toCurrency}
          </Typography>
        </Box>
      </Box>
      <Typography variant="caption" display="block" sx={{ mt: 2, color: 'text.secondary' }}>
        Rates are updated in real-time.
      </Typography>
    </Container>
  );
}

export default App;