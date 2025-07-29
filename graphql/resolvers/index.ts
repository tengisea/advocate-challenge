import { addTask } from "./mutations/add-task";
import { updateTask } from "./mutations/update-task";
import { getAllTasks } from "./queries/get-all-tasks";
import { getFinishedTaskList } from "./queries/get-finished-tasks";

export const resolvers = {
  Query: {
    getAllTasks,
    getFinishedTaskList,
  },
  Mutation: {
    addTask,
    updateTask,
  },
};
