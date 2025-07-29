import mongoose from "mongoose";

export interface Task {
  title: string;
  description: string;
  completed: boolean;
}

const taskSchema = new mongoose.Schema<Task>(
  {
    title: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
