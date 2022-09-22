import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginRequest } from "../api";

const Login = () => {
  const navigate = useNavigate();
  const initialFormState = {
    email: "",
    password: "",
  };

  const [error, setError] = React.useState("");
  const [form, setForm] = React.useState(initialFormState);
  const { email, password } = form;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value.trim() });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    loginRequest(form)
      .then(({ data }) => {
        sessionStorage.setItem("token", data.token);
        navigate("/");
      })
      .catch(({ response: { data } }) => setError(data.message));
  };
  return (
    <div id="register" className="page-with-form">
      <form onSubmit={handleFormSubmit} className="form">
        <div className="form-title">
          <h2>Connexion à l'évenement</h2>
        </div>
        {error && (
          <div className="form-error">
            <span className="error-message">{error}</span>
          </div>
        )}
        <div className="form-item">
          <input
            type="email"
            name="email"
            id="email"
            className="form-input"
            placeholder="Adresse e-mail*"
            required
            value={email}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-item">
          <input
            type="password"
            name="password"
            id="password"
            className="form-input"
            placeholder="Mot de passe*"
            required
            value={password}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className="btn btn-submit">
          Se connecter
        </button>
        <Link to="/register" className="link">
          Je n'ai pas de compte
        </Link>
      </form>
    </div>
  );
};

export default Login;
