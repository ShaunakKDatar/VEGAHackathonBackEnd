const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

// Login route
router.post("/login", async (req, res) => {
  try {
    // Get the login credentials from the request body
    const { email, password } = req.body;

    // Find the user by email
    const user = await User.findOne({ email });

    // If user not found or password doesn't match, return an error
    if (!user || !user.comparePassword(password)) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign(
      {
        user: {
          id: user.id,
        },
      },
      "secret_ecom"
    );

    // Return the token as response
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Signup route
router.post("/signup", async (req, res) => {
  try {
    // Get the signup data from the request body
    console.log(req.body);
    const { name, email, password, college, role } = req.body;
    console.log(req.body);

    // Create a new user
    const user = new User({ username: name, email, password, college, role });
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save the user to the database
    await user.save();

    // Generate a JWT token for authentication
    const token = user.generateAuthToken();
    res.header("X-auth-token", token).send(_.pick(user, ["name", "email"]));

    // Return the token as response
    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Get user by ID route
router.get("/user/:id", async (req, res) => {
  try {
    // Get the user ID from the request parameters
    const { id } = req.params;

    // Find the user by ID
    const user = await User.findById(id);

    // If user not found, return an error
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return the user info as response
    res.json({ success: true, user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
