// routes/reviews.js
const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Route to handle submitting a review
router.post('/submit-review', async (req, res) => {
  const { name, review } = req.body;

  try {
    const newReview = new Review({ name, review });
    await newReview.save();
    res.redirect('/'); // Redirect to the home page or reviews page after submission
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).send("Error saving review");
  }
});

// Export the router
module.exports = router;
