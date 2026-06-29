import axiosInstance from '../config/api';

// Register User
export const registerUser = async (formData) => {
  try {
    const response = await axiosInstance.post('/auth/register', formData);
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Login User
export const loginUser = async (email, password) => {
  try {
    const response = await axiosInstance.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('authToken', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Get Current User
export const getCurrentUser = async () => {
  try {
    const response = await axiosInstance.get('/auth/me');
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Update Profile
export const updateProfile = async (formData) => {
  try {
    const response = await axiosInstance.put('/auth/update-profile', formData);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Change Password
export const changePassword = async (oldPassword, newPassword) => {
  try {
    const response = await axiosInstance.put('/auth/change-password', {
      oldPassword,
      newPassword
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

// Logout User
export const logoutUser = () => {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
};