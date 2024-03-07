const mongoose = require("mongoose");
const Joi = require("joi");

const eventSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endDate: {
    type: Date,
  },
  description: {
    type: String,
    max: 1000,
  },
  studentUserId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudentUsers",
    required: true,
  },
});

const Event = new mongoose.model("Event", eventSchema);

function validateEvent(event) {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().max(1000),
    startTime: Joi.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/), // Matches HH:MM format (24-hour)
    endTime: Joi.string().regex(/^([01]\d|2[0-3]):?([0-5]\d)$/),
    studentUserId: Joi.string().required(), // Matches HH:MM format (24-hour)
  });

  return schema.validate(event);
}

exports.Event = Event;
exports.validate = validateEvent;
