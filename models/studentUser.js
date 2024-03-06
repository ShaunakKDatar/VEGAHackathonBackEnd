const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

const studentUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isStudent: {
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
studentUserSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      id: this._id,
      username: this.username,
      isStudent: this.isStudent,
      email: this.email,
      college: this.college,
    },
    "secret_ecom"
  );
  return token;
};

const StudentUser = mongoose.model("StudentUsers", studentUserSchema);

function validateStudentUser(user) {
  const schema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required(),
    isStudent: Joi.boolean(),
    email: Joi.string().email().required(),
    college: Joi.string().required(),
  });

  return schema.validate(user);
}

exports.StudentUser = StudentUser;
exports.validate = validateStudentUser;
