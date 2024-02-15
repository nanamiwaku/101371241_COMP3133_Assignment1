const User = require('../models/User');   
const Employee = require('../models/Employee'); 
const jwt = require('jsonwebtoken');


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
      try {
        const employee = await Employee.findById(id);
        return employee;
      } catch (err) {
        throw new Error('Error fetching employee by ID');
      }
    },
    
    loginUser: async (_, { username, password }) => {
      try {
        const user = await User.findOne({ $or: [{ username: username }, { email: username }] });
        if (!user) {
          throw new Error('User not found');
        }
        if (user.password !== password) {
          throw new Error('Invalid password');
        }
        const token = jwt.sign({ userId: user.id }, 'your_secret_key', { expiresIn: '1h' });
        return { user, token };
         } catch (err) {
        throw err;
      }
    },
    
    users: async () => {
      return await User.find();
    },
    user: async (_, { id }) => {
      return await User.findById(id);
    },
  },
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        const newUser = new User({ username, email, password });
        const result = await newUser.save();
        return result;
      } catch (err) {
        throw new Error('Error creating user');
      }
    },
    createEmployee: async (_, { firstName, lastName, email, gender, salary }) => {
      try {
        const newEmployee = new Employee({ firstName, lastName, email, gender, salary });
        const result = await newEmployee.save();
        return result;
      } catch (err) {
        throw new Error('Error creating employee');
      }
    },
    
    updateEmployee: async (_, { id, firstName, lastName, email, gender, salary }) => {
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
          id,
          { $set: { firstName, lastName, email, gender, salary }},
          { new: true }
        );
        return updatedEmployee;
      } catch (err) {
        throw new Error('Error updating employee');
      }
    },
    
    deleteEmployee: async (_, { id }) => {
      try {
        await Employee.findByIdAndDelete(id);
        return 'Employee deleted successfully';
      } catch (err) {
        throw new Error('Error deleting employee');
      }
    },
    
  },
  User: {
    posts: async (parent) => {
      
    }
  }
};

module.exports = resolvers;
