const mongoose = require("mongoose");
const Joi = require("joi");

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  date: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

const Announcement = mongoose.model("Announcement", announcementSchema);

function validateAnnouncement(announcement) {
  const schema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string(),
  });

  return schema.validate(announcement);
}

module.exports.Announcement = Announcement;
module.exports.validateAnnouncement = validateAnnouncement;
