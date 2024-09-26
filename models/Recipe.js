const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    ingredients: {  // Updated from 'company' to 'ingredients'
        type: String, // Using String to store comma-separated values
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
});

const Recipe = mongoose.model('Recipe', recipeSchema);
module.exports = Recipe;
