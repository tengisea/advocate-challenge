import { gql } from "graphql-tag";

export const typeDefs = gql`
  type SuccessResponse {
    success: Boolean!
    message: String!
  }

  type Task {
    taskId: ID
    taskName: String!
    description: String!
    isDone: Boolean
    priority: Int!
    tags: [String!]
    createdAt: String!
    updatedAt: String!
    userId: String!
  }

  input TaskInput {
    taskName: String!
    description: String!
    priority: Int!
    tags: [String!]
    userId: String!
  }

  input UpdateTaskInput {
    taskName: String
    description: String
    isDone: Boolean
    priority: Int
    tags: [String!]
  }

  type Query {
    getAllTasks: [Task!]!
    getFinishedTaskList(isDone: Boolean!): [Task!]!
  }

  type Mutation {
    addTask(input: TaskInput!): SuccessResponse!
    updateTask(taskId: ID!, input: UpdateTaskInput!): SuccessResponse!
  }
`;
