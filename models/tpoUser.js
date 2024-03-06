const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const tpoUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isTPO: {
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
tpoUserSchema.methods.getAuthToken = function () {
  const token = jwt.sign(
    {
      id: user._id,
      username: user.username,
      isTPO: user.isTPO,
      email: user.email,
      college: user.college,
    },
    "secret_ecom"
  );
  return token;
};

const TPOUser = mongoose.model("TPOUsers", tpoUserSchema);

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    isTPO: Joi.boolean(),
    email: Joi.string().email().required(),
    college: Joi.string().required(),
  });

  return schema.validate(user);
}

exports.TPOUser = TPOUser;
exports.validate = validateUser;
