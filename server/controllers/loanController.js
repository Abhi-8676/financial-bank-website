const Loan = require('../models/Loan');
const Account = require('../models/Account');

// Apply for loan
exports.applyLoan = async (req, res) => {
  try {
    const { loanType, loanAmount, tenure, accountId } = req.body;
    const userId = req.user.id;

    if (loanAmount <= 0 || tenure <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Invalid loan amount or tenure'
      });
    }

    // Verify account
    const account = await Account.findOne({ _id: accountId, user: userId });
    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found'
      });
    }

    // Interest rates based on loan type
    const interestRates = {
      personal: 9.5,
      home: 7.2,
      auto: 8.5,
      education: 7.0,
      business: 10.5
    };

    const interestRate = interestRates[loanType] || 8.0;
    const monthlyRate = interestRate / 12 / 100;
    const emiAmount = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / 
                      (Math.pow(1 + monthlyRate, tenure) - 1);

    const newLoan = new Loan({
      user: userId,
      account: accountId,
      loanType,
      loanAmount,
      principalAmount: loanAmount,
      interestRate,
      tenure,
      emiAmount: Math.round(emiAmount),
      outstandingAmount: loanAmount,
      status: 'applied'
    });

    await newLoan.save();

    res.status(201).json({
      success: true,
      message: 'Loan application submitted successfully',
      loan: newLoan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get user loans
exports.getUserLoans = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    let query = { user: userId };
    if (status) {
      query.status = status;
    }

    const loans = await Loan.find(query)
      .populate('account')
      .sort({ applicationDate: -1 });

    res.status(200).json({
      success: true,
      count: loans.length,
      loans
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single loan
exports.getLoan = async (req, res) => {
  try {
    const { loanId } = req.params;
    const userId = req.user.id;

    const loan = await Loan.findOne({ _id: loanId, user: userId })
      .populate('account')
      .populate('user', 'firstName lastName email');

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan not found'
      });
    }

    res.status(200).json({
      success: true,
      loan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Approve loan (Admin)
exports.approveLoan = async (req, res) => {
  try {
    const { loanId } = req.params;

    const loan = await Loan.findByIdAndUpdate(
      loanId,
      {
        status: 'approved',
        approvalDate: Date.now(),
        nextEmiDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      },
      { new: true }
    );

    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Loan approved successfully',
      loan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Disburse loan
exports.disburseLoan = async (req, res) => {
  try {
    const { loanId } = req.params;

    const loan = await Loan.findById(loanId);
    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan not found'
      });
    }

    // Update account balance
    const account = await Account.findByIdAndUpdate(
      loan.account,
      { $inc: { balance: loan.loanAmount } },
      { new: true }
    );

    // Update loan
    loan.status = 'active';
    loan.disbursedAmount = loan.loanAmount;
    loan.disbursementDate = Date.now();
    loan.endDate = new Date(Date.now() + loan.tenure * 30 * 24 * 60 * 60 * 1000);
    await loan.save();

    res.status(200).json({
      success: true,
      message: 'Loan disbursed successfully',
      loan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Pay EMI
exports.payEMI = async (req, res) => {
  try {
    const { loanId, accountId } = req.params;
    const userId = req.user.id;

    const loan = await Loan.findOne({ _id: loanId, user: userId });
    if (!loan) {
      return res.status(404).json({
        success: false,
        message: 'Loan not found'
      });
    }

    const account = await Account.findOne({ _id: accountId, user: userId });
    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found'
      });
    }

    if (account.balance < loan.emiAmount) {
      return res.status(400).json({
        success: false,
        message: 'Insufficient balance to pay EMI'
      });
    }

    // Deduct EMI
    account.balance -= loan.emiAmount;
    await account.save();

    // Update loan
    loan.paidAmount += loan.emiAmount;
    loan.outstandingAmount -= loan.emiAmount;
    loan.emisDue -= 1;
    loan.lastEmiPaidDate = Date.now();
    loan.nextEmiDate = new Date(loan.nextEmiDate.getTime() + 30 * 24 * 60 * 60 * 1000);

    if (loan.outstandingAmount <= 0) {
      loan.status = 'closed';
    }

    await loan.save();

    res.status(200).json({
      success: true,
      message: 'EMI paid successfully',
      loan
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};