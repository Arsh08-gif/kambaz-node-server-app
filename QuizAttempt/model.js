import mongoose from "mongoose";
import schema from "./schema.js";

const quizAttemptModel = mongoose.model("quizAttempts", schema);
export default quizAttemptModel;