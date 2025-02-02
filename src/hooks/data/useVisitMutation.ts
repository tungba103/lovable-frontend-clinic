import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVisit, updateVisit } from '@/services/api/visit';
import useQueryString from '../useQueryString';
import { CreateVisitRequest, UpdateVisitRequest } from '@/types/api/visit';
import { toast } from 'react-toastify';

export const useVisitMutation = () => {
  const queryClient = useQueryClient();
  const { queryString } = useQueryString();
  const { page, pageSize, search } = queryString;

  const createMutation = useMutation({
    mutationFn: async (data: CreateVisitRequest) => {
      return createVisit(data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['visits', page, pageSize, search],
      });
      toast.success('Tạo lượt khám thành công');
    },
    onError: (err) => {
      toast.error('Tạo lượt khám thất bại');
      console.warn(err);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (params: { visitId: number; data: UpdateVisitRequest }) => {
      console.log('params', params);
      return updateVisit(params.visitId, params.data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['visits', page, pageSize, search],
      });
      toast.success('Cập nhật lượt khám thành công');
    },
    onError: (err) => {
      toast.error('Cập nhật lượt khám thất bại');
      console.warn(err);
    },
  });

  return {
    createMutation,
    updateMutation,
  };
}; 