import React, { useState } from 'react';
import './LoginPage.css'; // Importation du fichier CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation de Bootstrap
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.text();
    if (response.status === 200) {
      setMessage('Connexion réussie');
      navigate('/dashboard');
    } else {
      setMessage(data);
    }
  };

  return (
    <div className="login-container">
      <div className="bubbles-background">
        {[...Array(10)].map((_, i) => (
          <div key={i} className="bubble" style={{
            width: `${Math.random() * 50 + 20}px`,
            height: `${Math.random() * 50 + 20}px`,
            left: `${Math.random() * 100}vw`,
            animationDuration: `${Math.random() * 5 + 10}s`,
          }}></div>
        ))}
      </div>
      <div className="login-card">
        <h2>Connexion</h2>
        <form onSubmit={handleSubmit}>
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
              placeholder="Entrez votre mot de passe"
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block mt-3">Se connecter</button>
        </form>
        {message && <p className="text-danger text-center mt-2">{message}</p>}
        <div className="create-account text-center">
          <p>Vous n'avez pas de compte ? <a href="/register">Créer un compte</a></p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
