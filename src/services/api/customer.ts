import { BaseListDataResponse } from "@/types/api/base";
import authApi from "../config/authApi.config";
import { CreateCustomerRequest, Customer, UpdateCustomerRequest } from "@/types/api/customer";
import { QueryParam } from "@/hooks/useQueryString";

export const getListCustomers = ({
  page,
  pageSize,
  search,
}: {
  page?: QueryParam;
  pageSize?: QueryParam;
  search?: QueryParam;
}) => authApi<BaseListDataResponse<Customer>>({
  method: 'GET',
  url: `/customers`,
  params: {
    page,
    pageSize,
    search,
  },
});

export const createCustomer = (data: CreateCustomerRequest) => authApi<Customer>({
  method: 'POST',
  url: `/customers`,
  data,
});

export const updateCustomer = (customerId: number, data: UpdateCustomerRequest) => authApi<Customer>({
  method: 'PATCH',
  url: `/customers/${customerId}`,
  data,
});
