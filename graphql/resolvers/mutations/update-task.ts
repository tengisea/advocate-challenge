import { MutationResolvers, UpdateTaskInput } from "@/generated";
import { Task } from "@/models"

export const updateTask: MutationResolvers["updateTask"] = async (
  _: unknown,
  { id, input }: { id: string; input: UpdateTaskInput }
) => {
  const task = await Task.findByIdAndUpdate(id, input, { new: true });
  if (!task) {
    throw new Error("Task not found");
  }
  return {
    success: true,
    message: "Task updated successfully",
  };
};