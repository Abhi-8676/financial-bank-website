const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  fromAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account',
    required: true
  },
  toAccount: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Account'
  },
  beneficiary: {
    name: String,
    accountNumber: String,
    ifscCode: String
  },
  transactionType: {
    type: String,
    enum: ['transfer', 'deposit', 'withdrawal', 'payment', 'loan_emi'],
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reference: {
    type: String,
    unique: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed', 'cancelled'],
    default: 'pending'
  },
  transactionDate: {
    type: Date,
    default: Date.now
  },
  completedAt: {
    type: Date
  },
  fees: {
    type: Number,
    default: 0
  },
  notes: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Transaction', transactionSchema);