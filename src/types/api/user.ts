export interface UserResponse {
  page: number;
  pageSize: number;
  totalPage: number;
  total: number;
  data: User[];
}

export interface User {
  id: number;
  username: string;
  name: string;
  avatarUrl: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}