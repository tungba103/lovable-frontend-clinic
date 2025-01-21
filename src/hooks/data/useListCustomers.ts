import { BaseListDataResponse } from "@/types/api/base";
import { useQuery } from "@tanstack/react-query";
import { Customer } from "@/types/api/customer";
import { getListCustomers } from "@/services/api/customer";
import useQueryString from "../useQueryString";
import { useEffect } from "react";

export const useListCustomers = () => {
  const { queryString, setQueryString } = useQueryString();

  const { page, pageSize, search } = queryString;

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
    if(!page && !pageSize) {
      setQueryString({ page: '1', pageSize: '10'});
    }
  }, [setQueryString,page, pageSize]);
  
  const { data, isLoading } = useQuery({
    queryKey: ['customers', page, pageSize, search],
    queryFn: () => getListCustomers({ page: page, pageSize: pageSize, search: search }),
    select: (data) => parseData(data.data),
    enabled: !!page && !!pageSize,
  });

  return { 
    customers: data?.customers,
    pagination: data?.pagination,

    isLoading,
  };
};
