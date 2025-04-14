
import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

const Index: React.FC = () => {
  const { currentUser, isAuthenticated, isLoading } = useAuth();

  // If still loading, show nothing or a loading indicator
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  // If authenticated, redirect to the appropriate dashboard
  if (isAuthenticated && currentUser) {
    switch (currentUser.role) {
      case 'admin':
        return <Navigate to="/admin/dashboard" replace />;
      case 'mentor':
        return <Navigate to="/mentor/dashboard" replace />;
      case 'student':
        return <Navigate to="/student/dashboard" replace />;
      default:
        return <Navigate to="/login" replace />;
    }
  }

  // If not authenticated, redirect to login
  return <Navigate to="/login" replace />;
};

export default Index;
