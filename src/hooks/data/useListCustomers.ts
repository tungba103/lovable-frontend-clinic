import { BaseListDataResponse } from "@/types/api/base";
import { useQuery } from "@tanstack/react-query";
import { Customer } from "@/types/api/customer";
import { getListCustomers } from "@/services/api/customer";
import useQueryString from "../useQueryString";
import { useEffect } from "react";

interface UseListCustomersProps {
  page?: string;
  pageSize?: string;
  search?: string;
  useQueryString?: boolean;
}

export const useListCustomers = ({ page: pageParam = '1', pageSize: pageSizeParam = '10', search: searchParam, useQueryString: useQueryStringParam = true }: UseListCustomersProps = {}) => {
  const { queryString, setQueryString } = useQueryString();

  const { page, pageSize, search } = queryString;

  const pageQuery = pageParam || page;
  const pageSizeQuery = pageSizeParam || pageSize;
  const searchQuery = searchParam || search;

  const parseData = (data: BaseListDataResponse<Customer>) => {
    const { data: queryCustomers, page, pageSize, total, totalPage } = data.result;

    const customers = queryCustomers.map((customer) => ({
      ...customer,
    }));

    const pagination = {
      total,
      page,
      totalPage,
      pageSize,
    }

    return { customers, pagination };
  }

  useEffect(() => {
    if(useQueryStringParam) {
      if(!pageQuery && !pageSizeQuery) {
        setQueryString({ page: '1', pageSize: '10'});
      }
    }
  }, [setQueryString,pageQuery, pageSizeQuery, useQueryStringParam]);
  
  const { data, isLoading } = useQuery({
    queryKey: ['customers', pageQuery, pageSizeQuery, searchQuery],
    queryFn: () => getListCustomers({ page: pageQuery, pageSize: pageSizeQuery, search: searchQuery }),
    select: (data) => parseData(data.data),
    enabled: !!pageQuery && !!pageSizeQuery,
  });

  return { 
    data: data?.customers,
    pagination: data?.pagination,

    isLoading,
  };
};
