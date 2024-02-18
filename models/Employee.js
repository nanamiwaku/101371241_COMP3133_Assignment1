const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
    trim: true,
  },
  last_name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  gender: {
    type: String,
    required: true,
    enum: ['Male', 'Female', 'Other'],
  },
  salary: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Employee', employeeSchema);
