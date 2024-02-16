const { Query, Mutation } = require('./resolvers');
const Employee = require('../models/Employee');
const User = require('../models/User');

jest.mock('../models/Employee', () => ({
  find: jest.fn().mockResolvedValue([
    { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', gender: 'Male', salary: 50000 },
    { _id: '2', firstName: 'Mimi', lastName: 'Doe', email: 'jane@example.com', gender: 'Female', salary: 55000 },
  ]),
  findById: jest.fn().mockResolvedValue({
     _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', gender: 'Male', salary: 50000 
  }),
}));

jest.mock('../models/User', () => ({
  findOne: jest.fn(),
  create: jest.fn().mockResolvedValue({
    _id: '1',
    username: 'newuser',
    email: 'newuser@example.com',
    password: 'password'
  })
}));

describe('GraphQL Resolvers', () => {
  describe('getAllEmployees', () => {
    it('should fetch all employees', async () => {
      const employees = await Query.getAllEmployees();
      expect(employees.length).toBe(2);
      expect(Employee.find).toHaveBeenCalled();
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const newUser = { username: 'newuser', email: 'newuser@example.com', password: 'password123' };
      const user = await Mutation.createUser(null, newUser);
      expect(user).toMatchObject({ username: newUser.username, email: newUser.email });
      expect(User.findOne).toHaveBeenCalledWith({ email: newUser.email });
    });
  });

  describe('getEmployeeById', () => {
    it('should fetch a single employee', async () => {
      const employeeId = '1';
      const employee = await Query.getEmployeeById(null, { _id: employeeId });
      expect(employee).toMatchObject({ _id: employeeId });
    });
  });
  
});
