export interface AuthRequest {
  headers: {
    Authorization: string;
  };
}

export interface AuthResponse {
  code: number;
  message: string;
  data: AuthData;
}

export interface AuthData {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
}

export interface AuthClient {
  post(): Promise<AuthResponse>;
}
