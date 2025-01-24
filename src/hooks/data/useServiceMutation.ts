import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createService, updateService } from '@/services/api/service';
import useQueryString from '../useQueryString';
import { CreateServiceRequest, UpdateServiceRequest } from '@/types/api/service';
import { toast } from 'react-toastify';

export const useServiceMutation = () => {
  const queryClient = useQueryClient();
  const { queryString } = useQueryString();
  const { page, pageSize, search } = queryString;

  const createMutation = useMutation({
    mutationFn: async (data: CreateServiceRequest) => {
      return createService(data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['services', page, pageSize, search],
      });
      toast.success('Tạo dịch vụ thành công');
    },
    onError: (err) => {
      toast.error('Tạo dịch vụ thất bại');
      console.warn(err);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async (params: { serviceId: number; data: UpdateServiceRequest }) => {
      return updateService(params.serviceId, params.data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['services', page, pageSize, search],
      });
      toast.success('Cập nhật dịch vụ thành công');
    },
    onError: (err) => {
      toast.error('Cập nhật dịch vụ thất bại');
      console.warn(err);
    },
  });

  return {
    createMutation,
    updateMutation,
  };
}; 