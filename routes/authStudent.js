const express = require("express");
const bcrypt = require("bcrypt");
const { StudentUser, TPOUser, AlumniUser } = require("../models/user"); // Update this path based on your actual model locations
const Joi = require("joi");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.status(400).send("Invalid email or password");

  // Check if the user is a Student
  let user = await StudentUser.findOne({ email: req.body.email });
  let userType = "Student";

  // If not a Student, check if the user is a TPO
  if (!user) {
    user = await TPOUser.findOne({ email: req.body.email });
    userType = "TPO";
  }

  // If not a TPO, check if the user is an Alumni
  if (!user) {
    user = await AlumniUser.findOne({ email: req.body.email });
    userType = "Alumni";
  }

  if (!user) return res.status(400).send("Invalid email or password");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();

  res.send({ token, userType });
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(req);
}

module.exports = router;
