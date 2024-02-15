const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');
const Post = require('../models/Post');
const { default: mongoose } = require('mongoose');

const Query = {
  getAllEmployees: async () => {
      try {
        const employees = await Employee.find();
        return employees.map(employee => ({
          id: employee._id.toString(),
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          gender: employee.gender,
          salary: employee.salary
        }));
      } catch (err) {
        throw new Error('Error fetching employees');
      }
    },
    getEmployeeById: async (_, { id }) => {
      try {
        const employee = await Employee.findById(id);
        return {
          id: employee._id.toString(),
          firstName: employee.firstName,
          lastName: employee.lastName,
          email: employee.email,
          gender: employee.gender,
          salary: employee.salary
        };
      } catch (err) {
        throw new Error('Error fetching employee by ID');
      }
    },
    loginUser: async (_, { username, password }) => {
      try {
        const user = await User.findOne({ username });
        if (!user || user.password !== password) { 
          throw new Error('Invalid username or password');
        }
        const token = jwt.sign({ userId: user._id }, 'your_secret_key', { expiresIn: '1h' });
        return { user, token };
      } catch (err) {
        throw err;
      }
    },
    users: async () => {
      try {
        return await User.find();
      } catch (err) {
        throw err;
      }
    },
    user: async (_, { id }) => {
      try {
        return await User.findById(id);
      } catch (err) {
        throw err;
      }
    },
  
  Mutation: {
    createUser: async (_, { username, email, password }) => {
      try {
        const newUser = new User({ username, email, password }); 
        await newUser.save();
        return newUser;
      } catch (err) {
        throw new Error('Error creating user');
      }
    },
    createEmployee: async (_, { firstName, lastName, email, gender, salary }) => {
      try {
        const newEmployee = new Employee({ firstName, lastName, email, gender, salary });
        await newEmployee.save();
        return newEmployee;
      } catch (err) {
        throw new Error('Error creating employee');
      }
    },
    updateEmployee: async (_, { id, firstName, lastName, email, gender, salary }) => {
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(
          id,
          { firstName, lastName, email, gender, salary },
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
      try {
        return await Post.find({ author: parent._id });
      } catch (err) {
        throw err;
      }
    },
  },
};

module.exports = { Query };
