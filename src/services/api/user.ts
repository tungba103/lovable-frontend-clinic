import { BaseListDataResponse } from "@/types/api/base";
import authApi from "../config/authApi.config";
import { CreateUserRequest, UpdateUserRequest, User } from "@/types/api/user";
import { QueryParam } from "@/hooks/useQueryString";

export const getListUsers = ({
  page,
  pageSize,
  search,
}: {
  page?: QueryParam;
  pageSize?: QueryParam;
  search?: QueryParam;
}) => authApi<BaseListDataResponse<User>>({
  method: 'GET',
  url: `/users`,
  params: {
    page,
    pageSize,
    search,
  },
});

export const createUser = (data: CreateUserRequest) => authApi<User>({
  method: 'POST',
  url: `/users`,
  data,
});

export const updateUser = (userId: number, data: UpdateUserRequest) => authApi<User>({
  method: 'PATCH',
  url: `/users/${userId}`,
  data,
});
