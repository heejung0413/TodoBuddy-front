import { create } from 'zustand';

export type DateState = {
  date: Date;
  setDate: (date: Date) => void;
};

export const useDateStore = create<DateState>(set => ({
  date: new Date(),
  setDate: (date: Date) => {
    set({ date });
  },
}));
