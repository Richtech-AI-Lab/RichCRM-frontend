import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { ROUTES } from "../constants/api";

const ProtectedRoute = () => {
  const isAuthenticated = JSON.parse(localStorage.getItem("isAuthenticated"));
  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} />;
  }
  return <Outlet />;
};

export default ProtectedRoute;
