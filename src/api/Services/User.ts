import { PostLogoutRequest, UserClient } from '../@types/User';
import { axiosInstance } from '../client';

const ROUTE = '/users';

export const UserServices: UserClient = {
  postSignup: async request => {
    try {
      const response = await axiosInstance.post(`${ROUTE}`, request);
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  delete: async () => {
    try {
      const response = await axiosInstance.delete(`${ROUTE}`);
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  postCheckEmail: async request => {
    try {
      const response = await axiosInstance.post(`${ROUTE}/check-email`, request);
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  login: async request => {
    try {
      const response = await axiosInstance.post(`${ROUTE}/login`, request);
      const { refreshToken, accessToken, refreshTokenExpiredDate } = response.data.data.jwtToken;
      if (accessToken && refreshToken) {
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        localStorage.setItem('refreshTokenExpiredDate', refreshTokenExpiredDate);
      } else {
        console.error('Access token or refresh token is undefined');
      }
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  get: async () => {
    try {
      const response = await axiosInstance.get(`${ROUTE}/me`);
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  postCheckEmailCode: async request => {
    try {
      const response = await axiosInstance.post(`${ROUTE}/password`, request);
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  patchPassword: async request => {
    try {
      const response = await axiosInstance.patch(`${ROUTE}/password`, request);
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  logout: async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        const request: PostLogoutRequest = {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        };
        const response = await axiosInstance.post(`${ROUTE}/logout`, null, request);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        return response.data;
      }
    } catch (error) {
      throw new Error(error as string);
    }
  },
};
