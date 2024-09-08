import { create } from 'zustand';

export type StatusState = {
  status: string;
  setStatus: (status: string) => void;
};

export const useStateStore = create<StatusState>(set => ({
  status: '',
  setStatus: (status: string) => {
    set({ status });
  },
}));
