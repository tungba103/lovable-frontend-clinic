import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCustomer, updateCustomer } from '@/services/api/customer';
import useQueryString from '../useQueryString';
import { CreateCustomerRequest, UpdateCustomerRequest } from '@/types/api/customer';
import { toast } from 'react-toastify';

export const useCustomerMutation = () => {
  const queryClient = useQueryClient();

  const { 
    queryString } = useQueryString();

  const { page, pageSize, search } = queryString;

  const createMutation = useMutation({
    mutationFn: async (data: CreateCustomerRequest) => {
      return createCustomer(data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['customers', page, pageSize, search],
      });

      toast.success('Tạo khách hàng thành công');

    },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      switch (err.response?.data?.message) {
        case 'Name And Parent phone number already exists':
          toast.error('Bệnh nhân đã tồn tại');
          break;
        case 'Name And Birth Date already exists':
          toast.error('Bệnh nhân đã tồn tại');
          break;
        default:
          toast.error('Tạo khách hàng thất bại');
      }
      console.warn(err);
    },
  });
  const updateMutation = useMutation({
    mutationFn: async (params: { customerId: number; data: UpdateCustomerRequest }) => {
      return updateCustomer(params.customerId, params.data);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['customers', page, pageSize, search],
      });

      toast.success('Cập nhật khách hàng thành công');
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (err: any) => {
      switch (err.response?.data?.message) {
        case 'Name And Parent phone number already exists':
          toast.error('Bệnh nhân đã tồn tại');
          break;
        case 'Name And Birth Date already exists':
          toast.error('Bệnh nhân đã tồn tại');
          break;
        default:
          toast.error('Cập nhật khách hàng thất bại');
      }
      console.warn(err);
    },
  });

  return {
    createMutation,
    updateMutation,
  };
};
