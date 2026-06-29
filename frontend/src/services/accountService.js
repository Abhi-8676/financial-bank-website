import axiosInstance from '../config/api';

// Create account
export const createAccount = async (accountData) => {
  try {
    const response = await axiosInstance.post('/accounts', accountData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get all user accounts
export const getUserAccounts = async () => {
  try {
    const response = await axiosInstance.get('/accounts');
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get single account
export const getAccount = async (accountId) => {
  try {
    const response = await axiosInstance.get(`/accounts/${accountId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update account
export const updateAccount = async (accountId, updateData) => {
  try {
    const response = await axiosInstance.put(`/accounts/${accountId}`, updateData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Deposit money
export const depositMoney = async (accountId, amount, description) => {
  try {
    const response = await axiosInstance.post(`/accounts/${accountId}/deposit`, {
      amount,
      description
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Withdraw money
export const withdrawMoney = async (accountId, amount, description) => {
  try {
    const response = await axiosInstance.post(`/accounts/${accountId}/withdraw`, {
      amount,
      description
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Close account
export const closeAccount = async (accountId) => {
  try {
    const response = await axiosInstance.post(`/accounts/${accountId}/close`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};