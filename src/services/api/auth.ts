import publicApi from '../config/publicApi.config';
import authApi from '../config/authApi.config';
import { LoginApiRequest, LoginApiResponse } from '@/types/api/auth';

const SERVICE_URL = '/auth'

export const login = async (data: LoginApiRequest) => {
  const response = await publicApi<LoginApiResponse>({
    method: 'POST',
    url: `${SERVICE_URL}/login`,
    data,
  });

  return response;
};

export const logout = () =>
  authApi({
    method: 'POST',
    url: `${SERVICE_URL}/logout`,
  });