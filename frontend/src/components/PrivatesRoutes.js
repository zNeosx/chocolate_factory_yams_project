import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { decodeToken, isExpired } from "react-jwt";

const PrivateRoutes = () => {
  const token = sessionStorage.getItem("token");
  const myDecodedToken = decodeToken(token);
  const isMyExpiredToken = isExpired(token);
  return token && myDecodedToken.role === "player" && !isMyExpiredToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoutes;
