import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createServiceCategory, updateServiceCategory } from '@/services/api/serviceCategory';
import useQueryString from '../useQueryString';
import { CreateServiceCategoryRequest, UpdateServiceCategoryRequest } from '@/types/api/serviceCategory';
import { toast } from 'react-toastify';

export const useServiceCategoryMutation = () => {
  const queryClient = useQueryClient();
  const { queryString } = useQueryString();
  const { page, pageSize, search } = queryString;

  const createMutation = useMutation({
    mutationFn: async (data: CreateServiceCategoryRequest) => {
      return createServiceCategory(data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['serviceCategories', page, pageSize, search],
      });
      toast.success('Tạo danh mục dịch vụ thành công');
    },
    onError: (err) => {
      toast.error('Tạo danh mục dịch vụ thất bại');
      console.warn(err);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (params: { serviceCategoryId: number; data: UpdateServiceCategoryRequest }) => {
      return updateServiceCategory(params.serviceCategoryId, params.data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['serviceCategories', page, pageSize, search],
      });
      toast.success('Cập nhật danh mục dịch vụ thành công');
    },
    onError: (err) => {
      toast.error('Cập nhật danh mục dịch vụ thất bại');
      console.warn(err);
    },
  });

  return {
    createMutation,
    updateMutation,
  };
}; 