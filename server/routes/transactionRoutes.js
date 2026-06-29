const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createTransaction,
  getTransactions,
  getTransaction,
  getTransactionStats
} = require('../controllers/transactionController');

// Create transaction
router.post('/', protect, createTransaction);

// Get user transactions
router.get('/', protect, getTransactions);

// Get transaction stats
router.get('/stats', protect, getTransactionStats);

// Get single transaction
router.get('/:transactionId', protect, getTransaction);

module.exports = router;