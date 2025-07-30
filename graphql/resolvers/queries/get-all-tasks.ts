import { Task } from "@/models";

export default async function getAllTasks() {
  const tasks = await Task.find();
  return tasks.map((task) => ({
    taskId: task._id.toString(),
    taskName: task.taskName,
    description: task.description,
    isDone: task.isDone,
    priority: task.priority,
    tags: task.tags,
    createdAt: task.createdAt?.toISOString() || new Date().toISOString(),
    updatedAt: task.updatedAt?.toISOString() || new Date().toISOString(),
    userId: task.userId,
  }));
};
