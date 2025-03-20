import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Si tu utilises Bootstrap

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Mot de passe:", password);
  };

  return (
    <div className="App">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h1 className="text-center my-5">Connexion</h1>
            <form
              onSubmit={handleSubmit}
              className="border p-4 rounded shadow-sm bg-white"
            >
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
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
