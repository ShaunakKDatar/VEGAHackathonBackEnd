const mongoose = require("mongoose");
const Joi = require("joi");

const resourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  category: {
    type: String,
    required: true,
  },
  link: {
    type: String,
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AlumniUser", // Reference to the AlumniUser schema
  },
  postedAt: {
    type: Date,
    default: Date.now,
  },
  tags: {
    type: [String],
  },
});

const Resource = mongoose.model("Resource", resourceSchema);

function validateResource(resource) {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
    category: Joi.string().required(),
    link: Joi.string(),
    postedBy: Joi.string(),
    postedAt: Joi.date(),
    tags: Joi.array().items(Joi.string()),
  });

  return schema.validate(resource);
}

module.exports.Resource = Resource;
module.exports.validateResource = validateResource;
