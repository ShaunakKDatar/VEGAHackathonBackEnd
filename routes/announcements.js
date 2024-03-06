const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  Announcement,
  validateAnnouncement,
} = require("../models/announcements");

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
router.post("/", auth, async (req, res) => {
  try {
    // Check if the authenticated user is a TPO
    if (!req.user.isTPO) {
      return res
        .status(403)
        .send("Access Denied. Only TPO can create announcements.");
    }

    // Validate the request body
    const { error } = validateAnnouncement(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Create the announcement
    const announcement = new Announcement({
      title: req.body.title,
      description: req.body.description,
    });

    // Save the announcement to the database
    await announcement.save();

    // Return the created announcement
    res.send(announcement);
  } catch (error) {
    console.error("Error creating announcement:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

module.exports = router;
