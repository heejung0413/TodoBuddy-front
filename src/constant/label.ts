import { MemoStatus, TMemoStatus } from '@/api/@types/@asConst';

export const MEMO_STATUS_LABEL: Record<keyof TMemoStatus, string> = {
  [MemoStatus.COMPLETED]: '완료',
  [MemoStatus.NOT_COMPLETED]: '미완료',
};
