const { getAllEmployees } = require('./resolvers');
const dbMock = require('../__mocks__/mongoose.js');
const Employee = require('../models/Employee');

describe('getAllEmployees', () => {
  test('should fetch employees', async () => {
    dbMock.find.mockReturnValueOnce([
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Doe' }
    ]);

    const result = await getAllEmployees();
    expect(result).toEqual([
      { id: '1', name: 'John Doe' },
      { id: '2', name: 'Jane Doe' }
    ]);
    expect(dbMock.find).toHaveBeenCalledWith('employees');
  });
});

jest.mock('../models/Employee', () => {
  return require('../__mocks__/mongoose').model('Employee');
});