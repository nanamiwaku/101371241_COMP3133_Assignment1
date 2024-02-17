const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Employee = require('../models/Employee');

const Query = {
  getAllEmployees: async () => {
    try {
      const employees = await Employee.find();
      return employees.map(employee => ({
        _id: employee._id.toString(),
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
      if (!employee) {
        throw new Error('Employee not found');
      }
      return {
        _id: employee._id.toString(),
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
};

const Mutation = {
  signUp: async (_, { username, email, password }) => {
    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error('User already exists with that email');
      }
      const newUser = await User.create({ username, email, password });


      const token = jwt.sign(
        { userId: newUser._id, email: newUser.email },
        'your_secret_key', 
        { expiresIn: '1h' }
      );

      return { user: newUser, token };
    } catch (error) {
      throw new Error(`Error signing up: ${error.message}`);
    }
  },
  loginUser: async (_, { username, password }) => {
    try {
      const user = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }
      
      const isMatch = password === user.password; 
      if (!isMatch) {
        throw new Error('Invalid password');
      }

      const token = jwt.sign(
        { userId: user._id, email: user.email },
        'your_secret_key',
        { expiresIn: '1h' }
      );

      return { user, token };
    } catch (err) {
      throw new Error(`Login error: ${err.message}`);
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
};

const UserResolvers = {
  posts: async (parent) => {
    try {
      return await Post.find({ author: parent._id });
    } catch (err) {
      throw err;
    }
  },
};

module.exports = { Query, Mutation, User: UserResolvers };
