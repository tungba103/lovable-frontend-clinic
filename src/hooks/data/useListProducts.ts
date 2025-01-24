import { BaseListDataResponse } from "@/types/api/base";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/api/product";
import { getListProducts } from "@/services/api/product";
import useQueryString from "../useQueryString";
import { useEffect } from "react";

export const useListProducts = () => {
  const { queryString, setQueryString } = useQueryString();
  const { page, pageSize, search } = queryString;

  const parseData = (data: BaseListDataResponse<Product>) => {
    const { data: queryProducts, page, pageSize, total, totalPage } = data.result;

    const products = queryProducts.map((product) => ({
      ...product,
    }));

    const pagination = {
      total,
      page,
      totalPage,
      pageSize,
    }

    return { products, pagination };
  }

  useEffect(() => {
    if(!page && !pageSize) {
      setQueryString({ page: '1', pageSize: '10'});
    }
  }, [setQueryString, page, pageSize]);
  
  const { data, isLoading } = useQuery({
    queryKey: ['products', page, pageSize, search],
    queryFn: () => getListProducts({ page, pageSize, search }),
    select: (data) => parseData(data.data),
    enabled: !!page && !!pageSize,
  });

  return { 
    products: data?.products,
    pagination: data?.pagination,
    isLoading,
  };
}; 