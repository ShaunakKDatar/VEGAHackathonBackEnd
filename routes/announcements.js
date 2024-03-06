const express = require("express");
const router = express.Router();
const {
  Announcement,
  validateAnnouncement,
} = require("../models/announcement");

// Get all announcements
router.get("/", async (req, res) => {
  try {
    const announcements = await Announcement.find();
    res.send(announcements);
  } catch (error) {
    console.error("Error fetching announcements:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

// Create a new announcement
router.post("/", async (req, res) => {
  // Validate the request body
  const { error } = validateAnnouncement(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const announcement = new Announcement({
      title: req.body.title,
      description: req.body.description, // Add description field
    });
    await announcement.save();
    res.send(announcement);
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

module.exports = router;
