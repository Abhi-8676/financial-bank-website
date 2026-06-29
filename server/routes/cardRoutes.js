const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  requestCard,
  getUserCards,
  getCard,
  updateCardStatus,
  blockCard,
  getCardTransactions
} = require('../controllers/cardController');

// Request card
router.post('/', protect, requestCard);

// Get user cards
router.get('/', protect, getUserCards);

// Get single card
router.get('/:cardId', protect, getCard);

// Get card transactions
router.get('/:cardId/transactions', protect, getCardTransactions);

// Update card status
router.put('/:cardId/status', protect, updateCardStatus);

// Block card
router.put('/:cardId/block', protect, blockCard);

module.exports = router;