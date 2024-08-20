export const MemoStatus = {
  NOT_COMPLETED: 'NOT_COMPLETED',
  COMPLETED: 'COMPLETED',
} as const;

export type TStatus = typeof MemoStatus;
