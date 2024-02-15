const { resolvers } = require('./resolvers');
const Employee = require('../models/Employee');
const { Query } = require('./resolvers');
const getAllEmployees = Query.getAllEmployees;

jest.mock('../models/Employee', () => {
  return {
    find: jest.fn().mockResolvedValue([
      { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', gender: 'Male', salary: 50000 },
      { _id: '2', firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', gender: 'Female', salary: 55000 }
    ]),
    findById: jest.fn().mockResolvedValue({
      _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', gender: 'Male', salary: 50000
    }),
  };
});

describe('getAllEmployees', () => {
  it('should fetch all employees', async () => {
    const employees = await getAllEmployees();
    expect(employees).toBeDefined(); // 期待するアサーションを記述
  });
});
