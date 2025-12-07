import mongoose from "mongoose";

const quizSchema = new mongoose.Schema(
  {
    _id: String,
    courseId: { type: String, required: true },
    title: { type: String, required: true },
    description: String,
    quizType: {
      type: String,
      enum: ["Graded Quiz", "Practice Quiz", "Graded Survey", "Ungraded Survey"],
      default: "Graded Quiz"
    },
    points: { type: Number, default: 0 },
    assignmentGroup: { type: String, default: "Quizzes" },
    shuffleAnswers: { type: Boolean, default: true },
    timeLimit: { type: Number, default: 20 },
    multipleAttempts: { type: Boolean, default: false },
    numberOfAttempts: { type: Number, default: 1 },
    showCorrectAnswers: {
      type: String,
      enum: ["immediately", "after_last_attempt", "after_due_date", "never"],
      default: "immediately"
    },
    accessCode: String,
    oneQuestionAtATime: { type: Boolean, default: true },
    webcamRequired: { type: Boolean, default: false },
    lockQuestionsAfterAnswering: { type: Boolean, default: false },
    dueDate: { type: Date, required: true },
    availableDate: { type: Date, required: true },
    availableUntilDate: { type: Date, required: true },
    numberOfQuestions: { type: Number, default: 0 },
    published: { type: Boolean, default: false }
  },
  { collection: "quizzes" }
);

export default quizSchema;