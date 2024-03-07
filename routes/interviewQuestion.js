const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const {
  InterviewQuestion,
  validateQuestion,
} = require("../models/interviewQuestion");
const { Company } = require("../models/company");

router.get("/", async (req, res) => {
  try {
    const questions = await InterviewQuestion.find();
    res.send(questions);
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const { error } = validateQuestion(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const interviewQuestion = new InterviewQuestion({
      title: req.body.title,
      question: req.body.question,
      answer: req.body.answer,
      companyId: req.body.companyId,
    });
    await interviewQuestion.save();

    res.send(interviewQuestion);
  } catch (error) {
    console.error("Error creating question:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

module.exports = router;
