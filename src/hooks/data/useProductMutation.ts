import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createProduct, updateProduct } from '@/services/api/product';
import useQueryString from '../useQueryString';
import { CreateProductRequest, UpdateProductRequest } from '@/types/api/product';
import { toast } from 'react-toastify';

export const useProductMutation = () => {
  const queryClient = useQueryClient();
  const { queryString } = useQueryString();
  const { page, pageSize, search } = queryString;

  const createMutation = useMutation({
    mutationFn: async (data: CreateProductRequest) => {
      return createProduct(data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['products', page, pageSize, search],
      });
      toast.success('Tạo thuốc thành công');
    },
    onError: (err) => {
      toast.error('Tạo thuốc thất bại');
      console.warn(err);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (params: { productId: number; data: UpdateProductRequest }) => {
      return updateProduct(params.productId, params.data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['products', page, pageSize, search],
      });
      toast.success('Cập nhật thuốc thành công');
    },
    onError: (err) => {
      toast.error('Cập nhật thuốc thất bại');
      console.warn(err);
    },
  });

  return {
    createMutation,
    updateMutation,
  };
}; 