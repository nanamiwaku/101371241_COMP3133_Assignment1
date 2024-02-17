const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  enum Role {
    ADMIN
    USER
    GUEST
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    posts: [Post!]!
  }

  type Post {
    _id: ID!
    title: String!
    content: String!
    author: User!
  }

  type AuthPayload {
    user: User
    token: String
  }

  type Employee {
    _id: ID!
    firstName: String!
    lastName: String!
    email: String!
    gender: String
    salary: Float
  }

  type Event {
    _id: ID!
    title: String!
    date: Date!
  }

  input SignupUserInput {
    username: String!
    email: String!
    password: String!
    role: Role!
  }

  type Query {
    getAllEmployees: [Employee]
    getEmployeeById(_id: ID!): Employee
    user(_id: ID!): User
    users: [User!]!
  }

  type Mutation {
    signUp(username: String!, email: String!, password: String!): AuthPayload
    createUserWithRole(input: SignupUserInput!): AuthPayload
    createEmployee(firstName: String!, lastName: String!, email: String!, gender: String, salary: Float): Employee
    updateEmployee(_id: ID!, firstName: String, lastName: String, email: String, gender: String, salary: Float): Employee
    deleteEmployee(_id: ID!): String
    updatePost(_id: ID!, title: String, content: String): Post
    deletePost(_id: ID!): Boolean
    loginUser(username: String!, password: String!): AuthPayload  # Ensure it's defined to return AuthPayload
  }
  
`;

module.exports = typeDefs;
