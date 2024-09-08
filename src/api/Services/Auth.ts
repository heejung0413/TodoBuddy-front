import { AuthClient } from '../@types/Auth';
import { axiosInstance } from '../client';

const ROUTE = '/auth';
export const AuthService: AuthClient = {
  post: async () => {
    try {
      const response = await axiosInstance.post(`${ROUTE}/reissue`);
      const accessToken = response.data.data.accessToken;
      localStorage.setItem('accessToken', accessToken);
      return accessToken;
    } catch (error) {
      throw error;
    }
  },
};
