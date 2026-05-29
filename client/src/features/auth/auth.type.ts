export interface User {
  id: number;
  name: string;
  email: string;
  role: "ADMIN" | "PATIENT";
  createdAt: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  passwordHash: string;
}

export interface RegisterResponse {
  data: User;
  message: string;
}

export interface LoginRequest {
  email: string;
  password:  string;
}

export interface LoginResponse {
  data: {
    user: User;
  };
  message: string;
}

export interface MeResponse {
  data: User;
  message: string;
}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export interface UpdateProfileResponse {
  data: User;
  message: string;
}