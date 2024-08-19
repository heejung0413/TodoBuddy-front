export interface GetMemoRequest {
  year: number;
  month: number;
}

export interface GetMemoResponse {
  code: number;
  message: string;
  data: MemoData[];
}

export interface MemoData {
  categoryName: string;
  categoryOrder: number;
  memoContent: string;
  memoLink: string;
  memoDeadline: string;
  memoCreatedDate: string;
}

export interface PostCreateMemoRequest{
  content: string;
  
}
