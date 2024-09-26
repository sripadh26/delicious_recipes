require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const recipeRoutes = require('./routes/recipes');
const aboutRoutes = require('./routes/about');
const reviewRoutes = require('./routes/reviews');

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files from the public directory
app.set('view engine', 'ejs');

// Homepage Route
app.get('/', (req, res) => {
    res.render('index'); // Render index.ejs for the homepage
});

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.error('MongoDB connection error:', err));
  
app.use('/', reviewRoutes);
// Use routes
app.use('/recipes', recipeRoutes);
app.use('/', aboutRoutes); // Include the about routes

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
