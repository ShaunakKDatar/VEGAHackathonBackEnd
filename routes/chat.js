const express = require("express");
const router = express.Router();
const { Chat, validateChat } = require("../models/chat");

// Create a chat
router.post("/", auth, async (req, res) => {
  try {
    if (!req.user.isStudent) {
      return res
        .status(403)
        .send("Access Denied. Only students can create chat questions.");
    }
    const { error } = validateChat(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const chat = new Chat({
      mainQuestion: req.body.mainQuestion,
      createdBy: req.user._id,
    });

    await chat.save();
    res.send(chat);
  } catch (error) {
    console.error("Error creating chat:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

// Update upvotes/downvotes for a chat
router.put("/:id/upvotes", auth, async (req, res) => {
  try {
    if (!req.user.isStudent && !req.user.isAlumni) {
      return res
        .status(403)
        .send(
          "Access Denied. Only students or alumni can upvote a chat question."
        );
    }
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).send("Chat not found.");

    chat.upvotes++;
    await chat.save();

    res.send(chat);
  } catch (error) {
    console.error("Error updating upvotes:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

router.put("/:id/downvotes", auth, async (req, res) => {
  try {
    if (!req.user.isStudent && !req.user.isAlumni) {
      return res
        .status(403)
        .send(
          "Access Denied. Only students or alumni can downvote a chat question."
        );
    }
    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).send("Chat not found.");

    chat.downvotes++;
    await chat.save();

    res.send(chat);
  } catch (error) {
    console.error("Error updating downvotes:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

// Answer a chat
router.post("/:id/answer", auth, async (req, res) => {
  try {
    // Check if the user is an alumni
    if (!req.user.isAlumni) {
      return res
        .status(403)
        .send("Access Denied. Only alumni can answer a chat question.");
    }

    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).send("Chat not found.");

    // Create the answer object with alumni user
    const answer = {
      text: req.body.answer,
      alumniUser: req.user._id,
    };

    chat.answers.push(answer);
    await chat.save();

    res.send(chat);
  } catch (error) {
    console.error("Error answering chat:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

// Add a comment to a chat
router.post("/:id/comment", auth, async (req, res) => {
  try {
    // Check if the user is a student
    if (!req.user.isStudent) {
      return res
        .status(403)
        .send("Access Denied. Only students can add comments to a chat.");
    }

    const chat = await Chat.findById(req.params.id);
    if (!chat) return res.status(404).send("Chat not found.");

    // Create the comment object with student user
    const comment = {
      text: req.body.comment,
      studentUser: req.user._id,
    };

    chat.comments.push(comment);
    await chat.save();

    res.send(chat);
  } catch (error) {
    console.error("Error adding comment:", error);
    res.status(500).send("An unexpected error occurred.");
  }
});

module.exports = router;
