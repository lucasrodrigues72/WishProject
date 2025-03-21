// src/LoginPage.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Importation de Bootstrap pour le design
import { useNavigate } from 'react-router-dom'; // Importation de useNavigate pour la redirection

// Page de Connexion
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate(); // Hook pour la redirection

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Envoi des données au backend pour vérifier la connexion
    const response = await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
  
    const data = await response.text();
  
    if (response.status === 200) {
      setMessage('Connexion réussie');
      navigate('/dashboard'); // Rediriger vers le dashboard après une connexion réussie
    } else {
      setMessage(data); // Afficher le message d'erreur si la connexion échoue
    }
  };
  
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <h1 className="text-center my-5">Connexion</h1>
          <form onSubmit={handleSubmit} className="border p-4 rounded shadow-sm bg-white">
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Entrez votre email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Mot de passe:</label>
              <input
                type="password"
                id="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Entrez votre mot de passe"
              />
            </div>
            <button type="submit" className="btn btn-primary btn-block mt-3">
              Se connecter
            </button>
          </form>
          {message && <p>{message}</p>} {/* Affiche les messages d'erreur ou de succès */}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
