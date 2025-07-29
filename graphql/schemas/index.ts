import { gql } from "graphql-tag";

export const typeDefs = gql`
  type SuccessResponse {
    success: Boolean!
    message: String!
  }

  type Task {
    id: ID
    title: String!
    description: String!
    completed: Boolean
  }

  input TaskInput {
    title: String!
    description: String!
    completed: Boolean
  }

  input UpdateTaskInput {
    title: String
    description: String
    completed: Boolean
  }

  type Query {
    getAllTasks: [Task!]!
    getFinishedTaskList(completed: Boolean!): [Task!]!
  }

  type Mutation {
    addTask(input: TaskInput!): SuccessResponse!
    updateTask(id: ID!, input: UpdateTaskInput!): SuccessResponse!
  }
`;
