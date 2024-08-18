//post signUp
export interface PostSignUpRequest {
  email: string;
  password: string;
  nickname: string;
}

export interface PostSignUpResponse {
  code: number;
  message: string;
  data: PostSignUpData;
}

export interface PostSignUpData {
  userId: number;
  email: string;
  nickname: string;
}

//delete
export interface DeleteUserResponse {
  code: number;
  message: string;
  data: Object;
}

//post check-email
export interface PostCheckEmailRequest {
  inputEmail: string;
}

export interface PostCheckEmailResponse {
  code: number;
  message: string;
  data: Object;
}

//post login
export interface PostLoginRequest {
  email: string;
  password: string;
}

export interface PostLoginResponse {
  code: number;
  message: string;
  data: PostLoginData;
}

export interface PostLoginData {
  accessToken: string;
}

//사용자 정보 조회
export interface GetUserResponse {
  code: number;
  message: string;
  data;
}

export interface UserData {
  email: string;
  nickname: string;
  role: string;
}

//아이디 비밀번호 인증코드
export interface PostChangePasswordCodeRequest {
  inputEmail: string;
}

export interface PostChangePasswordCodeResponse {
  code: number;
  message: string;
  data: ChangePasswordData;
}

export interface ChangePasswordData {
  verifyCode: string;
}

export interface PatchChangePasswordRequest {
  email: string;
  verificationCode: string;
  password: string;
  confirmPassword: string;
}

export interface PatchChangePasswordResponse {
  code: number;
  message: string;
  data: Object;
}

export interface UserClient {
  postSignup(request: PostSignUpRequest): Promise<PostSignUpResponse>;
  delete(): Promise<DeleteUserResponse>;
  postCheckEmail(request: PostCheckEmailRequest): Promise<PostCheckEmailResponse>;
  postLogin(request: PostLoginRequest): Promise<PostLoginResponse>;
  get(): Promise<GetUserResponse>;
  postCheckEmailCode(request: PostChangePasswordCodeRequest): Promise<PostChangePasswordCodeResponse>;
  patchPassword(request: PatchChangePasswordRequest): Promise<PatchChangePasswordResponse>;
}
