import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { decodeToken, isExpired } from "react-jwt";

const AdminRoutes = () => {
  const token = sessionStorage.getItem("token");
  const myDecodedToken = decodeToken(token);
  const isMyExpiredToken = isExpired(token);
  return token && myDecodedToken.role === "admin" && !isMyExpiredToken ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" />
  );
};

export default AdminRoutes;
