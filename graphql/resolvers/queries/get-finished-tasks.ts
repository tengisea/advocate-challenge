import { Task } from "@/models";
import { GraphQLError } from "graphql";

export default async function getFinishedTaskList(
  _: unknown,
  { isDone }: { isDone: boolean }
) {
  try {
    const tasks = await Task.find({ isDone: isDone });
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
  } catch (error) {
    throw new GraphQLError("Failed to getFinishedTaskList. Please try again later.")
  }
}
