export interface GetMemoRequest {
  memoStatus: string | null;
}

export interface GetMemoResponse {
  code: number;
  message: string;
  data: MemoData[];
}

export interface MemoData {
  categoryId: number;
  categoryOrderId: number;
  memoId: number;
  memoContent: string;
  memoLink: string;
  memoDeadline: string;
  memoStatus: string;
}

export interface GetMemoData extends MemoData {
  memoCreatedDate: string;
  memoStatus: keyof TStatus;
}

export interface PostCreateMemoRequest {
  memoContent: string;
  memoLink?: string;
  memoDeadLine?: string;
  categoryId: number;
}

export interface PostCreateMemoResponse {
  code: number;
  message: string;
  data: MemoData;
}

export interface DeleteMemoRequest {
  memoId: number;
}

export interface DeleteMemoResponse {
  code: number;
  message: string;
}

export interface PatchMemoRequest {
  memoId: number;
  memoDeadLine?: string;
  memoContent: string;
  memoLink?: string;
  categoryId: number;
}

export interface PatchMemoResponse {
  code: number;
  message: string;
  data: MemoData;
}

export interface PatchMemoStatusRequest {
  memoId: number;
  memoStatus: string | null;
}

export interface PatchMemoStatusResponse {
  code: number;
  message: string;
  data: PatchMemoData;
}

export interface PatchMemoData {
  memoId: number;
  memoStatus: keyof TStatus;
}

export interface MemoClient {
  get(request: GetMemoRequest): Promise<GetMemoResponse>;
  post(request: PostCreateMemoRequest): Promise<PostCreateMemoResponse>;
  delete(request: DeleteMemoRequest): Promise<DeleteMemoResponse>;
  patchMemo(request: PatchMemoRequest): Promise<PatchMemoResponse>;
  patchStatus(request: PatchMemoStatusRequest): Promise<PatchMemoStatusResponse>;
}
