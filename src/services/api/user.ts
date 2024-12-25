import { UserResponse } from '@/types/api/user';
import authApi from '../config/authApi.config';

export const getUsers = async (page: number = 1, pageSize: number = 10): Promise<UserResponse> => {
  const response = await authApi.get(`/api/v1/users?page=${page}&pageSize=${pageSize}`);
  return response.data;
};