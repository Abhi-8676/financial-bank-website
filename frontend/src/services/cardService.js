import axiosInstance from '../config/api';

// Request card
export const requestCard = async (cardData) => {
  try {
    const response = await axiosInstance.post('/cards', cardData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get all user cards
export const getUserCards = async (params) => {
  try {
    const response = await axiosInstance.get('/cards', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get single card
export const getCard = async (cardId) => {
  try {
    const response = await axiosInstance.get(`/cards/${cardId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update card status
export const updateCardStatus = async (cardId, status) => {
  try {
    const response = await axiosInstance.put(`/cards/${cardId}/status`, { status });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Block card
export const blockCard = async (cardId) => {
  try {
    const response = await axiosInstance.put(`/cards/${cardId}/block`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get card transactions
export const getCardTransactions = async (cardId, params) => {
  try {
    const response = await axiosInstance.get(`/cards/${cardId}/transactions`, { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};