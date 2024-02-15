const { gql } = require('apollo-server-express');

const typeDefs = gql`
  scalar Date

  enum Role {
    ADMIN
    USER
    GUEST
  }

  type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    posts: [Post!]!
  }

  type Post {
    id: ID!
    title: String!
    content: String!
    author: User!
  }

  type Employee {
    id: ID!
    firstName: String!
    lastName: String!
    email: String!
    gender: String
    salary: Float
  }

  type Event {
    id: ID!
    title: String!
    date: Date!
  }

  input CreateUserInput {
    username: String!
    email: String!
    password: String!
    role: Role!
  }

  type Query {
    getAllEmployees: [Employee]
    getEmployeeById(id: ID!): Employee
    loginUser(username: String!, password: String!): User
    user(id: ID!): User
    users: [User!]!
    searchPosts(keyword: String!): [Post!]!
  }

  type Mutation {
    createUser(username: String!, email: String!, password: String!): User
    createUserWithRole(input: CreateUserInput!): User!
    createEmployee(firstName: String!, lastName: String!, email: String!, gender: String, salary: Float): Employee
    updateEmployee(id: ID!, firstName: String, lastName: String, email: String, gender: String, salary: Float): Employee
    deleteEmployee(id: ID!): String
    updatePost(id: ID!, title: String, content: String): Post
    deletePost(id: ID!): Boolean
  }
`;
module.exports = typeDefs;
