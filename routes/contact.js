const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// Route to handle review submission
router.post('/submit-review', async (req, res) => {
  try {
    const { name, review } = req.body;
    const newReview = new Review({ name, review });
    await newReview.save();
    res.redirect('/contact'); // Redirect back to contact page after submission
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).send("Error saving review");
  }
});

module.exports = router;
