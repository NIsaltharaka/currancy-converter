const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); 

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors()); 
app.use(express.json()); 


app.get('/api/rates', async (req, res) => {
  try {
    const response = await axios.get(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/latest/USD`);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching exchange rates:', error.message);
    res.status(500).json({ message: 'Failed to fetch exchange rates' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🚀`);
});