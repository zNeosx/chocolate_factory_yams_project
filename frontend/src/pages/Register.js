import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerRequest } from "../api";

const Register = () => {
  const navigate = useNavigate();
  const initialFormState = {
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  };

  const [error, setError] = React.useState("");
  const [form, setForm] = React.useState(initialFormState);
  const { firstname, lastname, email, password } = form;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value.trim() });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    registerRequest(form)
      .then(({ data }) => {
        navigate("/login");
      })
      .catch(({ response: { data } }) => setError(data.message));
  };
  return (
    <div id="register" className="page-with-form">
      <form onSubmit={handleFormSubmit} className="form">
        <div className="form-title">
          <h2>Inscription à l'évenement</h2>
        </div>
        {error && (
          <div className="form-error">
            <span className="error-message">{error}</span>
          </div>
        )}
        <div className="form-item">
          <input
            type="text"
            name="lastname"
            id="lastname"
            className="form-input"
            placeholder="Nom*"
            required
            value={lastname}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-item">
          <input
            type="text"
            name="firstname"
            id="firstname"
            className="form-input"
            placeholder="Prénom*"
            required
            value={firstname}
            onChange={handleInputChange}
          />
        </div>
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
          S'inscrire
        </button>
        <Link to="/login" className="link">
          J'ai déjà un compte
        </Link>
      </form>
    </div>
  );
};

export default Register;
