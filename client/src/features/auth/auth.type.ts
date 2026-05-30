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
  password: string;
}

export interface LoginRequest {
  email: string;
  password:  string;
}

export interface LoginResponse {
  user: User;
}

export type RegisterResponse = User;

export interface MeResponse extends User {}

export interface UpdateProfileRequest {
  name?: string;
  email?: string;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
}

export type UpdateProfileResponse = User;