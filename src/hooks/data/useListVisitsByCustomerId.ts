import { BaseListDataResponse } from "@/types/api/base";
import { useQuery } from "@tanstack/react-query";
import { Visit } from "@/types/api/visit";
import { getListVisits } from "@/services/api/visit";

interface UseListVisitsProps {
  customerId?: number;
}

export const useListVisitsByCustomerId = ({ customerId = undefined }: UseListVisitsProps = {}) => {
  const page = '1';
  const pageSize = '100';

  const parseData = (data: BaseListDataResponse<Visit>) => {
    const { data: queryVisits, page, pageSize, total, totalPage } = data.result;

    const visits = queryVisits.map((visit) => ({
      ...visit,
    }));

    const pagination = {
      total,
      page,
      totalPage,
      pageSize,
    }

    return { visits, pagination };
  }

  const { data, isLoading } = useQuery({
    queryKey: ['visits', page, pageSize, customerId],
    queryFn: () => getListVisits({ 
      page: page,   
      pageSize: pageSize, 
      customerId: customerId ? customerId.toString() : undefined 
    }),
    select: (data) => parseData(data.data),
    enabled: !!page && !!pageSize,
  });

  return { 
    visits: data?.visits,
    pagination: data?.pagination,
    isLoading,
  };
}; 