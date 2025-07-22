import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useTrial } from '../../contexts/TrialContext';
import SubscriptionRequired from '../subscription/SubscriptionRequired';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  const { isTrialActive, hasSubscription } = useTrial();
  
  // Show loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  // If user has no active trial or subscription, show subscription required
  if (!isTrialActive && !hasSubscription) {
    return <SubscriptionRequired />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;