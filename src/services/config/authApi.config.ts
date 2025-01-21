import token from '@/utils/token';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { refreshToken as refreshTokenApi } from '@/services/api/auth';
const BASE_URL = import.meta.env.VITE_API_ENDPOINT || 'http://localhost:9999/api/v1'

interface ExtendedAxiosRequestConfig extends AxiosRequestConfig {
  retry?: boolean;
}

const authApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

const refreshAccessToken = async () => {
  try {
    const refreshToken = token.getRefreshToken();

    if (!refreshToken) {
      return Promise.reject(new Error('Refresh token not found'));
    }

    const response = await refreshTokenApi(refreshToken);

    const { accessToken } = response.data.result.result;

    token.setAccessToken(accessToken);
    console.log('accessToken', accessToken);
    return accessToken;
  } catch (error) {
    return Promise.reject(error);
  }
};

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


let isRefreshing = false;
let refreshSubscribers: ((_token: string) => void)[] = [];

authApi.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as ExtendedAxiosRequestConfig;

    if (error.response?.status === 401 && !originalRequest.retry) {
      if (isRefreshing) {
        return new Promise((resolve) => {
          refreshSubscribers.push((token) => {
            if (originalRequest.headers) {
              originalRequest.headers.Authorization = `Bearer ${token}`;
            }
            resolve(authApi(originalRequest));
          });
        });
      }

      originalRequest.retry = true;
      isRefreshing = true;
      try {
        const accessToken = await refreshAccessToken();

        refreshSubscribers.forEach((callback) => callback(accessToken));
        refreshSubscribers = [];
        return await authApi(originalRequest);
      } catch (refreshError) {
        token.removeAccessToken();
        window.location.href = '/sign-in';
        return await Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // TODO: Handle page authorization at routes.ts

    return Promise.reject(error);
  },
);

export default authApi;
