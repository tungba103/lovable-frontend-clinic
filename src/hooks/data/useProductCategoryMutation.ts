import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProductCategory, updateProductCategory } from '@/services/api/productCategory';
import useQueryString from '../useQueryString';
import { CreateProductCategoryRequest, UpdateProductCategoryRequest } from '@/types/api/productCategory';
import { toast } from 'react-toastify';

export const useProductCategoryMutation = () => {
  const queryClient = useQueryClient();
  const { queryString } = useQueryString();
  const { page, pageSize, search } = queryString;

  const createMutation = useMutation({
    mutationFn: async (data: CreateProductCategoryRequest) => {
      return createProductCategory(data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['productCategories', page, pageSize, search],
      });
      toast.success('Tạo danh mục sản phẩm thành công');
    },
    onError: (err) => {
      toast.error('Tạo danh mục sản phẩm thất bại');
      console.warn(err);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (params: { productCategoryId: number; data: UpdateProductCategoryRequest }) => {
      return updateProductCategory(params.productCategoryId, params.data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['productCategories', page, pageSize, search],
      });
      toast.success('Cập nhật danh mục sản phẩm thành công');
    },
    onError: (err) => {
      toast.error('Cập nhật danh mục sản phẩm thất bại');
      console.warn(err);
    },
  });

  return {
    createMutation,
    updateMutation,
  };
}; 