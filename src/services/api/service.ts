import { BaseListDataResponse } from "@/types/api/base";
import authApi from "../config/authApi.config";
import { CreateServiceRequest, Service, UpdateServiceRequest } from "@/types/api/service";
import { QueryParam } from "@/hooks/useQueryString";

export const getListServices = ({
  page,
  pageSize,
  search,
}: {
  page?: QueryParam;
  pageSize?: QueryParam;
  search?: QueryParam;
}) => authApi<BaseListDataResponse<Service>>({
  method: 'GET',
  url: `/services`,
  params: {
    page,
    pageSize,
    search,
  },
});

export const createService = (data: CreateServiceRequest) => authApi<Service>({
  method: 'POST',
  url: `/services`,
  data,
});

export const updateService = (serviceId: number, data: UpdateServiceRequest) => authApi<Service>({
  method: 'PATCH',
  url: `/services/${serviceId}`,
  data,
}); 