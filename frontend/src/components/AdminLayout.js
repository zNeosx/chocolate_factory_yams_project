import React from "react";
import { Outlet } from "react-router-dom";
import HeaderAdmin from "./HeaderAdmin";

const AdminLayout = () => {
  return (
    <>
      <HeaderAdmin />
      <Outlet />
    </>
  );
};

export default AdminLayout;
