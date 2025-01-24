import { BaseListDataResponse } from "@/types/api/base";
import authApi from "../config/authApi.config";
import { CreateServiceCategoryRequest, ServiceCategory, UpdateServiceCategoryRequest } from "@/types/api/serviceCategory";
import { QueryParam } from "@/hooks/useQueryString";

export const getListServiceCategories = ({
  page,
  pageSize,
  search,
}: {
  page?: QueryParam;
  pageSize?: QueryParam;
  search?: QueryParam;
}) => authApi<BaseListDataResponse<ServiceCategory>>({
  method: 'GET',
  url: `/service-categories`,
  params: {
    page,
    pageSize,
    search,
  },
});

export const createServiceCategory = (data: CreateServiceCategoryRequest) => authApi<ServiceCategory>({
  method: 'POST',
  url: `/service-categories`,
  data,
});

export const updateServiceCategory = (serviceCategoryId: number, data: UpdateServiceCategoryRequest) => authApi<ServiceCategory>({
  method: 'PATCH',
  url: `/service-categories/${serviceCategoryId}`,
  data,
}); 