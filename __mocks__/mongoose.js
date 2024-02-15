const mongoose = jest.createMockFromModule('mongoose');

mongoose.model = jest.fn().mockImplementation(() => ({
  find: jest.fn().mockResolvedValue([
    { _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', gender: 'Male', salary: 50000 },
    { _id: '2', firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', gender: 'Female', salary: 55000 }
  ]),
  findById: jest.fn().mockResolvedValue({
    _id: '1', firstName: 'John', lastName: 'Doe', email: 'john@example.com', gender: 'Male', salary: 50000
  }),
}));

module.exports = mongoose;
