const express = require('express');
const router = express.Router();
const Recipe = require('../models/Recipe');

// Get the list of recipes
router.get('/', async (req, res) => {
    try {
        const recipes = await Recipe.find(); // Fetch recipes from the database
        res.render('recipes', { recipes }); // Render recipes.ejs with the fetched recipes
    } catch (error) {
        console.error('Error retrieving recipes:', error);
        res.status(500).send('Error retrieving recipes'); // Send error response
    }
});

// Get the form to add a new recipe
router.get('/add', (req, res) => {
    res.render('addRecipe'); // Render the form to add a recipe
});

// Post a new recipe
router.post('/', async (req, res) => {
    const { title, ingredients, description, image } = req.body; // Destructure fields from request body

    try {
        const recipe = new Recipe({
            title,
            ingredients, // Store ingredients from the form
            description,
            image: image || '/images/default.png' // Use default image if none provided
        });
        await recipe.save(); // Save the new recipe to the database
        res.redirect('/recipes'); // Redirect to the recipe listing page after adding
    } catch (error) {
        console.error('Error adding recipe:', error);
        res.status(500).send('Error adding recipe'); // Send error response
    }
});

// Delete a recipe
router.post('/delete/:id', async (req, res) => {
    const { id } = req.params; // Get recipe ID from URL parameters
    try {
        await Recipe.findByIdAndDelete(id); // Delete the recipe by ID
        res.redirect('/recipes'); // Redirect to the recipe listing page after deletion
    } catch (error) {
        console.error('Error deleting recipe:', error);
        res.status(500).send('Error deleting recipe'); // Send error response
    }
});

module.exports = router; // Export the router for use in the main application
