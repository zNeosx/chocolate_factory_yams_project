import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { Axios } from "../config";

const Header = () => {
  const navigate = useNavigate();
  const leaveEvent = () => {
    Axios.get("/user/logout", {
      headers: {
        "x-access-token": `${sessionStorage.getItem("token")}`,
      },
    }).then(({ data }) => {
      sessionStorage.removeItem("token");
      alert(data.message);
      navigate("/login");
    });
  };
  return (
    <header>
      <div className="logo">
        <h1>La chocolaterie</h1>
        <h2>- Évènement 2022 -</h2>
      </div>
      <nav className="nav">
        <NavLink to={""} className="nav-links">
          Le Jeu
        </NavLink>
        <div className="nav-dots"></div>
        <NavLink to={"/mypastries"} className="nav-links">
          Mes Pâtisseries
        </NavLink>
        <div className="nav-dots"></div>
        <NavLink to={"/pastries"} className="nav-links">
          Les Pâtisseries Obtenues
        </NavLink>
        <div className="nav-dots"></div>
        {sessionStorage.getItem("token") && (
          <span className="nav-links" onClick={() => leaveEvent()}>
            Quitter l'évènement
          </span>
        )}
      </nav>
    </header>
  );
};

export default Header;
