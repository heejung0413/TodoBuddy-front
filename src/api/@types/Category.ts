export interface CategoryResponse {
  code: number;
  message: string;
  data: CategoryData[];
}

export interface CategoryData {
  categoryId: number;
  categoryName: string;
}

export interface PostCategoryRequest {
  categoryName: string;
  categoryId: number;
}

export interface DeleteCategoryRequest {
  categoryId: number;
}

export interface PatchCategoryRequest {
  categoryId: number;
  categoryName: string;
}

export interface PatchCategoryResponse {
  code: number;
  message: string;
  data: CategoryData;
}

export interface CategoryClient {
  get(): Promise<CategoryResponse>;
  post(request: PostCategoryRequest): Promise<void>;
  delete(request: DeleteCategoryRequest): Promise<void>;
  patch(request: PatchCategoryRequest): Promise<PatchCategoryResponse>;
}
