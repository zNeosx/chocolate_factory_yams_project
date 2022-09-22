import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { adminLoginRequest } from "../../api";

const AdminLogin = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    if (data.password.length !== 0) {
      data.password = data.password.trim();
      adminLoginRequest(data)
        .then(({ data }) => {
          sessionStorage.setItem("token", data.adminToken);
          navigate("/admin/pastries");
        })
        .catch((error) => console.log(error));
    } else {
      alert("Merci de remplir tous les champs");
    }
  };
  return (
    <div id="a-login" className="page-with-form">
      <form onSubmit={handleFormSubmit} className="form">
        <div className="form-title">
          <h2>Connexion à l'espace Admin</h2>
        </div>
        <div className="form-item">
          <input
            type="password"
            name="password"
            id="password"
            className="form-input"
            placeholder="Mot de passe"
            autoComplete="off"
          />
        </div>
        <button type="submit" className="btn btn-submit">
          Connexion
        </button>
        <Link to="/register" className="link">
          - Revenir à l'évenement -
        </Link>
      </form>
    </div>
  );
};

export default AdminLogin;
