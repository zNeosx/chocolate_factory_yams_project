import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { decodeToken } from "react-jwt";

import { Axios } from "../config";

const HeaderAdmin = () => {
  const navigate = useNavigate();
  const myDecodedAdminToken = decodeToken(sessionStorage.getItem("token"));
  const leaveAdmin = () => {
    Axios.get("/user/logout", {
      headers: {
        "x-access-token": `${sessionStorage.getItem("token")}`,
      },
    }).then(({ data }) => {
      sessionStorage.removeItem("token");
      alert(data.message);
      navigate("/admin/login");
    });
  };
  return (
    <header>
      <div className="logo">
        <h1>La chocolaterie</h1>
        <h2>- Évènement 2022 -</h2>
      </div>
      <nav className="nav">
        <NavLink to={"/admin/pastries"} className="nav-links">
          Toutes les pâtisseries
        </NavLink>
        {/* <NavLink to={"/pastries"} className="nav-links">
          Les Pâtisseries Obtenues
        </NavLink> */}
        <div className="nav-dots"></div>
        {sessionStorage.getItem("token") &&
          myDecodedAdminToken.role === "admin" && (
            <span className="nav-links" onClick={() => leaveAdmin()}>
              Quitter l'admin
            </span>
          )}
      </nav>
    </header>
  );
};

export default HeaderAdmin;
