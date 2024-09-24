const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/database'); // Import your connection logic
const User = require('./models/User');
const Address = require('./models/Address');

const app = express();

// Connect to MongoDB Atlas
connectDB();

// Middleware to parse request body
app.use(bodyParser.json());

// Route to handle form submission
app.post('/submit', async (req, res) => {
  const { name, address } = req.body;

  try {
    // Create a new user
    const user = new User({ name });
    await user.save();

    // Create a new address associated with the user
    const newAddress = new Address({ address, user: user._id });
    await newAddress.save();

    // Add the address to the user's addresses array
    user.addresses.push(newAddress._id);
    await user.save();

    res.status(201).send({ user, address: newAddress });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).send('Error storing data');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
