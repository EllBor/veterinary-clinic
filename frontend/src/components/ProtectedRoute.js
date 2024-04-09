import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuth } from '../redux/slices/auth';
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuth = useSelector(selectIsAuth);
  return isAuth ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
