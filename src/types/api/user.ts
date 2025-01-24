export interface User {
  id: number;
  username: string;
  password: string;
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

export interface CreateUserRequest {
  username: string;
  name: string;
  password: string;
} 

export interface UpdateUserRequest {
  name: string;
  password: string;
}