import { TaskInput } from "@/generated";
import { Task } from "@/models";
import { GraphQLError } from "graphql";

export default async function addTask(
  _: unknown,
  { input }: { input: TaskInput }
) {
  const task = await Task.create({
    taskName: input.taskName,
    description: input.description,
    isDone: false,
    priority: input.priority,
    tags: input.tags,
    userId: input.userId,
  });
  try {
    const { taskName, description, priority, tags, userId } = task;

    if (description === taskName) {
      return {
        success: false,
        message: "Description cannot be the same as task name",
      };
    }

    if (description.length < 10) {
      return {
        success: false,
        message: "Description must be at least 10 characters long",
      };
    }

    if (!priority || priority < 1 || priority > 5) {
      return {
        success: false,
        message: "Priority must be between 1 and 5",
      };
    }

    if (tags && tags.length > 5) {
      return {
        success: false,
        message: "Tags cannot be more than 5 items",
      };
    }

    const existingTask = await Task.findOne({ taskName, userId });
    if (existingTask) {
      return {
        success: false,
        message: "Task name must be unique per user",
      };
    }

    return {
      success: true,
      message: "Task added successfully",
    };
  } catch (error) {
    throw new GraphQLError("Failed to add task. Please try again.");
  }
}
