import mongoose from "mongoose";

const assignmentSchema = new mongoose.Schema(
  {
    _id: String,
    title: String,
    course: { type: String, ref: "CourseModel" },
    description: String,
    points: { type: Number, default: 100 },
    available_date: Date,
    due_date: Date,
    until: Date
  },
  { collection: "assignments" }
);

export default assignmentSchema;