const mongoose = require("mongoose");
const Joi = require("joi");
const Schema = mongoose.Schema;

const interviewQuestionSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: true,
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    required: true,
  },
});

const InterviewQuestion = mongoose.model(
  "InterviewQuestion",
  interviewQuestionSchema
);

function validateQuestion(question) {
  const schema = Joi.object({
    title: Joi.string().required(),
    question: Joi.string().required(),
    answer: Joi.string().required(),
    companyId: Joi.string().required(), // Assuming companyId is a string representing ObjectId
  });

  return schema.validate(question);
}

module.exports.InterviewQuestion = InterviewQuestion;
module.exports.validateQuestion = validateQuestion;
