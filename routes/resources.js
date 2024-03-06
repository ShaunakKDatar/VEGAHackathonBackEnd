const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const { Resource, validateResource } = require("../models/resources");

// Route to Get All Resources
router.get("/", async (req, res) => {
  try {
    const resources = await Resource.find();
    res.send(resources);
  } catch (error) {
    console.error("Error fetching resources:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

// Route to Create a New Resource
router.post("/", auth, async (req, res) => {
  try {
    // Validate the request body
    const { error } = validateResource(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Create a new resource object
    const resource = new Resource({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      link: req.body.link,
      postedBy: req.user._id,
      tags: req.body.tags, // Use the user's ID from the token
    });

    // Save the new resource to the database
    await resource.save();

    res.status(201).send(resource);
  } catch (error) {
    console.error("Error creating resource:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

// Routes for updating and deleting resources remain unchanged...

module.exports = router;
