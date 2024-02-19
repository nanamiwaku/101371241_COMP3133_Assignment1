const User = require('../models/user');
const Employee = require('../models/employee');
const bcrypt = require('bcryptjs');

const resolvers = {
  Query: {
    login: async (_, { username, password }) => {
      const user = await User.findOne({ $or: [{ username }, { email: username }] });
      if (!user) {
        throw new Error('User not found');
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        throw new Error('Incorrect password');
      }


      return { ...user._doc, _id: user.id };
    },
    getAllEmployees: async () => {
      return await Employee.find({});
    },
    searchEmployeeByEid: async (_, { eid }) => {
      return await Employee.findById(eid);
    },
  },
  Mutation: {
    signup: async (_, { username, email, password }) => {
      const existingUser = await User.findOne({ $or: [{ username }, { email }] });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const user = new User({
        username,
        email,
        password: hashedPassword,
      });

      const result = await user.save();

      return { ...result._doc, _id: result.id };
    },
    addNewEmployee: async (_, { first_name, last_name, email, gender, salary }) => {
      const newEmployee = new Employee({
        first_name,
        last_name,
        email,
        gender,
        salary,
      });

      const result = await newEmployee.save();

      return result;
    },
    updateEmployeeByEid: async (_, { eid, first_name, last_name, email, gender, salary }) => {
      const updatedEmployee = await Employee.findByIdAndUpdate(
        eid,
        { first_name, last_name, email, gender, salary },
        { new: true }
      );

      return updatedEmployee;
    },
    deleteEmployeeByEid: async (_, { eid }) => {
      await Employee.findByIdAndDelete(eid);
      return "Employee deleted successfully";
    },
  },
};

module.exports = resolvers;

