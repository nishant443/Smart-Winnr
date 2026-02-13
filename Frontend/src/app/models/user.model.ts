export interface User {
  _id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
  isActive: boolean;
  isBanned?: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export interface AuthResponse {
  status: string;
  data: {
    _id: string;
    name: string;
    email: string;
    role: string;
    isBanned?: boolean;
    token: string;
  };
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  name: string;
  email: string;
  password: string;
  role?: string;
}
