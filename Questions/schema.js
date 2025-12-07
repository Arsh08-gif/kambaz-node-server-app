import mongoose from "mongoose";

const questionSchema = new mongoose.Schema(
  {
    _id: String,
    quizId: { type: String, required: true },
    courseId: String,
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["Multiple Choice", "True/False", "Fill in the Blank"],
      required: true
    },
    points: { type: Number, required: true, default: 1 },
    question: { type: String, required: true },
    choices: [
      {
        text: { type: String, required: true },
        correct: { type: Boolean, default: false }
      }
    ],
    correctAnswer: String,
    order: { type: Number, default: 0 }
  },
  { collection: "questions" }
);

export default questionSchema;