import axios from 'axios';
import { AuthService } from './Services/Auth';
import { UserServices } from './Services/User';

export const axiosInstance = axios.create({
  baseURL: 'https://api.todobuddy.site/api',
  timeout: 4000,
  validateStatus: status => status >= 200 && status < 400,
  withCredentials: true,
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

    if (error.response.status === 401) {
      if (!isLoggingOut) {
        isLoggingOut = true;
        try {
          localStorage.removeItem('accessToken');
          const accessToken = await AuthService.post();
          if (accessToken) {
            originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
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
