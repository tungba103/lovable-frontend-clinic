import { useQuery } from '@tanstack/react-query';
import { getCustomer } from '@/services/api/customer';

export const useCustomer = (customerId: number | null) => {
  const { data, isLoading } = useQuery({
    queryKey: ['customer', customerId],
    queryFn: () => getCustomer(customerId!),
    enabled: !!customerId,
    select: (data) => data.data.result,
  });

  return { customer: data, isLoading };
}; 