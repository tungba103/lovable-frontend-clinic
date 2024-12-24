export interface User {
  id: number;
  username: string;
  name: string;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  UsersOnRoles: Array<{
    role: {
      code: string;
      name: string;
    };
  }>;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}