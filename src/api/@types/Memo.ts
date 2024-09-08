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
  memoDeadLine: string;
  memoStatus: string;
}

export interface GetMemoData extends MemoData {
  memoCreatedDate: string;
  memoStatus: string;
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
  memoDeadLine?: string | null;
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
  memoStatus: string;
}

export interface MemoClient {
  get(request: GetMemoRequest): Promise<GetMemoResponse>;
  post(request: PostCreateMemoRequest): Promise<PostCreateMemoResponse>;
  delete(request: DeleteMemoRequest): Promise<DeleteMemoResponse>;
  patchMemo(request: PatchMemoRequest): Promise<PatchMemoResponse>;
  patchStatus(request: PatchMemoStatusRequest): Promise<PatchMemoStatusResponse>;
}

data: [
  {
    CategoryOrderId: 1,
    MemoDeadLine: '2024-09-02T15:58:35.832Z',
  },
  {
    CategoryOrderId: 2,
    MemoDeadLine: '2024-09-02T15:58:35.832Z',
  },
];

// 1) 이런 식으로 deadline이 있는 메모들로만 필터링해 데이터를 가져오고
// 2) categoryOrderId(order아이디에 따라 캘린더에 다르게 색깔 표시할 용도),
// 3) MemoDeadline 값 건네주면 좋을 것 같습니다...!! ✨🥹
