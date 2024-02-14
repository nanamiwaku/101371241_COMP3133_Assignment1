const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
  }

  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    gender: String
    salary: Float
  }

  type Query {
    getAllEmployees: [Employee]
    getEmployeeById(id: ID!): Employee
    loginUser(username: String!, password: String!): User
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    createEmployee(firstName: String!, lastName: String!, email: String!, gender: String, salary: Float): Employee
    updateEmployee(id: ID!, firstName: String, lastName: String, email: String, gender: String, salary: Float): Employee
    deleteEmployee(id: ID!): String
  }
`;
