const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  applyLoan,
  getUserLoans,
  getLoan,
  approveLoan,
  disburseLoan,
  payEMI
} = require('../controllers/loanController');

// Apply for loan
router.post('/', protect, applyLoan);

// Get user loans
router.get('/', protect, getUserLoans);

// Get single loan
router.get('/:loanId', protect, getLoan);

// Approve loan (Admin)
router.put('/:loanId/approve', approveLoan);

// Disburse loan (Admin)
router.put('/:loanId/disburse', disburseLoan);

// Pay EMI
router.post('/:loanId/:accountId/pay-emi', protect, payEMI);

module.exports = router;