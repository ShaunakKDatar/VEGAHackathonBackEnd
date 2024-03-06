const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAlumni: {
    type: Boolean,
    default: false,
  },
  email: {
    type: String,
    required: true,
  },
  college: {
    type: String,
    required: true,
  },
});

// Method to generate auth token
userSchema.methods.getAuthToken = function () {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      isAlumni: user.isAlumni,
      email: user.email,
      college: user.college,
    },
    "secret_ecom"
  );
  return token;
};

const AlumniUser = mongoose.model("AlumniUsers", userSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    isAlumni: Joi.boolean(),
    email: Joi.string().email().required(),
    college: Joi.string().required(),
  });

  return schema.validate(user);
}

exports.User = AlumniUser;
exports.validate = validateUser;
