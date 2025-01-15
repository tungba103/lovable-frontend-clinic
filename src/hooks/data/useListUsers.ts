import { getListUsers } from "@/services/api";
import { BaseListDataResponse } from "@/types/api/base";
import { User } from "@/types/api/user";
import { useQuery } from "@tanstack/react-query";

export const useListUsers = () => {
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
    }

    return { users, pagination };
  }
  
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: () => getListUsers(1, 10),
    select: (data) => parseData(data.data),
  });

  return { 
    users: data?.users,
    pagination: data?.pagination,

    isLoading,
  };
};
