import { BaseListDataResponse } from "@/types/api/base";
import { useQuery } from "@tanstack/react-query";
import { ServiceCategory } from "@/types/api/serviceCategory";
import { getListServiceCategories } from "@/services/api/serviceCategory";
import useQueryString from "../useQueryString";
import { useEffect } from "react";

export const useListServiceCategories = () => {
  const { queryString, setQueryString } = useQueryString();
  const { page, pageSize, search } = queryString;

  const parseData = (data: BaseListDataResponse<ServiceCategory>) => {
    const { data: queryServiceCategories, page, pageSize, total, totalPage } = data.result;

    const serviceCategories = queryServiceCategories.map((category) => ({
      ...category,
    }));

    const pagination = {
      total,
      page,
      totalPage,
      pageSize,
    }

    return { serviceCategories, pagination };
  }

  useEffect(() => {
    if(!page && !pageSize) {
      setQueryString({ page: '1', pageSize: '10'});
    }
  }, [setQueryString, page, pageSize]);
  
  const { data, isLoading } = useQuery({
    queryKey: ['serviceCategories', page, pageSize, search],
    queryFn: () => getListServiceCategories({ page, pageSize, search }),
    select: (data) => parseData(data.data),
    enabled: !!page && !!pageSize,
  });

  return { 
    serviceCategories: data?.serviceCategories,
    pagination: data?.pagination,
    isLoading,
  };
}; 