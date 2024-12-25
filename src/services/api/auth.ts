import publicApi from '../config/publicApi.config';
import authApi from '../config/authApi.config';
import { LoginApiResponse } from '@/types/api/auth';

const SERVICE_URL = '/auth'

export const login = async (username: string, password: string) => publicApi<LoginApiResponse>({
    method: 'POST',
    url: `${SERVICE_URL}/login`,
    data: { username, password },
})

export const logout = () =>
  authApi({
    method: 'POST',
    url: `${SERVICE_URL}/logout`,
    withCredentials: true,
  });