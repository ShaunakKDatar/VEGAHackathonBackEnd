const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { StudentUser, validate } = require("../models/studentUser");

// Route to Get Current User
router.get("/me", auth, async (req, res) => {
  try {
    // Find the current user by ID and exclude the password field
    const user = await StudentUser.findById(req.user._id).select("-password");
    res.send(user);
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

// Route to Create a New User
router.post("/", async (req, res) => {
  try {
    // Validate the request body
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if the user already exists
    let user = await StudentUser.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists");

    // Create a new user object
    user = new StudentUser(_.pick(req.body, ["username", "email", "password"]));

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save the new user to the database
    await user.save();

    // Generate an authentication token
    const token = user.generateAuthToken();

    // Send the token in the response header along with selected user details
    res.header("X-auth-token", token).send(_.pick(user, ["username", "email"]));
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

module.exports = router;