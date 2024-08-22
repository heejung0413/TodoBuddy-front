import { create } from 'zustand';

export type TokenState = {
  refresh: string | null;
  setRefresh: (refresh: string) => void;
  access: string | null;
  setAccess: (access: string) => void;
};

export const useTokenStore = create<TokenState>(set => ({
  refresh: localStorage.getItem('refreshToken'),
  setRefresh: refresh => {
    set({ refresh });
    localStorage.setItem('refreshToken', refresh || '');
  },
  access: localStorage.getItem('accessToken'),
  setAccess: access => {
    set({ access });
    localStorage.setItem('refreshToken', access || '');
  },
}));
