const { Query, Mutation } = require('./resolvers');
const Employee = require('./models/employee');
const User = require('./models/user');

jest.mock('../models/employee', () => ({
  find: jest.fn().mockResolvedValue([
    { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', gender: 'Male', salary: 50000 },
    { _id: '2', firstName: 'Mimi', lastName: 'Doe', email: 'jane@example.com', gender: 'Female', salary: 55000 },
  ]),
  findById: jest.fn().mockResolvedValue({
     _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', gender: 'Male', salary: 50000 
  }),
}));

jest.mock('../models/user', () => ({
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

  describe('signup', () => {
    it('should create a new user', async () => {
      const newUser = { username: 'newuser', email: 'newuser@example.com', password: 'password123' };
      const result = await Mutation.signUp(null, newUser);
  
    
      expect(result).toMatchObject({
        user: {
          username: newUser.username,
          email: newUser.email,
          
        },
        
        token: expect.any(String),
      });
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
