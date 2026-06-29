import axiosInstance from '../config/api';

// Create transaction
export const createTransaction = async (transactionData) => {
  try {
    const response = await axiosInstance.post('/transactions', transactionData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get all transactions
export const getTransactions = async (params) => {
  try {
    const response = await axiosInstance.get('/transactions', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get single transaction
export const getTransaction = async (transactionId) => {
  try {
    const response = await axiosInstance.get(`/transactions/${transactionId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get transaction statistics
export const getTransactionStats = async (params) => {
  try {
    const response = await axiosInstance.get('/transactions/stats', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};