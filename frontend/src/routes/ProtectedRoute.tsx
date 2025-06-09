import { Navigate, useLocation } from 'react-router-dom';
import { SIGNIN_PATH } from './routes-constant';

// Protected Route Component
export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const token = localStorage.getItem('token');

  if (!token) {
    // Redirect to signin page, preserving the attempted location
    return <Navigate to={SIGNIN_PATH} state={{ from: location }} replace />;
  }

  return children;
};