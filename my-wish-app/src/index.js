import React from 'react';
import ReactDOM from 'react-dom/client';  // Importation de ReactDOM à partir de 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App'; // Assurez-vous que le chemin d'importation est correct

// Utilisation de createRoot dans React 18
const root = ReactDOM.createRoot(document.getElementById('root'));  // Remplace 'render' par 'createRoot'
root.render(
  <React.StrictMode>
    <Router>
      <App />
    </Router>
  </React.StrictMode>
);
