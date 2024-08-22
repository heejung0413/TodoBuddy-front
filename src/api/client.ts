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

// axiosInstance.interceptors.response.use(
//   response => {
//     return response;
//   },
//   async error => {
//     const originalRequest = error.config;

//     if (error.response.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true;

//       try {
//         const result = await AuthService.post();
//         originalRequest.headers.Authorization = `Bearer ${result.data.accessToken}`;

//         const { accessToken } = result.data;
//         originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;

//         return axiosInstance(originalRequest);
//       } catch (e) {
//         return e;
//       }
//     }
//     return Promise.reject(error);
//   },
// );
