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
      const accessToken = response.data.data.accessToken;
      localStorage.removeItem('accessToken');
      localStorage.setItem('accessToken', accessToken);
      return accessToken as string;
    } catch (error) {
      throw error;
    }
  },
};
