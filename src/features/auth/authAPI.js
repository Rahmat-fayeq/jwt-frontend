import axios from 'axios';
import axiosInstance from '../../axiosConfig';

const baseURL = 'http://localhost:5000';

export const login = async (username, password) => {
  try {
    const response = await axios.post(`${baseURL}/auth/login`, { username, password });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const refreshTokens = async (refreshToken) => {
  try {
    const response = await axios.post(`${baseURL}/auth/refresh-token`, { refreshToken });
    return response.data;
  } catch (error) {
    throw error.response.data.message;
  }
};

export const logout = async () => {
  try {
    await axiosInstance.post('/auth/logout',{
      refreshToken: localStorage.getItem('refreshToken')
    })
  } catch (error) {
    console.error('Logout failed:', error);
  }
};
