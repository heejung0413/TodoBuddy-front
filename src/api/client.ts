import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://52.79.255.139:8080/api',
  timeout: 4000,
  validateStatus: status => status >= 200 && status < 400,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json', // Preflight 요청을 유발하는 헤더
  },
});
