const User = require('../models/User');   
const Employee = require('../models/Employee'); 

const resolvers = {
  Query: {
    getAllEmployees: async () => {
      try {
        const employees = await Employee.find();
        return employees;
      } catch (err) {
        throw new Error('Error fetching employees');
      }
    },
    getEmployeeById: async (_, { id }) => {
    },
    loginUser: async (_, { username, password }) => {
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      createUser: async (_, { username, email, password }) => {
        try {
          
          const newUser = new User({ username, email, password });
          
          const result = await newUser.save();
          return result;
        } catch (err) {
          throw new Error('Error creating user');
        }
      
    },
    createEmployee; async (_, { firstName, lastName, email, gender, salary }) => {
      
    },
    updateEmployee; async (_, { id, firstName, lastName, email, gender, salary }) => {
    },
    deleteEmployee; async (_, { id }) => {
      
    }
  
    }
  
  }
}