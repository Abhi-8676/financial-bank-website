const Account = require('../models/Account');

// Create new account
exports.createAccount = async (req, res) => {
  try {
    const { accountType, interestRate, ifscCode, branchName } = req.body;
    const userId = req.user.id;

    // Generate unique account number
    const accountNumber = 'ACC' + Date.now() + Math.floor(Math.random() * 1000);

    const newAccount = new Account({
      user: userId,
      accountNumber,
      accountType,
      interestRate: interestRate || 0,
      ifscCode,
      branchName,
      balance: 0
    });

    await newAccount.save();

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      account: newAccount
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all accounts for user
exports.getUserAccounts = async (req, res) => {
  try {
    const userId = req.user.id;

    const accounts = await Account.find({ user: userId }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: accounts.length,
      accounts
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single account
exports.getAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const userId = req.user.id;

    const account = await Account.findOne({
      _id: accountId,
      user: userId
    });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found'
      });
    }

    res.status(200).json({
      success: true,
      account
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update account
exports.updateAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const userId = req.user.id;
    const { interestRate, status } = req.body;

    const account = await Account.findOneAndUpdate(
      { _id: accountId, user: userId },
      {
        interestRate,
        status,
        updatedAt: Date.now()
      },
      { new: true, runValidators: true }
    );

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Account updated successfully',
      account
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Deposit money
exports.depositMoney = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { amount, description } = req.body;
    const userId = req.user.id;

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }

    const account = await Account.findOneAndUpdate(
      { _id: accountId, user: userId },
      {
        $inc: { balance: amount },
        updatedAt: Date.now()
      },
      { new: true }
    );

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Deposit successful',
      account
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Withdraw money
exports.withdrawMoney = async (req, res) => {
  try {
    const { accountId } = req.params;
    const { amount, description } = req.body;
    const userId = req.user.id;

    if (amount <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Amount must be greater than 0'
      });
    }

    const account = await Account.findOne({ _id: accountId, user: userId });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found'
      });
    }

    if (account.balance < amount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance'
      });
    }

    account.balance -= amount;
    account.updatedAt = Date.now();
    await account.save();

    res.status(200).json({
      success: true,
      message: 'Withdrawal successful',
      account
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Close account
exports.closeAccount = async (req, res) => {
  try {
    const { accountId } = req.params;
    const userId = req.user.id;

    const account = await Account.findOne({ _id: accountId, user: userId });

    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found'
      });
    }

    if (account.balance > 0) {
      return res.status(400).json({
        success: false,
        message: 'Cannot close account with remaining balance'
      });
    }

    account.status = 'closed';
    account.updatedAt = Date.now();
    await account.save();

    res.status(200).json({
      success: true,
      message: 'Account closed successfully',
      account
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};