import { QueryResolvers } from "@/generated";
import { Task } from "@/models";

export const getAllTasks: QueryResolvers["getAllTasks"] = async () => {
  const tasks = await Task.find();
  return tasks;
};