const mongoose = require("mongoose");
const Joi = require("joi");

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  day: {
    type: Number,
    required: true,
    min: 1,
    max: 31,
  },
  month: {
    type: Number,
    required: true,
    min: 1,
    max: 12,
  },
  year: {
    type: Number,
    required: true,
    min: 1,
  },
  description: {
    type: String,
    max: 1000,
  },
  startTime: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(v); // HH:MM format validation
      },
      message: (props) =>
        `${props.value} is not a valid start time! Please use HH:MM format.`,
    },
  },
  endTime: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/.test(v); // HH:MM format validation
      },
      message: (props) =>
        `${props.value} is not a valid end time! Please use HH:MM format.`,
    },
  },
});

const Event = new mongoose.model("Event", eventSchema);

function validateEvent(event) {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().max(1000),
    day: Joi.number().integer().min(1).max(31).required(),
    month: Joi.number().integer().min(1).max(12).required(),
    year: Joi.number().integer().min(1).required(),
    startTime: Joi.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/), // Matches HH:MM format (24-hour)
    endTime: Joi.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/), // Matches HH:MM format (24-hour)
  });

  return schema.validate(event);
}

exports.Event = Event;
exports.validate = validateEvent;
