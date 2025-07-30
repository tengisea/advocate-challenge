import mongoose from "mongoose";

export interface Task {
  taskName: string;
  description: string;
  isDone: boolean;
  priority: number;
  tags: string[];
  userId: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const taskSchema = new mongoose.Schema<Task>(
  {
    taskName: { type: String, required: true },
    description: { type: String, required: true },
    isDone: { type: Boolean, default: false },
    priority: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
      default: 1,
    },
    tags: { type: [String], default: [] },
    userId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", taskSchema);
