const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
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

userSchema.methods.generateAuthToken = function () {
  const token = jwt.sign(
    {
      user: {
        id: user.id,
        role: user.role,
      },
    },
    "secret_ecom"
  );
  return token;
};

function validateUser(user) {
  const schema = Joi.object({
    username: Joi.string().required(),
    role: Joi.string().required(),
    password: Joi.string().required(),
    email: Joi.string().email().required(),
    college: Joi.string().required(),
  });

  return schema.validate(user);
}

const User = mongoose.model("User", userSchema);

exports.User = User;
exports.getAuthToken = this.getAuthToken;
exports.validate = validateUser;
