const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createAccount,
  getUserAccounts,
  getAccount,
  updateAccount,
  depositMoney,
  withdrawMoney,
  closeAccount
} = require('../controllers/accountController');

// Create new account
router.post('/', protect, createAccount);

// Get all user accounts
router.get('/', protect, getUserAccounts);

// Get single account
router.get('/:accountId', protect, getAccount);

// Update account
router.put('/:accountId', protect, updateAccount);

// Deposit money
router.post('/:accountId/deposit', protect, depositMoney);

// Withdraw money
router.post('/:accountId/withdraw', protect, withdrawMoney);

// Close account
router.post('/:accountId/close', protect, closeAccount);

module.exports = router;