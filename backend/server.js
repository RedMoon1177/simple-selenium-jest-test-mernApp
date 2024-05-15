const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json()); // Parse JSON bodies
app.use(cors({
  origin: 'http://localhost:3000',
}));

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/my-mern-app', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a schema for your MongoDB model
const valueSchema = new mongoose.Schema({
  value: String,
});
const Value = mongoose.model('Value', valueSchema);

// Define routes
app.get('/', (req, res) => {
  res.send('Hello from Express Backend!');
});

// Route to handle POST request to save a new value
app.post('/submit', async (req, res) => {
  try {
    const { value } = req.body;
    const newValue = new Value({ value });
    await newValue.save();
    res.status(201).json({ message: 'Value saved successfully' });
  } catch (error) {
    console.error('Error saving value:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to get all values stored in MongoDB
app.get('/values', async (req, res) => {
  try {
    const allValues = await Value.find(); // Retrieve all values from MongoDB
    res.status(200).json(allValues);
  } catch (error) {
    console.error('Error fetching values:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
