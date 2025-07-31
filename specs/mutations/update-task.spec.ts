import updateTask from "@/graphql/resolvers/mutations/update-task";
import { Task } from "@/models";

jest.mock("../../models/task.models", () => ({
  Task: {
    findById: jest.fn(),
    findByIdAndUpdate: jest.fn(),
    findOne: jest.fn(),
  },
}));

describe("updateTask", () => {
  const validInput = {
    priority: 3,
    taskName: "Updated Task",
    description: "Updated description",
    tags: ["urgent", "home"],
  };

  const mockUserId = "user123";
  const mockTaskId = "task123";

  beforeEach(() => {
    jest.clearAllMocks();
    (Task.findById as jest.Mock).mockResolvedValue({ userId: mockUserId });
    (Task.findOne as jest.Mock).mockResolvedValue(null);
    (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue(true);
  });

  it("1. should return error if priority is out of range", async () => {
    const result = await updateTask(null, {
      taskId: mockTaskId,
      input: { ...validInput, priority: 6 },
    });

    expect(result).toEqual({
      success: false,
      message: "Priority must be between 1 and 5",
    });
  });

  it("2. should return error if description equals task name", async () => {
    const result = await updateTask(null, {
      taskId: mockTaskId,
      input: { ...validInput, description: "Updated Task" },
    });

    expect(result).toEqual({
      success: false,
      message: "Description cannot be the same as task name",
    });
  });

  it("3. should return error if more than 5 tags are given", async () => {
    const result = await updateTask(null, {
      taskId: mockTaskId,
      input: { ...validInput, tags: ["1", "2", "3", "4", "5", "6"] },
    });

    expect(result).toEqual({
      success: false,
      message: "Tags cannot be more than 5 items",
    });
  });

  it("4. should return error if task name is not unique for user", async () => {
    (Task.findOne as jest.Mock).mockResolvedValue({
      taskName: "Duplicate Task",
    });

    const result = await updateTask(null, {
      taskId: mockTaskId,
      input: validInput,
    });

    expect(result).toEqual({
      success: false,
      message: "Task name must be unique per user",
    });
  });

  it("5. should return error if task is not found", async () => {
    (Task.findByIdAndUpdate as jest.Mock).mockResolvedValue(null);

    const result = await updateTask(null, {
      taskId: mockTaskId,
      input: validInput,
    });

    expect(result).toEqual({
      success: false,
      message: "Task not found",
    });
  });

  it("6. should update task successfully", async () => {
    const result = await updateTask(null, {
      taskId: mockTaskId,
      input: validInput,
    });

    expect(result).toEqual({
      success: true,
      message: "Task updated successfully",
    });
  });
});
