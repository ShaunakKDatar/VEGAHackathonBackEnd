const express = require("express");
const router = express.Router();
const { Event, validate } = require("../models/events");
const auth = require("../middleware/auth");
const c = require("config");

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.json({ data: events });
  } catch (ex) {
    console.error("Error fetching events:", ex);
    res.status(500).send("An unexpected error occurred.");
  }
});

router.post("/", auth, async (req, res) => {
  if (!req.user.isTPO) {
    return res.send("Access Denied. Only TPO can create events.");
  }
  console.log(req.user, "user", req.body);
  try {
    console.log(req.user, "user", req.body);
    
    console.log(req.body);
    if (!req.user.isTPO) {
      return res.status(403).send("Access Denied. Only TPO can create events.");
    }

    // const { error } = validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    // Check if a similar event already exists
    const existingEvent = await Event.findOne({
      title: req.body.title,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      studentUserId: req.user.id,
    });

    if (existingEvent) {
      return res.status(400).send("A similar event already exists.");
    }
    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      studentUserId: req.user.id,
    });

    await event.save();

    res.send(event);
  } catch (ex) {
    console.error("Error creating event:", ex);
    res.status(500).send("An unexpected error occurred.");
  }
});

router.put("/:id", async (req, res) => {
  // Validate the request body
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const event = await Event.findById(req.params.id);
    if (!event)
      return res.status(404).send("The event with the given ID was not found.");

    event.title = req.body.title;
    event.description = req.body.description;
    event.startDate = req.body.startDate;
    event.endDate = req.body.endDate;

    await event.save();
    res.send(event);
  } catch (ex) {
    // If an error occurs during the process, handle it
    console.error("Error creating or updating event:", ex);
    res.status(500).send("An unexpected error occurred.");
  }
});

router.delete("/:id", async (req, res) => {
  const event = await Event.findByIdAndDelete(req.params.id);

  if (!event)
    return res.status(404).send("The event with the given ID was not found.");

  res.send(event);
});

router.get("/:id", async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event)
      return res.status(404).send("The event with the given ID was not found.");

    res.send(event);
  } catch (ex) {
    console.error("Error fetching event by ID:", ex);
    res.status(500).send("An unexpected error occurred.");
  }
});

module.exports = router;
