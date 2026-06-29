const Card = require('../models/Card');
const Account = require('../models/Account');

// Request card
exports.requestCard = async (req, res) => {
  try {
    const { cardType, accountId, cardNetwork } = req.body;
    const userId = req.user.id;

    // Verify account
    const account = await Account.findOne({ _id: accountId, user: userId });
    if (!account) {
      return res.status(404).json({
        success: false,
        message: 'Account not found'
      });
    }

    // Generate card number
    const cardNumber = Math.floor(Math.random() * 1000000000000000)
      .toString()
      .padStart(16, '0');

    // Generate CVV
    const cvv = Math.floor(Math.random() * 1000).toString().padStart(3, '0');

    // Set expiry
    const expiryDate = new Date();
    expiryDate.setFullYear(expiryDate.getFullYear() + 5);

    // Credit limit based on card type
    const creditLimit = cardType === 'credit' ? 100000 : 0;

    const newCard = new Card({
      user: userId,
      account: accountId,
      cardType,
      cardNumber,
      cardholderName: `${req.user.firstName} ${req.user.lastName}`,
      expiryMonth: expiryDate.getMonth() + 1,
      expiryYear: expiryDate.getFullYear(),
      cvv,
      creditLimit,
      availableBalance: creditLimit,
      cardNetwork,
      status: 'active'
    });

    await newCard.save();

    res.status(201).json({
      success: true,
      message: 'Card requested successfully',
      card: newCard
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get user cards
exports.getUserCards = async (req, res) => {
  try {
    const userId = req.user.id;
    const { status } = req.query;

    let query = { user: userId };
    if (status) {
      query.status = status;
    }

    const cards = await Card.find(query)
      .populate('account')
      .sort({ issuedDate: -1 });

    res.status(200).json({
      success: true,
      count: cards.length,
      cards
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get single card
exports.getCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const userId = req.user.id;

    const card = await Card.findOne({ _id: cardId, user: userId })
      .populate('account');

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }

    res.status(200).json({
      success: true,
      card
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update card status
exports.updateCardStatus = async (req, res) => {
  try {
    const { cardId } = req.params;
    const { status } = req.body;
    const userId = req.user.id;

    const card = await Card.findOneAndUpdate(
      { _id: cardId, user: userId },
      { status, updatedAt: Date.now() },
      { new: true }
    );

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Card status updated successfully',
      card
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Block/Unblock card
exports.blockCard = async (req, res) => {
  try {
    const { cardId } = req.params;
    const userId = req.user.id;

    const card = await Card.findOneAndUpdate(
      { _id: cardId, user: userId },
      { status: 'blocked', updatedAt: Date.now() },
      { new: true }
    );

    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Card blocked successfully',
      card
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get card transactions
exports.getCardTransactions = async (req, res) => {
  try {
    const { cardId } = req.params;
    const userId = req.user.id;
    const { limit = 10, page = 1 } = req.query;

    const card = await Card.findOne({ _id: cardId, user: userId });
    if (!card) {
      return res.status(404).json({
        success: false,
        message: 'Card not found'
      });
    }

    // In a real implementation, you would fetch card transactions
    // from a cardTransactions collection or similar
    res.status(200).json({
      success: true,
      message: 'Card transactions fetched successfully',
      transactions: [],
      card
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};