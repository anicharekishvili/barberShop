import { Navigate } from 'react-router-dom';

export const AuthorizedRoutes = ({
  user,
  redirectPath = '/auth/login',
  children,
}) => {
  if (!user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};

export const UnauthorizedRoutes = ({
  user,
  redirectPath = '/homePage',
  children,
}) => {
  if (user) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
};
