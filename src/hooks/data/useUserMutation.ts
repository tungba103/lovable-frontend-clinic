import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createUser, updateUser } from '@/services/api/user';
import useQueryString from '../useQueryString';
import { CreateUserRequest, UpdateUserRequest } from '@/types/api/user';
import { toast } from 'react-toastify';

export const useUserMutation = () => {
  const queryClient = useQueryClient();
  const { queryString } = useQueryString();
  const { page, pageSize, search } = queryString;

  const createMutation = useMutation({
    mutationFn: async (data: CreateUserRequest) => {
      return createUser(data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['users', page, pageSize, search],
      });
      toast.success('Tạo người dùng thành công');
    },
    onError: (err) => {
      toast.error('Tạo người dùng thất bại');
      console.warn(err);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (params: { userId: number; data: UpdateUserRequest }) => {
      return updateUser(params.userId, params.data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['users', page, pageSize, search],
      });
      toast.success('Cập nhật người dùng thành công');
    },
    onError: (err) => {
      toast.error('Cập nhật người dùng thất bại');
      console.warn(err);
    },
  });

  return {
    createMutation,
    updateMutation,
  };
}; 