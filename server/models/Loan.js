const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  account: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  loanType: {
    type: String,
    enum: ['personal', 'home', 'auto', 'education', 'business'],
    required: true
  },
  loanAmount: {
    type: Number,
    required: true
  },
  principalAmount: {
    type: Number,
    required: true
  },
  interestRate: {
    type: Number,
    required: true
  },
  tenure: {
    type: Number,
    required: true
  },
  emiAmount: {
    type: Number,
    required: true
  },
  disbursedAmount: {
    type: Number,
    default: 0
  },
  outstandingAmount: {
    type: Number
  },
  paidAmount: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['applied', 'approved', 'rejected', 'active', 'closed', 'defaulted'],
    default: 'applied'
  },
  emisDue: {
    type: Number,
    default: 0
  },
  nextEmiDate: Date,
  lastEmiPaidDate: Date,
  applicationDate: {
    type: Date,
    default: Date.now
  },
  approvalDate: Date,
  disbursementDate: Date,
  endDate: Date,
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Loan', loanSchema);