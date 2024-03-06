const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { AlumniUser, validate } = require("../models/alumniUser");

// Route to Get Current Alumni User
router.get("/me", auth, async (req, res) => {
  try {
    // Find the current Alumni user by ID and exclude the password field
    const user = await AlumniUser.findById(req.user._id).select("-password");
    res.send(user);
  } catch (error) {
    console.error("Error fetching current Alumni user:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

// Route to Create a New Alumni User
router.post("/", async (req, res) => {
  try {
    // Validate the request body
    const { error } = await validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the user already exists
    let user = await AlumniUser.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists");

    // Create a new Alumni user object
    user = new AlumniUser(_.pick(req.body, ["name", "email", "password"]));

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save the new Alumni user to the database
    await user.save();

    // Generate an authentication token
    const token = user.generateAuthToken();

    // Send the token in the response header along with selected user details
    res.header("X-auth-token", token).send(_.pick(user, ["name", "email"]));
  } catch (error) {
    console.error("Error creating Alumni user:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

module.exports = router;
