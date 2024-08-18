import { UserClient } from '../@types/User';
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
  postLogin: async request => {
    try {
      const response = await axiosInstance.post(`${ROUTE}/login`, request);
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  get: async () => {
    try {
      const response = await axiosInstance.post(`${ROUTE}/me`);
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
};
