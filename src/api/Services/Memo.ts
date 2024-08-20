import { MemoClient } from '../@types/Memo';
import { axiosInstance } from '../client';

const ROUTE = '/memos';

export const UserServices: MemoClient = {
  get: async request => {
    try {
      const response = await axiosInstance.get(`${ROUTE}`, { params: request });
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
  delete: async ({ memoId }) => {
    try {
      const response = await axiosInstance.delete(`${ROUTE}/${memoId}`);
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  patchMemo: async ({ memoId, ...request }) => {
    try {
      const response = await axiosInstance.patch(`${ROUTE}/${memoId}`, request);
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
  patchStatus: async ({ memoId, ...request }) => {
    try {
      const response = await axiosInstance.patch(`${ROUTE}/${memoId}/status`, request);
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
};
