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

axiosInstance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const newAccessToken = await AuthService.post();
          if (newAccessToken) {
            // 새로 발급된 액세스 토큰을 헤더에 추가
            originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest); // 원래의 요청을 다시 시도
          }
        }
      } catch (e: any) {
        if (e.response.data === 401) {
          console.log('eeeee');
          return Promise.reject(e);
        }
      }
    }
    return Promise.reject(error);
  },
);
