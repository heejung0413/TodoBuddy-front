import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://localhost:3000/api', // NOTE: vite proxy
  timeout: 4000,
  validateStatus: status => status >= 200 && status < 400,
  withCredentials: true,
});
