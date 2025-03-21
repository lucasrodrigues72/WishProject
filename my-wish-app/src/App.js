import React from 'react';
import { Routes, Route } from 'react-router-dom'; // Importation de Routes et Route pour gérer les routes
import Dashboard from './Dashboard.js';
import LoginPage from './loginPage.js'; // Assurez-vous que le chemin et la casse du nom du fichier sont corrects

function App() {
  return (
    <div>
      <Routes>
        {/* Route pour la page de connexion */}
        <Route path="/" element={<LoginPage />} />
        
        {/* Route pour la page Dashboard après la connexion réussie */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </div>
  );
}

export default App;
