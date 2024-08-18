import axios from 'axios';
import { logRequest } from './request';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/api',
  timeout: 4000,
  validateStatus: status => status >= 200 && status < 400,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(logRequest);
