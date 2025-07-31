import getAllTasks from "@/graphql/resolvers/queries/get-all-tasks";
import { Task } from "@/models";

jest.mock("../../models/task.models", () => ({
  Task: {
    find: jest.fn(),
  },
}));

describe("getAllTasks", () => {
  it("1. should return formatted tasks", async () => {
    (Task.find as jest.Mock).mockResolvedValue([
      {
        _id: "task123",
        taskName: "Test",
        description: "Test Desc",
        isDone: false,
        priority: 3,
        tags: ["tag1"],
        createdAt: new Date("2023-01-01"),
        updatedAt: new Date("2023-01-02"),
        userId: "user1",
      },
    ]);

    const result = await getAllTasks();
    expect(result).toEqual([
      {
        taskId: "task123",
        taskName: "Test",
        description: "Test Desc",
        isDone: false,
        priority: 3,
        tags: ["tag1"],
        createdAt: "2023-01-01T00:00:00.000Z",
        updatedAt: "2023-01-02T00:00:00.000Z",
        userId: "user1",
      },
    ]);
  });
});
