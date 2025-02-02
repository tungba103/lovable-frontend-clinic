import { BaseListDataResponse } from "@/types/api/base";
import { useQuery } from "@tanstack/react-query";
import { Service } from "@/types/api/service";
import { getListServices } from "@/services/api/service";
import useQueryString from "../useQueryString";
import { useEffect } from "react";

interface UseListServicesProps {
  page?: string;
  pageSize?: string;
  search?: string;
  useQueryString?: boolean;
}

export const useListServices = ({ 
  page: pageParam = '1', 
  pageSize: pageSizeParam = '10', 
  search: searchParam, 
  useQueryString: useQueryStringParam = true 
}: UseListServicesProps = {}) => {
  const { queryString, setQueryString } = useQueryString();
  const { page, pageSize, search } = queryString;

  const pageQuery = pageParam || page;
  const pageSizeQuery = pageSizeParam || pageSize;
  const searchQuery = searchParam || search;

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
    if(useQueryStringParam) {
      if(!pageQuery && !pageSizeQuery) {
        setQueryString({ page: '1', pageSize: '10'});
      }
    }
  }, [setQueryString, pageQuery, pageSizeQuery, useQueryStringParam]);
  
  const { data, isLoading } = useQuery({
    queryKey: ['services', pageQuery, pageSizeQuery, searchQuery],
    queryFn: () => getListServices({ 
      page: pageQuery, 
      pageSize: pageSizeQuery, 
      search: searchQuery 
    }),
    select: (data) => parseData(data.data),
    enabled: !!pageQuery && !!pageSizeQuery,
  });

  return { 
    data: data?.services,
    pagination: data?.pagination,
    isLoading,
  };
}; 