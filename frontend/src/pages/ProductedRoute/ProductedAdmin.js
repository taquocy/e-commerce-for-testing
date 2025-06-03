import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProductedAdmin() {
  const { user, loggedIn } = useAuth();

  if (!loggedIn) {
    return <Navigate to="/signin" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/404" replace />;
  }

  return <Outlet />;
}

export default ProductedAdmin;
