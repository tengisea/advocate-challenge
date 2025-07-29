import { MutationResolvers, TaskInput } from "@/generated";
import { Task } from "@/models"

export const addTask: MutationResolvers["addTask"] = async (
  _: unknown,
  { input }: { input: TaskInput }
) => {
  const task = await Task.create({
    title: input.title,
    description: input.description,
    completed: input.completed || false,
  });
  return {
    success: true,
    message: "Task added successfully",
  };
};
