import React, { useContext } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { AuthContext } from '@/contexts/AuthContext';
import AuthLoading from './AuthLoading';

interface IRequireAuthContainerProps {
  navigateTo: string;
  redirect?: boolean;
}

const RequireAuthContainer: React.FC<IRequireAuthContainerProps> = ({ navigateTo = '/sign-in', redirect = false }) => {
  const location = useLocation();
  const { isAuthenticated } = useContext(AuthContext);

  if (typeof isAuthenticated === 'boolean') {
    return isAuthenticated ? (
      <Outlet />
    ) : (
      <Navigate to={`${navigateTo}${redirect ? `?redirectTo=${location.pathname}` : ''}`} />
    );
  }
  return <AuthLoading />;
};

export default RequireAuthContainer;
