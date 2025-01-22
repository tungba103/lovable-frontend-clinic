import { BaseListDataResponse } from "@/types/api/base";
import authApi from "../config/authApi.config";
import { CreateVisitRequest, UpdateVisitRequest, Visit } from "@/types/api/visit";
import { QueryParam } from "@/hooks/useQueryString";

export const getListVisits = ({
  page,
  pageSize,
  search,
}: {
  page?: QueryParam;
  pageSize?: QueryParam;
  search?: QueryParam;
}) => authApi<BaseListDataResponse<Visit>>({
  method: 'GET',
  url: `/visits`,
  params: {
    page,
    pageSize,
    search,
  },
});

export const getVisit = (visitId: number) => authApi<Visit>({
  method: 'GET',
  url: `/visits/${visitId}`,
});

export const createVisit = (data: CreateVisitRequest) => authApi<Visit>({
  method: 'POST',
  url: `/visits`,
  data,
});

export const updateVisit = (visitId: number, data: UpdateVisitRequest) => authApi<Visit>({
  method: 'PATCH',
  url: `/visits/${visitId}`,
  data,
});
