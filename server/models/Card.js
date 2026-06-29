const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
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
  cardType: {
    type: String,
    enum: ['credit', 'debit'],
    required: true
  },
  cardNumber: {
    type: String,
    required: true,
    unique: true
  },
  cardholderName: {
    type: String,
    required: true
  },
  expiryMonth: {
    type: Number,
    required: true
  },
  expiryYear: {
    type: Number,
    required: true
  },
  cvv: {
    type: String,
    required: true
  },
  creditLimit: {
    type: Number,
    default: 0
  },
  outstandingBalance: {
    type: Number,
    default: 0
  },
  availableBalance: {
    type: Number
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'blocked', 'expired'],
    default: 'active'
  },
  cardNetwork: {
    type: String,
    enum: ['Visa', 'Mastercard', 'AmEx', 'RuPay'],
    required: true
  },
  issuedDate: {
    type: Date,
    default: Date.now
  },
  lastUsedDate: Date,
  spendThisMonth: {
    type: Number,
    default: 0
  },
  spendThisYear: {
    type: Number,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Card', cardSchema);