const mongoose = require("mongoose");
const Joi = require("joi");

const opportunitySchema = new mongoose.Schema({
  jobTitle: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  source: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  stipend: {
    type: Number,
    required: true,
  },
  applyBy: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Opportunity = mongoose.model("Opportunity", opportunitySchema);

function validateOpportunity(opportunity) {
  const schema = Joi.object({
    jobTitle: Joi.string().required(),
    duration: Joi.string().required(),
    source: Joi.string().required(),
    place: Joi.string().required(),
    stipend: Joi.number().required(),
  });

  return schema.validate(opportunity);
}

module.exports.Opportunity = Opportunity;
module.exports.validateOpportunity = validateOpportunity;
