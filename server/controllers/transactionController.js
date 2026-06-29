const Transaction = require('../models/Transaction');
const Account = require('../models/Account');

// Create transaction
exports.createTransaction = async (req, res) => {
  try {
    const { fromAccountId, toAccountId, amount, description, transactionType, beneficiary } = req.body;
    const userId = req.user.id;

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }

    // Verify from account belongs to user
    const fromAccount = await Account.findOne({ _id: fromAccountId, user: userId });
    if (!fromAccount) {
      return res.status(404).json({
        success: false,
        message: 'From account not found'
      });
    }

    // Check balance
    if (fromAccount.balance < amount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance'
      });
    }

    // Generate reference number
    const reference = 'TXN' + Date.now() + Math.floor(Math.random() * 1000);

    const newTransaction = new Transaction({
      fromAccount: fromAccountId,
      toAccount: toAccountId || null,
      beneficiary,
      transactionType,
      amount,
      description,
      reference,
      status: 'pending'
    });

    // Process transaction
    if (toAccountId) {
      const toAccount = await Account.findById(toAccountId);
      if (!toAccount) {
        return res.status(404).json({
          success: false,
          message: 'To account not found'
        });
      }

      // Deduct from source
      fromAccount.balance -= amount;
      // Add to destination
      toAccount.balance += amount;

      await fromAccount.save();
      await toAccount.save();
    } else {
      // Deduct for withdrawal/payment
      fromAccount.balance -= amount;
      await fromAccount.save();
    }

    newTransaction.status = 'completed';
    newTransaction.completedAt = Date.now();
    await newTransaction.save();

    res.status(201).json({
      success: true,
      message: 'Transaction completed successfully',
      transaction: newTransaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get user transactions
exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user.id;
    const { accountId, status, limit = 10, page = 1 } = req.query;

    let query = {};

    // Get user's accounts
    const userAccounts = await Account.find({ user: userId }).select('_id');
    const accountIds = userAccounts.map(acc => acc._id);

    query = {
      $or: [
        { fromAccount: { $in: accountIds } },
        { toAccount: { $in: accountIds } }
      ]
    };

    if (accountId) {
      query.fromAccount = accountId;
    }

    if (status) {
      query.status = status;
    }

    const transactions = await Transaction.find(query)
      .populate('fromAccount')
      .populate('toAccount')
      .sort({ transactionDate: -1 })
      .limit(limit)
      .skip((page - 1) * limit);

    const total = await Transaction.countDocuments(query);

    res.status(200).json({
      success: true,
      count: transactions.length,
      total,
      page,
      pages: Math.ceil(total / limit),
      transactions
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single transaction
exports.getTransaction = async (req, res) => {
  try {
    const { transactionId } = req.params;
    const userId = req.user.id;

    const transaction = await Transaction.findById(transactionId)
      .populate('fromAccount')
      .populate('toAccount');

    if (!transaction) {
      return res.status(404).json({
        success: false,
        message: 'Transaction not found'
      });
    }

    // Verify user access
    const userAccounts = await Account.find({ user: userId }).select('_id');
    const accountIds = userAccounts.map(acc => acc._id.toString());

    if (!accountIds.includes(transaction.fromAccount._id.toString())) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized to view this transaction'
      });
    }

    res.status(200).json({
      success: true,
      transaction
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get transaction statistics
exports.getTransactionStats = async (req, res) => {
  try {
    const userId = req.user.id;
    const { startDate, endDate } = req.query;

    let query = {};
    const userAccounts = await Account.find({ user: userId }).select('_id');
    const accountIds = userAccounts.map(acc => acc._id);

    query = {
      $or: [
        { fromAccount: { $in: accountIds } },
        { toAccount: { $in: accountIds } }
      ]
    };

    if (startDate || endDate) {
      query.transactionDate = {};
      if (startDate) query.transactionDate.$gte = new Date(startDate);
      if (endDate) query.transactionDate.$lte = new Date(endDate);
    }

    const stats = await Transaction.aggregate([
      { $match: query },
      {
        $group: {
          _id: '$transactionType',
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      }
    ]);

    res.status(200).json({
      success: true,
      stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};