const auth = require("../middleware/auth");
const express = require("express");
const router = express.Router();
const _ = require("lodash");
const bcrypt = require("bcrypt");
const { TPOUser } = require("../models/tpoUser");
const { AlumniUser } = require("../models/alumniUser");
const { StudentUser, validate } = require("../models/studentUser");

// Route to Get Current User
router.get("/me", auth, async (req, res) => {
  try {
    // Find the current user by ID and exclude the password field
    const user = await StudentUser.findById(req.user.id).select("-password");
    res.json({success:true, data: user});
  } catch (error) {
    console.error("Error fetching current user:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

router.get("/", async (req, res) => {
  try {
    // Fetch all student objects from the database
    const students = await StudentUser.find().select("-password");
    res.send(students);
  } catch (error) {
    console.error("Error fetching students:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

// Route to Create a New User
router.post("/", async (req, res) => {
  try {
    // Validate the request body
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check if email exists in TPO and then Alumni
    let userExists = await TPOUser.findOne({ email: req.body.email });
    if (userExists)
      return res.status(400).send("Email already exists in TPO users");

    userExists = await AlumniUser.findOne({ email: req.body.email });
    if (userExists)
      return res.status(400).send("Email already exists in Alumni users");

    // Check if the user already exists
    let user = await StudentUser.findOne({ email: req.body.email });
    if (user) return res.status(400).send("User already exists");

    // Create a new user object
    user = new StudentUser(
      _.pick(req.body, [
        "username",
        "email",
        "password",
        "isStudent",
        "college",
        "skills",
      ])
    );

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);

    // Save the new user to the database
    await user.save();

    // Generate an authentication token
    const token = user.generateAuthToken();

    // Send the token in the response header along with selected user details
    res.header("X-auth-token", token).json({"success":true,"data":_.pick(user, ["username", "email"]), "token":token});
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

module.exports = router;
