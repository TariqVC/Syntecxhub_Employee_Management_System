const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [2, 'Name must be at least 2 characters'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
  },
  role: {
    type: String,
    required: [true, 'Role is required'],
    enum: ['Developer', 'Designer', 'Manager', 'HR', 'Sales', 'Other'],
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    trim: true,
    set: (val) => val.trim().toLowerCase().replace(/\b\w/g, c => c.toLowerCase()),
  },
  salary: {
    type: Number,
    required: [true, 'Salary is required'],
    min: [0, 'Salary cannot be negative'],
  },
  phone: {
    type: String,
    trim: true,
    match: [/^\+?[\d\s\-]{7,15}$/, 'Please enter a valid phone number'],
  },
  joinDate: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);