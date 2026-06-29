import axiosInstance from '../config/api';

// Apply for loan
export const applyLoan = async (loanData) => {
  try {
    const response = await axiosInstance.post('/loans', loanData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get all user loans
export const getUserLoans = async (params) => {
  try {
    const response = await axiosInstance.get('/loans', { params });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get single loan
export const getLoan = async (loanId) => {
  try {
    const response = await axiosInstance.get(`/loans/${loanId}`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Approve loan (Admin)
export const approveLoan = async (loanId) => {
  try {
    const response = await axiosInstance.put(`/loans/${loanId}/approve`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Disburse loan (Admin)
export const disburseLoan = async (loanId) => {
  try {
    const response = await axiosInstance.put(`/loans/${loanId}/disburse`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Pay EMI
export const payEMI = async (loanId, accountId) => {
  try {
    const response = await axiosInstance.post(`/loans/${loanId}/${accountId}/pay-emi`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};