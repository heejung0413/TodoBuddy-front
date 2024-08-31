import { create } from 'zustand';

export type RenderState = {
  render: boolean;
  setRender: (render: boolean) => void;
};

export const useRenderStore = create<RenderState>(set => ({
  render: false,
  setRender: (render: boolean) => {
    set({ render });
  },
}));
