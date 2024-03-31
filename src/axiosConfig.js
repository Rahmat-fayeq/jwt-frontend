import axios from 'axios';

const baseURL = 'http://localhost:5000'; // Backend API URL

const axiosInstance = axios.create({
  baseURL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        const refreshTokenResponse = await axios.post(`${baseURL}/auth/refresh-token`, { refreshToken });
        const newAccessToken = refreshTokenResponse.data.accessToken;
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error('Refresh token failed', refreshError.message);
        // Redirect to login page or handle logout
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
