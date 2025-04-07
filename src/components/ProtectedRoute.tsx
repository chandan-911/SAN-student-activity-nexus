
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useEffect } from 'react';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isAuthenticated } = useAuth();

  // Additional check to ensure user data is valid
  const isUserValid = isAuthenticated && user && user.rollNumber;

  // Effect to log if there's an issue with authentication
  useEffect(() => {
    if (!isAuthenticated) {
      console.log("User is not authenticated, redirecting to login");
    } else if (!isUserValid) {
      console.log("User data is invalid or incomplete");
    }
  }, [isAuthenticated, isUserValid]);

  if (!isUserValid) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
