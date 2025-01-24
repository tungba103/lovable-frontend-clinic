import { getListUsers } from "@/services/api/user";
import { BaseListDataResponse } from "@/types/api/base";
import { User } from "@/types/api/user";
import { useQuery } from "@tanstack/react-query";
import useQueryString from "../useQueryString";

export const useListUsers = () => {
  const { queryString } = useQueryString();
  const { page, pageSize, search } = queryString;

  const parseData = (data: BaseListDataResponse<User>) => {
    const { data: queryUsers, page, pageSize, total, totalPage } = data.result;

    const users = queryUsers.map((user) => ({
      ...user,
    }));

    const pagination = {
      total,
      page,
      totalPage,
      pageSize,
    };

    return { users, pagination };
  };

  const { data, isLoading } = useQuery({
    queryKey: ['users', page, pageSize, search],
    queryFn: () => getListUsers({ page, pageSize, search }),
    select: (data) => parseData(data.data),
  });

  return {
    users: data?.users,
    pagination: data?.pagination,
    isLoading,
  };
};
