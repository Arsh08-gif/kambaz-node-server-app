import mongoose from "mongoose";

const quizAttemptSchema = new mongoose.Schema(
  {
    _id: String,
    quizId: { type: String, required: true },
    userId: { type: String, required: true },
    courseId: String,
    attemptNumber: { type: Number, required: true },
    score: { type: Number, default: 0 },
    answers: [
      {
        questionId: { type: String, required: true },
        answer: mongoose.Schema.Types.Mixed,
        isCorrect: { type: Boolean, default: false },
        pointsEarned: { type: Number, default: 0 }
      }
    ],
    startedAt: { type: Date, default: Date.now },
    submittedAt: Date,
    timeSpent: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["in_progress", "submitted"],
      default: "in_progress"
    }
  },
  { collection: "quizAttempts" }
);

export default quizAttemptSchema;