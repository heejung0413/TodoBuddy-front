import axios from 'axios';
import { AuthService } from './Services/Auth';

export const axiosInstance = axios.create({
  baseURL: 'https://www.todobuddy.site/api',
  timeout: 4000,
  validateStatus: status => status >= 200 && status < 400,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json', // Preflight 요청을 유발하는 헤더
  },
});

axiosInstance.interceptors.request.use(async config => {
  try {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return config;
    }
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  } catch (err) {
    console.error('에러', err);
    return config;
  }
});

let isLoggingOut = false;
axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!isLoggingOut) {
        isLoggingOut = true;

        try {
          const newToken = await AuthService.post();

          if (newToken) {
            originalRequest.headers['Authorization'] = `Bearer ${newToken.data.accessToken}`;
            isLoggingOut = false;
            return axiosInstance(originalRequest);
          }
        } catch (e: any) {
          return Promise.reject(e);
        } finally {
          isLoggingOut = false;
        }
      }
    }

    return Promise.reject(error);
  },
);
