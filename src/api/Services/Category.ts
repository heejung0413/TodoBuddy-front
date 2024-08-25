import { CategoryClient } from '../@types/Category';
import { axiosInstance } from '../client';

const ROUTE = '/categories';

export const CategoryServices: CategoryClient = {
  get: async () => {
    try {
      const response = await axiosInstance.get(`${ROUTE}`);
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  post: async request => {
    try {
      const response = await axiosInstance.post(`${ROUTE}`, request);
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  delete: async ({ categoryId }) => {
    try {
      const response = await axiosInstance.delete(`${ROUTE}/${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  patch: async ({ categoryId, ...request }) => {
    try {
      const response = await axiosInstance.patch(`${ROUTE}/${categoryId}`, request);
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
};
