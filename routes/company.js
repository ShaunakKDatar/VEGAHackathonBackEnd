const express = require("express");
const router = express.Router();
const Company = require("../models/comapny");
const auth = require("../middleware/auth");

// Create a New Company
router.post("/", auth, async (req, res) => {
  try {
    if (!req.user.isTPO) {
      return res
        .status(403)
        .send("Access Denied. Only TPO can create announcements.");
    }

    const company = new Company(req.body);
    await company.save();
    res.status(201).send(company);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get All Companies
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.send(companies);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a Single Company by ID
router.get("/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) {
      return res.status(404).send("Company not found");
    }
    res.send(company);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a Company by ID
router.put("/:id", auth, async (req, res) => {
  try {
    if (!req.user.isTPO) {
      return res
        .status(403)
        .send("Access Denied. Only TPO can create announcements.");
    }
    const company = await Company.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!company) {
      return res.status(404).send("Company not found");
    }
    res.send(company);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a Company by ID
router.delete("/:id", auth, async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) {
      return res.status(404).send("Company not found");
    }
    res.send(company);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
