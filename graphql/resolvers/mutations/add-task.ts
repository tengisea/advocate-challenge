import { TaskInput } from "@/generated";
import { Task } from "@/models";

export default async function addTask(
  _: unknown,
  { input }: { input: TaskInput }
) {
  const { taskName, description, priority, tags, userId } = input;

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

  const task = await Task.create({
    taskName: taskName,
    description: description,
    isDone: false,
    priority: priority,
    tags: tags,
    userId: userId,
  });

  return {
    success: true,
    message: "Task added successfully",
  };
}
