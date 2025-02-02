import { BaseListDataResponse } from "@/types/api/base";
import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/api/product";
import { getListProducts } from "@/services/api/product";
import useQueryString from "../useQueryString";
import { useEffect } from "react";

interface UseListProductsProps {
  page?: string;
  pageSize?: string;
  search?: string;
  useQueryString?: boolean;
}

export const useListProducts = ({ 
  page: pageParam = '1', 
  pageSize: pageSizeParam = '10', 
  search: searchParam, 
  useQueryString: useQueryStringParam = true 
}: UseListProductsProps = {}) => {
  const { queryString, setQueryString } = useQueryString();
  const { page, pageSize, search } = queryString;

  const pageQuery = pageParam || page;
  const pageSizeQuery = pageSizeParam || pageSize;
  const searchQuery = searchParam || search;

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
    if(useQueryStringParam) {
      if(!pageQuery && !pageSizeQuery) {
        setQueryString({ page: '1', pageSize: '10'});
      }
    }
  }, [setQueryString, pageQuery, pageSizeQuery, useQueryStringParam]);
  
  const { data, isLoading } = useQuery({
    queryKey: ['products', pageQuery, pageSizeQuery, searchQuery],
    queryFn: () => getListProducts({ 
      page: pageQuery, 
      pageSize: pageSizeQuery, 
      search: searchQuery 
    }),
    select: (data) => parseData(data.data),
    enabled: !!pageQuery && !!pageSizeQuery,
  });

  return { 
    data: data?.products,
    pagination: data?.pagination,
    isLoading,
  };
}; 