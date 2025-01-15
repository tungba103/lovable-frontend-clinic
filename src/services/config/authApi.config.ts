import token from '@/utils/token';
import axios from 'axios';

const BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:9999/api/v1'

const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

authApi.interceptors.request.use(
  (config) => {
    const accessToken = token.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default authApi;
