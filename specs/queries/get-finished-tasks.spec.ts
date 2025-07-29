import { QueryResolvers } from "@/generated";
import { Task } from "@/models";

export const getFinishedTaskList: QueryResolvers["getFinishedTaskList"] = async (
  _: unknown,
  { completed }: { completed: boolean }
) => {
  const tasks = await Task.find({ completed });
  return tasks || [];
};
