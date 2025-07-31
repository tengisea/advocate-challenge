import addTask from "@/graphql/resolvers/mutations/add-task";
import { Task } from "@/models";

jest.mock("../../models/task.models", () => ({
  Task: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

describe("addTask", () => {
  const validInput = {
    taskName: "Task 1",
    description: "This is a valid description",
    priority: 3,
    tags: ["tag1", "tag2"],
    userId: "user123",
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("1. should return error if description is too short", async () => {
    const result = await addTask(
      {},
      { input: { ...validInput, description: "short" } }
    );
    expect(result).toEqual({
      success: false,
      message: "Description must be at least 10 characters long",
    });
  });

  it("2. should return error if priority is invalid", async () => {
    const result = await addTask(
      {},
      { input: { ...validInput, priority: 10 } }
    );
    expect(result).toEqual({
      success: false,
      message: "Priority must be between 1 and 5",
    });
  });

  it("3. should return error if description equals taskName", async () => {
    const result = await addTask(
      {},
      { input: { ...validInput, taskName: "My Task", description: "My Task" } }
    );
    expect(result).toEqual({
      success: false,
      message: "Description cannot be the same as task name",
    });
  });

  it("4. should return error if tags are more than 5", async () => {
    const result = await addTask(
      {},
      {
        input: { ...validInput, tags: ["a", "b", "c", "d", "e", "f"] },
      }
    );
    expect(result).toEqual({
      success: false,
      message: "Tags cannot be more than 5 items",
    });
  });

  it("5. should return error if task name already exists", async () => {
    (Task.findOne as jest.Mock).mockResolvedValue({ _id: "123" });
    const result = await addTask({}, { input: validInput });
    expect(result).toEqual({
      success: false,
      message: "Task name must be unique per user",
    });
  });

  it("6. should create task successfully", async () => {
    (Task.findOne as jest.Mock).mockResolvedValue(null);
    (Task.create as jest.Mock).mockResolvedValue({ _id: "abc" });

    const result = await addTask({}, { input: validInput });
    expect(Task.create).toHaveBeenCalledWith({
      taskName: "Task 1",
      description: "This is a valid description",
      isDone: false,
      priority: 3,
      tags: ["tag1", "tag2"],
      userId: "user123",
    });
    expect(result).toEqual({
      success: true,
      message: "Task added successfully",
    });
  });
});
