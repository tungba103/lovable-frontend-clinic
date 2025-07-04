import React, { createContext, useState, useEffect, useCallback, useMemo } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { login } from '@/services/api';
import token from '@/utils/token';
import { User } from '@/types/api/user';
import { refreshToken as refreshTokenApi } from '@/services/api/auth';
interface IAuthContext {
  isAuthenticated: boolean | null;
  me: User | null;
  loginWithUsername: (
    data: { username: string; password: string },
    onSuccess: () => void,
    onError: (error: AxiosError) => void
  ) => Promise<void>;
  saveSession: (accessToken: string, refreshToken: string, user: User) => void;
  logout: () => Promise<void>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<IAuthContext>({
  isAuthenticated: null,
  me: null,
  loginWithUsername: async () => {},
  saveSession: () => {},
  logout: async () => {},
});

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [me, setMe] = useState<User | null>(null);

  const { toast } = useToast();

  const logout = useCallback(async () => {
    try {
      // Add API call to logout endpoint if needed
      localStorage.removeItem('refreshToken');
      setMe(null);
      setIsAuthenticated(false);
      queryClient.clear();
      toast({
        title: 'Logged out successfully',
        variant: 'default',
      });
      navigate('/', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
      toast({
        title: 'Logout failed',
        variant: 'destructive',
      });
    }
  }, [navigate, toast, queryClient]);

  const refreshSession = useCallback(
    async (token: string) => {
      try {
        const response = await refreshTokenApi(token);

        if (!response.data.result) throw new Error('Refresh failed');

        const { accessToken, refreshToken, user } = response.data.result;

        saveSession(accessToken, refreshToken, user);

        setIsAuthenticated(true);

        return true;
      } catch (error) {
        console.error('Refresh failed:', error);
        toast({
          title: 'Refresh failed',
          variant: 'destructive',
        });
        console.log('refreshSession logout');
        logout();
        queryClient.clear();
        return false;
      }
    },
    [toast, logout, queryClient]
  );

  const saveSession = (accessToken: string, refreshToken: string, user: User) => {
    console.debug('saveSession');
    token.setRefreshToken(refreshToken);
    token.setAccessToken(accessToken);

    setMe(user);
  };

  const loginWithUsername = useCallback(
    async (
      data: { username: string; password: string },
      onSuccess: () => void,
      onError: (error: AxiosError) => void
    ) => {
      try {
        const response = await login(data);

        if (!response.data) throw new Error('Login failed');

        const responseData = response.data.result;
        console.log('responseData', responseData);
        saveSession(responseData.accessToken, responseData.refreshToken, responseData.user);
        setIsAuthenticated(true);

        onSuccess?.();
        navigate('/', { replace: true });
      } catch (error) {
        if (onError) onError(error as AxiosError);
      }
    },
    [navigate]
  );

  useEffect(() => {
    if (me === null) {
      const storedRefreshToken = localStorage.getItem('refreshToken');

      if (storedRefreshToken) {
        refreshSession(storedRefreshToken);
      } else {
        setIsAuthenticated(false);
      }
    }
  }, [refreshSession, me]);

  const value = useMemo(
    () => ({
      isAuthenticated,
      me,
      loginWithUsername,
      saveSession,
      logout,
    }),
    [isAuthenticated, me, loginWithUsername, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
