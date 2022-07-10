import { gql } from 'apollo-server';

const phaseDef = gql`
  type Phase {
    id: Int
    name: String
    tasks: [Task]
    isComplete: Boolean
  }
`;

const taskDef = gql`
  type Task {
    id: Int
    name: String
    phase: Phase
    isComplete: Boolean
  }
`;

const queryDef = gql`
  type Query {
    findPhases: [Phase]
    findTasks: [Task]
  }
`;

const mutationDef = gql`
  type Mutation {
    insertPhase(name: String!): Phase
    updatePhase(id: Int!, name: String!): Phase
    removePhase(id: Int!): Phase
    insertTask(name: String!, phaseId: Int!): Task
    updateTask(id: Int!, name: String!): Task
    removeTask(id: Int!): Task
    completeTask(id: Int!): Task
    incompleteTask(id: Int!): Task
  }
`;

export const typeDefs = [phaseDef, taskDef, queryDef, mutationDef];
