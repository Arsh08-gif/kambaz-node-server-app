import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: { type: String, ref: "CourseModel" },
    description: String,
    points: { type: Number, default: 100 },
    available_date: String,
    due_date: String,
    until: String
  },
  { collection: "assignments" }
);

export default assignmentSchema;