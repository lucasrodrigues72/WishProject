import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css"; // Réutilise le style du login

function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Les mots de passe ne correspondent pas.");
      return;
    }

    const response = await fetch("http://localhost:3001/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.text();
    if (response.status === 201) {
      setMessage("Compte créé avec succès !");
      setTimeout(() => navigate("/"), 2000); // Redirige après 2s
    } else {
      setMessage(data);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Créer un compte</h2>
        <form onSubmit={handleRegister}>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Entrez votre email"
            />
          </div>
          <div className="form-group">
            <label>Mot de passe:</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Entrez un mot de passe"
            />
          </div>
          <div className="form-group">
            <label>Confirmez le mot de passe:</label>
            <input
              type="password"
              className="form-control"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              placeholder="Confirmez votre mot de passe"
            />
          </div>
          <button type="submit" className="button btn-block mt-3">S'inscrire</button>
        </form>
        {message && <p className="text-danger text-center mt-2">{message}</p>}
        <div className="create-account text-center">
          <p>Déjà un compte ? <a href="/">Se connecter</a></p>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
