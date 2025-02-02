import { BaseListDataResponse } from "@/types/api/base";
import { useQuery } from "@tanstack/react-query";
import { Service } from "@/types/api/service";
import { getListServices } from "@/services/api/service";
import useQueryString from "../useQueryString";
import { useEffect } from "react";

export const useListServices = () => {
  const { queryString, setQueryString } = useQueryString();
  const { page, pageSize, search } = queryString;

  const parseData = (data: BaseListDataResponse<Service>) => {
    const { data: queryServices, page, pageSize, total, totalPage } = data.result;

    const services = queryServices.map((service) => ({
      ...service,
    }));

    const pagination = {
      total,
      page,
      totalPage,
      pageSize,
    }

    return { services, pagination };
  }

  useEffect(() => {
    if(!page && !pageSize) {
      setQueryString({ page: '1', pageSize: '10'});
    }
  }, [setQueryString, page, pageSize]);
  
  const { data, isLoading } = useQuery({
    queryKey: ['services', page, pageSize, search],
    queryFn: () => getListServices({ page, pageSize, search }),
    select: (data) => parseData(data.data),
    enabled: !!page && !!pageSize,
  });

  return { 
    data: data?.services,
    pagination: data?.pagination,
    isLoading,
  };
}; 