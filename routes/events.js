const express = require("express");
const router = express.Router();
const { Event, validate } = require("../models/events");

router.get("/", async (req, res) => {
  try {
    const events = await Event.find();
    res.send(events);
  } catch (ex) {
    console.error("Error fetching events:", ex);
    res.status(500).send("An unexpected error occurred.");
  }
});

router.post("/", async (req, res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const event = new Event({
      title: req.body.title,
      description: req.body.description,
      day: req.body.day,
      month: req.body.month,
      year: req.body.year,
      startTime: req.body.startTime,
      endTime: req.body.endTime,
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
    const event = Events.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        description: req.body.description,
        day: req.body.day,
        month: req.body.month,
        year: req.body.year,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
      },
      { new: true }
    );
    if (!event)
      return res.status(404).send("The event with the given ID was not found.");
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
