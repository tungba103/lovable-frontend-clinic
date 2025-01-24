import { BaseListDataResponse } from "@/types/api/base";
import { useQuery } from "@tanstack/react-query";
import { ProductCategory } from "@/types/api/productCategory";
import { getListProductCategories } from "@/services/api/productCategory";
import useQueryString from "../useQueryString";
import { useEffect } from "react";

export const useListProductCategories = () => {
  const { queryString, setQueryString } = useQueryString();
  const { page, pageSize, search } = queryString;

  const parseData = (data: BaseListDataResponse<ProductCategory>) => {
    const { data: queryProductCategories, page, pageSize, total, totalPage } = data.result;

    const productCategories = queryProductCategories.map((category) => ({
      ...category,
    }));

    const pagination = {
      total,
      page,
      totalPage,
      pageSize,
    }

    return { productCategories, pagination };
  }

  useEffect(() => {
    if(!page && !pageSize) {
      setQueryString({ page: '1', pageSize: '10'});
    }
  }, [setQueryString, page, pageSize]);
  
  const { data, isLoading } = useQuery({
    queryKey: ['productCategories', page, pageSize, search],
    queryFn: () => getListProductCategories({ page, pageSize, search }),
    select: (data) => parseData(data.data),
    enabled: !!page && !!pageSize,
  });

  return { 
    productCategories: data?.productCategories,
    pagination: data?.pagination,
    isLoading,
  };
}; 