import getFinishedTaskList from "@/graphql/resolvers/queries/get-finished-tasks";
import { Task } from "@/models";

jest.mock("../../models/task.models", () => ({
  Task: {
    find: jest.fn(),
  },
}));

describe("getFinishedTaskList", () => {
  const mockTasks = [
    {
      _id: "task123",
      taskName: "Test Task",
      description: "Test description",
      isDone: true,
      priority: 3,
      tags: ["work", "urgent"],
      createdAt: new Date("2023-01-01T00:00:00Z"),
      updatedAt: new Date("2023-01-02T00:00:00Z"),
      userId: "user123",
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should return finished tasks when isDone is true", async () => {
    (Task.find as jest.Mock).mockResolvedValue(mockTasks);

    const result = await getFinishedTaskList(undefined, { isDone: true });

    expect(Task.find).toHaveBeenCalledWith({ isDone: true });
    expect(result).toEqual([
      {
        taskId: "task123",
        taskName: "Test Task",
        description: "Test description",
        isDone: true,
        priority: 3,
        tags: ["work", "urgent"],
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-02T00:00:00.000Z",
        userId: "user123",
      },
    ]);
  });

  it("should return empty array if no tasks are found", async () => {
    (Task.find as jest.Mock).mockResolvedValue([]);

    const result = await getFinishedTaskList(undefined, { isDone: false });

    expect(Task.find).toHaveBeenCalledWith({ isDone: false });
    expect(result).toEqual([]);
  });
});
