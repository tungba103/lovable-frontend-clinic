import authApi from '../config/authApi.config';
import { BaseListDataResponse } from '@/types/api/base';
import { User } from '@/types/api/user';

export const getListUsers = (
  page: number = 1, 
  pageSize: number = 10
) => authApi<BaseListDataResponse<User>>({
  method: 'GET',
  url: `/users`,
  params: {
    page,
    pageSize,
  },
});
