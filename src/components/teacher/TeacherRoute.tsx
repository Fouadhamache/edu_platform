import React from 'react';
import { Navigate } from 'react-router-dom';
import { useTeacher } from '../../contexts/TeacherContext';

interface TeacherRouteProps {
  children: React.ReactNode;
}

const TeacherRoute: React.FC<TeacherRouteProps> = ({ children }) => {
  const { isTeacherAuthenticated, isLoading } = useTeacher();
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-12 h-12 border-4 border-primary-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (!isTeacherAuthenticated) {
    return <Navigate to="/teacher/login" replace />;
  }
  
  return <>{children}</>;
};

export default TeacherRoute