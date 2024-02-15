const mongoose = require('mongoose');
const { isFloat } = require('validator');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  email:{
    type: String,
    unique : true
  },
  gender: {
    type: String,
    enum: ['Male', 'Female', 'Other'],
  },
  salary: {
    type: Number, 
    required: true
  }
});

module.exports = mongoose.model('Employee', employeeSchema);
