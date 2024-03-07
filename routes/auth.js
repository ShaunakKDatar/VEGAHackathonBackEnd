const express = require("express");
const bcrypt = require("bcrypt");
const { TPOUser } = require("../models/tpoUser");
const { AlumniUser } = require("../models/alumniUser");
const { StudentUser } = require("../models/studentUser");
// Update this path based on your actual model locations
const Joi = require("joi");
const router = express.Router();

router.post("/", async (req, res) => {
  const { error } = validate(req.body);
  if (error) return res.send("Invalid email or password");

  // Check if the user is a Student
  console.log("sjsjs", req.body);
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

  if (!user) return res.json({success:false,message:"Invalid email or password"});

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) return res.json({success:false,message:"Invalid email or password"});

  const token = user.generateAuthToken();

  res.json({success:true, token, userType });
});

function validate(req) {
  const schema = Joi.object({
    email: Joi.string().min(5).max(255).required().email(),
    password: Joi.string().min(5).max(1024).required(),
  });
  return schema.validate(req);
}

module.exports = router;
