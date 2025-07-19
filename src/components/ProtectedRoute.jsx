import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, adminOnly = false, farmerOnly = false }) => {
  const { isAuthenticated, isAdmin, isFarmer, loading } = useAuth();

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (farmerOnly && !isFarmer) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;