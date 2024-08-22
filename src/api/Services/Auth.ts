import { AuthClient } from '../@types/Auth';
import { axiosInstance } from '../client';

const ROUTE = '/auth';

export const AuthService: AuthClient = {
  post: async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      const request = {
        headers: {
          Authorization: `Bearer ${refreshToken}`,
        },
      };
      const response = await axiosInstance.post(`${ROUTE}/reissue`, null, request);
      localStorage.setItem('accessToken', response.data.data.accessToken);
      return response.data;
    } catch (error) {
      throw new Error(error as string);
    }
  },
};
