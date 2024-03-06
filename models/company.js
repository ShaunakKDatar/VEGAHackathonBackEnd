const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  website: {
    type: String,
    required: true,
  },
  contactPerson: {
    type: String,
    required: true,
  },
  contactEmail: {
    type: String,
    required: true,
  },
  contactPhone: {
    type: String,
    required: true,
  },
  placementDate: {
    type: Date,
    required: true,
  },
  jobProfiles: {
    type: [String],
    required: true,
  },
  eligibilityCriteria: {
    type: String,
    required: true,
  },
  additionalInfo: {
    type: String,
  },
});

const Company = mongoose.model("Company", companySchema);

const Joi = require("joi");

function validateCompany(company) {
  const schema = Joi.object({
    name: Joi.string().required(),
    industry: Joi.string().required(),
    location: Joi.string().required(),
    website: Joi.string().uri().required(),
    contactPerson: Joi.string().required(),
    contactEmail: Joi.string().email().required(),
    contactPhone: Joi.string().required(),
    placementDate: Joi.date().iso().required(),
    jobProfiles: Joi.array().items(Joi.string()).required(),
    eligibilityCriteria: Joi.string().required(),
    additionalInfo: Joi.string(),
  });

  return schema.validate(company);
}

module.exports = validateCompany;

module.exports = Company;
