import { BaseListDataResponse } from "@/types/api/base";
import { useQuery } from "@tanstack/react-query";
import { Visit } from "@/types/api/visit";
import { getListVisits } from "@/services/api/visit";
import useQueryString from "../useQueryString";
import { useEffect } from "react";

export const useListVisits = () => {
  const { queryString, setQueryString } = useQueryString();

  const { page, pageSize, search } = queryString;

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

  useEffect(() => {
    if(!page && !pageSize) {
      setQueryString({ page: '1', pageSize: '10'});
    }
  }, [setQueryString, page, pageSize]);
  
  const { data, isLoading } = useQuery({
    queryKey: ['visits', page, pageSize, search],
    queryFn: () => getListVisits({ page: page, pageSize: pageSize, search: search }),
    select: (data) => parseData(data.data),
    enabled: !!page && !!pageSize,
  });

  return { 
    visits: data?.visits,
    pagination: data?.pagination,
    isLoading,
  };
}; 