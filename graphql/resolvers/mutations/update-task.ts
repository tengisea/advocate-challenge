import { UpdateTaskInput } from "@/generated";
import { Task } from "@/models";

export default async function updateTask(
  _: unknown,
  { taskId, input }: { taskId: string; input: UpdateTaskInput }
) {
  const { priority, taskName, description, tags } = input;

  if (
    priority !== undefined &&
    priority !== null &&
    (priority < 1 || priority > 5)
  ) {
    return {
      success: false,
      message: "Priority must be between 1 and 5",
    };
  }

  if (description && taskName && description === taskName) {
    return {
      success: false,
      message: "Description cannot be the same as task name",
    };
  }

  if (tags && tags.length > 5) {
    return {
      success: false,
      message: "Tags cannot be more than 5 items",
    };
  }

  const existingTask = await Task.findOne({
    taskName,
    userId: (await Task.findById(taskId))?.userId,
  });

  if (existingTask) {
    return {
      success: false,
      message: "Task name must be unique per user",
    };
  }

  const task = await Task.findByIdAndUpdate(taskId, input, { new: true });
  if (!task) {
    throw new Error("Task not found");
  }
  return {
    success: true,
    message: "Task updated successfully",
  };
}
