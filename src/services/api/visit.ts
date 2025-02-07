import { BaseDataResponse, BaseListDataResponse } from "@/types/api/base";
import authApi from "../config/authApi.config";
import { CreateVisitRequest, UpdateVisitRequest, Visit } from "@/types/api/visit";
import { QueryParam } from "@/hooks/useQueryString";

export const getListVisits = ({
  page,
  pageSize,
  search,
  customerId,
}: {
  page?: QueryParam;
  pageSize?: QueryParam;
  search?: QueryParam;
  customerId?: QueryParam;
}) => authApi<BaseListDataResponse<Visit>>({
  method: 'GET',
  url: `/visits`,
  params: {
    page,
    pageSize,
      search,
      customerId,
    },
  });

export const getVisit = (visitId: number) => authApi<BaseDataResponse<Visit>>({
  method: 'GET',
  url: `/visits/${visitId}`,
});

export const createVisit = (data: CreateVisitRequest) => authApi<BaseDataResponse<Visit>>({
  method: 'POST',
  url: `/visits`,
  data,
});

export const updateVisit = (visitId: number, data: UpdateVisitRequest) => authApi<BaseDataResponse<Visit>>({
  method: 'PATCH',
  url: `/visits/${visitId}`,
  data,
});

export const cancelVisit = (visitId: number) => authApi<BaseDataResponse<Visit>>({
  method: 'DELETE',
  url: `/visits/${visitId}`,
});
