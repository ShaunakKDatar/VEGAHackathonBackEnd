const mongoose = require("mongoose");
const Joi = require("joi");

// Define the comment schema
const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  studentUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudentUsers", // Reference to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Define the answer schema
const answerSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  alumniUser: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "AlumniUsers", // Reference to the User model
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
});

// Define the post schema
const chatSchema = new mongoose.Schema({
  mainQuestion: {
    type: String,
    required: true,
  },
  answers: [answerSchema], // Array of answers
  comments: [commentSchema], // Array of comments
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "StudentUsers",
    required: true,
  },
  upvotes: {
    type: Number,
    default: 0,
  },
  downvotes: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the Post model
const Chat = mongoose.model("Chat", chatSchema);

function validateChat(post) {
  const schema = Joi.object({
    mainQuestion: Joi.string().required(),
    answers: Joi.array().items(Joi.string()),
    comments: Joi.array().items(Joi.string()),
    timeOfCreation: Joi.date(),
    upvotes: Joi.number().integer().min(0),
    downvotes: Joi.number().integer().min(0),
  });

  return schema.validate(post);
}

module.exports.Chat = Chat;
module.exports.validateChat = validateChat;
