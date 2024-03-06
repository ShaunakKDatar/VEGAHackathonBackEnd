const express = require("express");
const router = express.Router();
const { Opportunity, validateOpportunity } = require("../models/opportunity");
const auth = require("../middleware/auth");

// Route to get all opportunities
router.get("/", async (req, res) => {
  try {
    const opportunities = await Opportunity.find();
    res.send(opportunities);
  } catch (error) {
    console.error("Error fetching opportunities:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

// Route to get a specific opportunity by ID
router.get("/:id", async (req, res) => {
  try {
    const opportunity = await Opportunity.findById(req.params.id);
    if (!opportunity) return res.status(404).send("Opportunity not found.");
    res.send(opportunity);
  } catch (error) {
    console.error("Error fetching opportunity:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

// Route to create a new opportunity
router.post("/", auth, async (req, res) => {
  try {
    if (!req.user.isTPO) {
      return res
        .status(403)
        .send("Access Denied. Only TPO can create announcements.");
    }
    // Validate the request body
    const { error } = validateOpportunity(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Create a new opportunity object
    const opportunity = new Opportunity({
      jobTitle: req.body.jobTitle,
      duration: req.body.duration,
      source: req.body.source,
      place: req.body.place,
      stipend: req.body.stipend,
    });

    // Save the new opportunity to the database
    await opportunity.save();

    res.status(201).send(opportunity);
  } catch (error) {
    console.error("Error creating opportunity:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

module.exports = router;
